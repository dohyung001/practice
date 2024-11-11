// 소켓 연결 설정
const socket = io();

// HTML 요소 선택
const myFace = document.getElementById("myFace"); // 내 비디오 화면 요소
const muteBtn = document.getElementById("mute"); // 음소거 버튼
const cameraBtn = document.getElementById("camera"); // 카메라 토글 버튼
const cameraSelect = document.getElementById("cameras"); // 카메라 선택 드롭다운
const call = document.getElementById("call"); // 영상 통화 UI

// 상태 변수 설정
let myStream; // 내 비디오 및 오디오 스트림
let muted = false; // 음소거 상태
let cameraOff = false; // 카메라 상태
let roomName; // 방 이름 변수

// 카메라 목록을 가져오고 select 요소에 추가하는 함수
const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices(); // 장치 목록 불러오기
    const cameras = devices.filter((device) => device.kind === "videoinput"); // 비디오 입력 장치 필터링
    const currentCamera = myStream.getVideoTracks()[0]; // 현재 사용 중인 카메라 트랙

    // 카메라 선택 옵션 초기화 및 갱신
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label == camera.label) {
        option.selected = true;
      }
      cameraSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
};

// 미디어 장치로부터 스트림을 가져오는 함수
const getMedia = async (deviceId) => {
  const initialConstraints = {
    audio: true,
    video: { facingMode: "user" },
  };

  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    // deviceId가 있으면 선택한 카메라, 없으면 기본 카메라 사용
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraints
    );
    myFace.srcObject = myStream; // 스트림을 내 비디오 요소에 연결
    if (!deviceId) {
      await getCameras(); // 최초 호출 시에만 카메라 목록 불러오기
    }
  } catch (e) {
    console.log(e);
  }
};

// 음소거 버튼 클릭 핸들러
const handleMuteClick = () => {
  myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled)); // 오디오 트랙 활성화/비활성화 토글
  muteBtn.innerText = muted ? "Mute" : "Unmute"; // 버튼 텍스트 변경
  muted = !muted;
};

// 카메라 토글 버튼 클릭 핸들러
const handleCameraClick = () => {
  myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled)); // 비디오 트랙 활성화/비활성화 토글
  cameraBtn.innerText = cameraOff ? "Turn Camera Off" : "Turn Camera On"; // 버튼 텍스트 변경
  cameraOff = !cameraOff;
};

// 카메라 변경 시 선택된 카메라로 전환하는 함수
const handleCameraChange = async () => {
  await getMedia(cameraSelect.value); // 선택된 카메라로 미디어 스트림 갱신
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack); // 새로운 비디오 트랙으로 교체
  }
};

// 방에 입장하여 미디어 시작 및 WebRTC 연결 생성
call.hidden = true; // 통화 UI 숨기기
const startMedia = async () => {
  welcome.hidden = true; // 방 입장 화면 숨기기
  call.hidden = false; // 통화 UI 보이기
  await getMedia(); // 기본 미디어 스트림 가져오기
  makeConnection(); // WebRTC 연결 생성
};

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

// 방 입장 시 소켓을 통해 방 이름 전송
const handleWelcomeSubmit = async (event) => {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  await startMedia();
  socket.emit("join_room", input.value); // 방 입장 이벤트 서버로 전송
  roomName = input.value;
  input.value = ""; // 입력 필드 초기화
};

// 버튼 및 폼 이벤트 리스너 등록
muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraChange);
welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// 소켓 이벤트 구현

// 누군가 방에 입장했을 때 (offer 생성)
socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer(); // offer 생성
  myPeerConnection.setLocalDescription(offer); // 로컬 설명으로 설정
  socket.emit("offer", offer, roomName); // offer를 서버로 전송
});

// offer를 수신했을 때
socket.on("offer", async (offer) => {
  myPeerConnection.setRemoteDescription(offer); // 원격 설명 설정
  const answer = await myPeerConnection.createAnswer(); // answer 생성
  myPeerConnection.setLocalDescription(answer); // 로컬 설명으로 설정
  socket.emit("answer", answer, roomName); // answer를 서버로 전송
});

// answer를 수신했을 때
socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer); // 원격 설명으로 설정
});

// ICE candidate를 수신했을 때
socket.on("ice", (ice) => {
  myPeerConnection.addIceCandidate(ice); // ICE candidate 추가
});

// WebRTC 연결 설정

let myPeerConnection;

// WebRTC 연결 생성 및 설정 함수
const makeConnection = () => {
  // ICE 서버 설정 (STUN 서버)
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce); // ICE candidate 이벤트 리스너
  myPeerConnection.addEventListener("addstream", handleAddStream); // 원격 스트림 추가 리스너
  myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream)); // 내 미디어 트랙 추가
};

// ICE candidate를 서버로 전송하는 함수
const handleIce = (data) => {
  socket.emit("ice", data.candidate, roomName); // ICE candidate를 서버로 전송
};

// 상대방의 스트림을 받아서 화면에 표시하는 함수
const handleAddStream = (data) => {
  const peerFace = document.getElementById("peerFace"); // 상대방 비디오 화면 요소
  peerFace.srcObject = data.stream; // 스트림을 상대방 비디오 요소에 연결
};

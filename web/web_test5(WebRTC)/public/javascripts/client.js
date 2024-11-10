// 소캣 연결
const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");
const call = document.getElementById("call");

let myStream;
let muted = false;
let cameraOff = false;
let roomName;

call.hidden = true;
// 카메라 디바이스 인식 & select에 카메라 디바이스 연결
const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];

    cameraSelect.innerHTML = ""; // 카메라 목록을 업데이트하기 전에 초기화

    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      cameraSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
};

// 미디어 인식 & deviceId에 해당하는 디바이스로 전환
const getMedia = async (deviceId) => {
  const initialConstraint = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstraint
    );
    myFace.srcObject = myStream;

    if (!deviceId) await getCameras(); // 최초 호출 시에만 카메라 목록 불러오기
  } catch (e) {
    console.log(e);
  }
};



// 음소거
const handleMuteClick = () => {
  myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
  muteBtn.innerText = muted ? "Mute" : "Unmute";
  muted = !muted;
};

// 카메라 온/오프
const handleCameraClick = () => {
  myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  cameraBtn.innerText = cameraOff ? "Turn Camera Off" : "Turn Camera On";
  cameraOff = !cameraOff;
};

// 카메라 디바이스 전환
const handleCameraChange = async () => {
  await getMedia(cameraSelect.value);
};


//방 입장하기
const startMedia = () => {
  welcome.hidden = true;
  call.hidden = false;
  getMedia();
}

const welcome = document.getElementById('welcome');
const welcomeForm = welcome.querySelector('form');

const handleWelcomeSubmit = (event) => { //방 입장 버튼
  event.preventDefault();
  const input = welcomeForm.querySelector('input');
  socket.emit('join_room', input.value, startMedia); //startMedia : 서버로 넘김
  roomName = input.value;
  input.value = ""
}

//이벤트 연결
cameraSelect.addEventListener("input", handleCameraChange);
muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
welcomeForm.addEventListener('submit', handleWelcomeSubmit)




//socket 구현 부분

socket.on('welcome', () => { //welcome이벤트 받으면 실행:누군가 접속하면
  console.log("누군가 접속함!");
})
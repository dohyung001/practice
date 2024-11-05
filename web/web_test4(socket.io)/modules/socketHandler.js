const { Server } = require('socket.io');

const socketHandler = (server) => {
    const io = new Server(server); // 접속 시 서버에서 실행되는 코드
    io.on('connection', (socket) => {
        const req = socket.request; //리퀘스트의 내용들
        const socket_id = socket.id; //소켓의 고유한 아이디 발급
        const client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //클라의 IP 확인가능
        console.log("connection !!");
        console.log("socket ID : ", socket_id);
        console.log("client IP : ", client_ip);

        //이벤트에 대한 콜백 함수들
        socket.on("disconnect", () => { // 사전에 제공되는 callback (disconnect, error):클라 연결 해제 시 콜백
            console.log(socket_id, "client disconnected");
        });

        socket.on("event1", (msg) => { // 생성한 이벤트 이름 event1 호출 시 콜백
            console.log(msg);    //단순히 받은 메세지 출력
            io.emit("msg","전체 메세지") //모든 클라에 메세지 전송
        });
    });
};

module.exports = socketHandler;

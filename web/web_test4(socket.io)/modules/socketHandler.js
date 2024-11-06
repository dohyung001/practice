const { Server } = require('socket.io');

const socketHandler = (server) => {
    const io = new Server(server); // 접속 시 서버에서 실행되는 코드
    let user = {}; //현재 접속중인 유저
    //주석
    io.on('connection', (socket) => {
        const req = socket.request; //리퀘스트의 내용들
        const socket_id = socket.id; //클라의 소켓 id
        const client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //클라의 IP 
        console.log("connection !!");
        console.log("socket ID : ", socket_id);
        console.log("client IP : ", client_ip);

        user[socket.id] = { nickname: "user nickname", point: 0 } //서버에 접속할떄 유저 객체에 넣음(현재 접속중인 인원 확인)

        //연결 해제시 콜백(사전에 정의된 이벤트)
        socket.on("disconnect", () => {
            console.log(socket_id, "client disconnected");
            delete user[socket.id];
        });

        // event1이벤트 발생 시 콜백
        socket.on("event1", (msg) => {
            console.log(msg);
            socket.emit("getID", socket.id) //메세지를 보낸 클라에게 보냄
        });



        //모두에게
        socket.on("input", (data) => {
            io.emit("msg", { id: socket.id, message: data }); //모든 클라에게 메세지 보냄
            console.log(socket.id, "가 보낸 메세지", data);
            console.log(user);
        });

        //본인 제외한 모든 소켓
        socket.on("inputWM", (data) => {
            socket.broadcast.emit("msg", { id: socket.id, message: data });
            console.log(data, "를 받았는데, 본인 빼고 boadcast 해야함")
        })

        //특정 소켓
        socket.on("privatemsg", (data, id) => {
            io.to(id).emit("msg", { id: socket.id, message: data });
            console.log(socket.id, "가", id, "에게 보내는 메세지 : ", data);
        });
    });
};

module.exports = socketHandler;

const { Server } = require('socket.io');

const socketHandler = (server) => {
    const io = new Server(server); // 접속 시 서버에서 실행되는 코드
    let user = {}; //현재 접속중인 유저

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

        //join_room이벤트 발생시: 방 참여
        socket.on('join_room', (roomName) => {
            socket.join(roomName);
            
            socket.to(roomName).emit('welcome'); //welcome 이벤트 발생
        });

        //offer 받으면 반대편 클라에 offer보내기
        socket.on('offer',(offer,roomName)=>{
            socket.to(roomName).emit("offer",offer);
        })

        //answer 받으면 클라에 asnwer보내기
        socket.on('answer',(answer,roomName)=>{
            socket.to(roomName).emit("answer",answer);
        })

        //answer 받으면 클라에 asnwer보내기
        socket.on('ice',(ice,roomName)=>{
            socket.to(roomName).emit("ice",ice);
        })
    });
};

module.exports = socketHandler;

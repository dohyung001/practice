[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/cDMSPYJg)


제출자명: 김도형


[EC2 Instance Connection 환경]

(1) 실행 방법
>cd 24-assignment2-dohyung001

>cd server

>export MONGO_URI=mongodb+srv://carl200110:P28OQaBtgUxbDH2X@cluster0.xnnrq.mongodb.net/

>export JWT_SECRET=ttookkeenn123

>npm start


(2) (1)이 혹시 안될 경우
>git clone https://github.com/kw-ic-web/24-assignment2-dohyung001

>cd 24-assignment2-dohyung001

>nvm install node

>npm install -g npm@latest

>cd server

>npm install

>cd ../client

>npm install

>npm run build

>cd ..

>export MONGO_URI=mongodb+srv://carl200110:P28OQaBtgUxbDH2X@cluster0.xnnrq.mongodb.net/

>export JWT_SECRET=ttookkeenn123

>cd server

>node app.js   //(혹은 npm start)


이후 
http://52.202.72.79:5000
혹은
http://ec2-52-202-72-79.compute-1.amazonaws.com:5000 
로 접속합니다.


*추가

server/.env 파일 내용

>MONGO_URI=mongodb+srv://carl200110:P28OQaBtgUxbDH2X@cluster0.xnnrq.mongodb.net/

>export JWT_SECRET=ttookkeenn123

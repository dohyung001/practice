// mongoose 모듈을 불러옵니다.
const mongoose = require("mongoose");

// MongoDB 연결 함수 정의
const connect = async () => {
    // 개발 환경에서 Mongoose의 디버그 모드를 활성화하여 쿼리 로그를 자세히 표시합니다.
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    try {
        // MongoDB에 연결합니다. `useNewUrlParser`와 `useUnifiedTopology` 옵션은 최신 연결 관리 방법을 사용하도록 합니다.
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://root:1234@localhost:27017/admin', {
            dbName: 'kwic',  // 연결할 데이터베이스 이름 설정
        });
        console.log('MongoDB 연결 성공');
    } catch (error) {
        // 연결 중 에러가 발생하면 에러 메시지를 출력합니다.
        console.error('MongoDB 연결 에러:', error);
    }
};

// MongoDB 연결 에러 발생 시 에러 메시지를 출력합니다.
mongoose.connection.on('error', (error) => {
    console.log('MongoDB 연결 에러:', error);
});

// MongoDB 연결이 끊어졌을 경우 자동으로 재연결을 시도합니다.
mongoose.connection.on('disconnected', () => {
    console.error('MongoDB 연결이 끊어졌습니다. 재연결을 시도합니다.');
    connect();  // 연결을 다시 시도합니다.
});

// 연결 함수를 모듈로 내보내서 다른 파일에서 불러올 수 있도록 합니다.
module.exports = {connect};
const mongoose = require("mongoose");

const connect = async () => {
  // 개발 환경에서 Mongoose의 디버그 모드 활성화
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/web_assignment', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'web_assignment',  // 연결할 데이터베이스 이름 설정
    });
    console.log('MongoDB 연결 성공');
  } catch (error) {
    console.error('MongoDB 연결 에러:', error);
  }
};

// MongoDB 연결 에러 및 재연결 처리
mongoose.connection.on('error', (error) => {
  console.error('MongoDB 연결 에러:', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB 연결이 끊어졌습니다. 재연결을 시도합니다.');
  connect();  // 연결을 다시 시도
});

module.exports = connect;
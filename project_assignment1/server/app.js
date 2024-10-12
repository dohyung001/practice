const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API 라우트
app.use('/api/users', require('./routes/users'));

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, '../client/dist')));

// 모든 기타 경로에 대해 React의 index.html 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

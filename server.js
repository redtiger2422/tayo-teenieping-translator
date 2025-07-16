console.log('서버 시작 중...');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;  // 🔥 이 부분 수정!

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('서버가 작동중입니다!');
});

app.listen(PORT, '0.0.0.0', () => {  // 🔥 '0.0.0.0' 추가!
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
console.log('서버 시작 중...');

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('서버가 작동중입니다!');
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다!`);
});
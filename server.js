console.log('서버 시작 중...');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// JSON 처리를 위한 미들웨어 추가
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('서버가 작동중입니다!');
});

// 번역 API 엔드포인트 추가
app.post('/translate', (req, res) => {
  console.log('번역 요청 받음:', req.body);
  
  // 임시 응답 (나중에 OpenAI API로 바꿀 예정)
  res.json({
    success: true,
    translatedText: '번역 기능 구현 중입니다...'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
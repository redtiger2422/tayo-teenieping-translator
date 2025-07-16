console.log('서버 시작 중...');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('서버가 작동중입니다!');
});

app.post('/translate', (req, res) => {
  console.log('번역 요청 받음:', req.body);
  
  const { text, from, to } = req.body;
  
  // 임시 번역 결과 (나중에 OpenAI API로 교체)
  let translatedText = '';
  
  if (from === 'en' && to === 'ko') {
    translatedText = '그녀는 귀여워요.'; // 임시 한국어 번역
  } else if (from === 'ko' && to === 'en') {
    translatedText = 'She is cute.'; // 임시 영어 번역
  } else {
    translatedText = '번역 기능 구현 중입니다...';
  }
  
  res.json({
    success: true,
    translatedText: translatedText
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
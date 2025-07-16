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
  
  const { text, mode } = req.body;  // ← 'mode'로 변경!
  
  // 입력값 확인
  console.log('받은 텍스트:', text);
  console.log('번역 모드:', mode);
  
  // 임시 번역 결과
  let translation = '';  // ← 'translation'으로 변경!
  
  if (text) {
    if (mode === 'korToEng') {  // ← 'korToEng'로 변경!
      translation = 'She is cute.'; // 임시 영어 번역
    } else if (mode === 'engToKor') {  // ← 'engToKor'로 변경!
      translation = '그녀는 귀여워요.'; // 임시 한국어 번역
    } else {
      translation = '번역 기능 구현 중입니다...';
    }
  } else {
    translation = '텍스트를 입력해주세요.';
  }
  
  res.json({
    success: true,
    translation: translation  // ← 'translation'으로 변경!
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
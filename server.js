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
  const { text, mode } = req.body;

  // 1. 텍스트가 없는 경우, 오류 응답을 보내고 즉시 종료합니다.
  if (!text) {
    console.log('오류: 번역할 텍스트가 없습니다.');
    // 400: Bad Request (잘못된 요청)
    return res.status(400).json({ 
        success: false, 
        error: '번역할 텍스트를 입력해주세요.' 
    });
  }

  let translation = '';

  if (mode === 'korToEng') {
    translation = 'She is cute.'; 
  } else if (mode === 'engToKor') { 
    translation = '그녀는 귀여워요.';
  } else {
    // 2. 지원하지 않는 모드일 경우, 오류 응답을 보냅니다.
    console.log('오류: 지원하지 않는 모드입니다.');
    return res.status(400).json({
        success: false,
        error: '지원하지 않는 번역 모드입니다.'
    });
  }

  // 3. 모든 검사를 통과한 경우에만 성공 응답을 보냅니다.
  console.log('번역 성공:', translation);
  res.json({
    success: true,
    translation: translation 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
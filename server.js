console.log('서버 시작 중...');
const express = require('express');
const OpenAI = require('openai'); // OpenAI 라이브러리를 불러옵니다.
const app = express();

const PORT = process.env.PORT || 3000;

// OpenAI 클라이언트를 초기화합니다. API 키는 Render 환경변수에서 가져옵니다.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('서버가 작동중입니다!');
});

// 번역 요청을 처리하는 부분을 async 함수로 변경합니다.
app.post('/translate', async (req, res) => {
  console.log('번역 요청 받음:', req.body);
  const { text, mode } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, error: '번역할 텍스트를 입력해주세요.' });
  }

  // 번역 방향을 설정합니다.
  const sourceLang = mode === 'korToEng' ? 'Korean' : 'English';
  const targetLang = mode === 'korToEng' ? 'English' : 'Korean';

  try {
    // OpenAI에 번역을 요청합니다.
    console.log(`OpenAI에 ${sourceLang} -> ${targetLang} 번역 요청...`);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 번역에 효율적인 모델을 사용합니다.
      messages: [
        {
          role: "system",
          content: `You are a helpful translator. Translate the following text from ${sourceLang} to ${targetLang}.`
        },
        {
          role: "user",
          content: text
        }
      ],
    });

    // OpenAI로부터 받은 번역 결과를 추출합니다.
    const translation = completion.choices[0].message.content.trim();
    console.log('OpenAI 번역 결과:', translation);

    // 성공적으로 번역된 결과를 클라이언트에 보냅니다.
    res.json({
      success: true,
      translation: translation
    });

  } catch (error) {
    // OpenAI API 요청 중 오류가 발생한 경우
    console.error('OpenAI API 오류:', error);
    res.status(500).json({ success: false, error: '번역 엔진(OpenAI)에서 오류가 발생했습니다.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다!`);
});
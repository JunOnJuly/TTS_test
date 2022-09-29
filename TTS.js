const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const service_js = require('./key/service_js.js');

// 임시 변수 설정
const title = 'test'
const text_input = 'test text'
const gender_input = 0

// TTS 함수
const TTS = (title, text_input, gender_input) => {
  // 파일 이름 겹치면 뒤에 숫자붙여서 저장
  let file_num = 0

  // 디렉토리 읽어오기
  fs.readdir('./', (err, fileList) => {
    
    //같은 이름 있으면 숫자 + 1
      for (filename of fileList) {
        if (`${title}_${file_num}_js.mp3` === filename) {
          file_num += 1
          }
        }
      }
  )

  // 성별 결정
  if (gender_input === 0) {
    gender = 'MALE'
    } else {
      gender = 'FEMALE'
    }

  // 서비스 연결
  service_js.connect()
  
  // 클라이언트 생성
  const client = new textToSpeech.TextToSpeechClient();

  // 실행 설정
  async function quickStart() {

    // text 읽어가기
    const text = text_input;

    // 설정
    const request = {
      // 텍스트로 받기
      input: {text: text},
      // 한국어, 성별
      voice: {languageCode: 'ko-KR', ssmlGender: gender},
      // mp3로 인코딩
      audioConfig: {audioEncoding: 'MP3'},
    };

    // 파일이름 설정 : writeFile 안에 있음
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`${title}_${file_num}_js.mp3`, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${title}_${file_num}_js.mp3`);
  }
  quickStart();
}

// 함수 실행
TTS('test', 'test text', gender_input)
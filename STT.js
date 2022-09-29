const speech = require('@google-cloud/speech')
const service_js = require('./key/service_js.js')
const fs = require('fs')
const _ = require('lodash')

// 임시 변수 설정
const title = 'test'
const filepath = './stt_test_0.mp3'

const STT = (filepath) => {
  // 서비스 연결
  service_js.connect()
  
  // 클라이언트 설정
  const client = new speech.SpeechClient();

  // 오디오 파일 열기
  const file = fs.readFileSync(filepath)
  const audioBytes = file.toString('base64')
  const audio = {
    content: audioBytes,
  }

  // 변환 설정
  const config = {
    encoding: 'WEBM_OPUS',
    sampleRateHertz: 24000,
    languageCode: 'ko-KR',
  }

  // 변환 요청
  const request = {
    audio,
    config,
  }

  // 작업 시행
  client
  .recognize(request)
  .then((data) => {
    const results = _.get(data[0], 'results', []);
    const transcription = results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  })
}

// 함수 실행
STT(filepath)



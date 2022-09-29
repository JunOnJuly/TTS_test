from key import service
from google.cloud import texttospeech
import os


def text_to_speech(title_output, text_input, gender_code):
    # 성별 지정
    if gender_code == 0:
        ssml_gender = texttospeech.SsmlVoiceGender.MALE
    else:
        ssml_gender = texttospeech.SsmlVoiceGender.FEMALE

    # 텍스트 입력
    text_input = texttospeech.SynthesisInput(ssml=text_input)

    # 음성 출력 설정
    voice = texttospeech.VoiceSelectionParams(
        language_code="ko-KR", ssml_gender=ssml_gender
    )

    # 음성 파일 형식 설정
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # 목소리 설정
    response = client.synthesize_speech(
        input=text_input, voice=voice, audio_config=audio_config
    )

    # 음성 파일 작성

    # 음성 파일의 개수
    count_output = 0

    # 음성 파일 이름 = 'output' + '숫자' 의 숫자를 결정
    count_output = 0
    while True:
        if f'{title_output}_{count_output}.mp3' in files:
            count_output += 1
        else:
            break

    with open(f"{title_output}_{count_output}_py.mp3", "wb") as out:
        out.write(response.audio_content)
        print(f'Audio content written to file "{title_output}_{count_output}_py.mp3"')

# 탐색을 위한 로컬파일 경로 지정
target_dir = 'C:/Users/SSAFY/Desktop/TTS_test'
files = os.listdir(target_dir)

# 구글 인증 및 클라이언트 등록
service.connect()
client = texttospeech.TextToSpeechClient()

# 프로세스 실행
title_output = input('파일의 이름을 입력해주세요 : ')
text_input = input('텍스트를 입력해주세요 : ')
gender_code = int(input('성별을 입력해주세요 (남성:0, 여성:1) : '))

text_to_speech(title_output, text_input, gender_code)
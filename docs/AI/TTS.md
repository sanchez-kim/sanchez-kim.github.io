---
layout: default
title: TTS
parent: AI Research
nav_order: 3
---

RESEARCH
{: .label .label-yellow}
ON-PROGRESS
{: .label .label-green}

# TTS 프로젝트 개요

- KSS(Korean Single Speaker)데이터셋으로 구현된 모델은 흔하게 찾아볼 수 있으나 남성 목소리에 대한 구현체는 찾아보기가 어려워서 직접 학습해보고 테스트해보려한다.
- 데이터는 음성과 스크립트의 페어가 필요한데 좋은 데이터가 드물어서 서칭끝에 AI hub의 카이스트 오디오북 데이터셋을 활용하기로 결정.
- 추후 한국어 TTS 개발을 위한 데이터셋 전처리 코드도 정리해볼 예정이다. 구현되어있는 코드가 대부분 kss 기준으로 되어있는데 개인적으로는 좀 구조가 불편하게 되어있어서 다른 데이터셋에 적용시키기가 좀 귀찮더라.

---

# FastSpeech2

#### FastSpeech2 의 모델 구조

![](/assets/images/tts/fastspeech2.png)
<br />

- Non-autogressive 방식의 TTS 모델.
- 애초에 입력값이 텍스트 뿐이기 떄문에 하나의 텍스트로 여러가지 형태의 음성이 나올 수 있으므로 one-to-many mapping problem에 해당한다.
- Variation Adaptor를 도입하면서 phoneme hidden sequence에 energy, pitch, duration 등 여러가지 정보를 학습에 활용할 수 있게 되었고 좀 더 정확한 speech를 예측할 수 있게 되었다.
- 오리지널 버전은 미리 학습된 autoregressive 방식의 teacher model을 이용하는 것이 아니라 MFA(Montreal Forced Aligner) 방식으로 문장의 duration 정보를 강제 정렬하여 더 정확하게 duration을 예측한다.

| ![](/assets/images/tts/alignment_training_step.gif) |
| :-------------------------------------------------: |
|                  _강제 정렬 과정_                   |

---

# 프로젝트 절차

## Data Processing

### 1. 오픈데이터 다운로드

- [AI Hub 카이스트 오디오북 데이터셋](https://aihub.or.kr/aihubdata/data/view.do?currMenu=120&topMenu=100&dataSetSn=290&aihubDataSe=extrldata)에 가면 다운로드 가능하다.
- 여기서 남자 성우 중 한명을 선택하여 오디오파일과 스크립트를 정리하였다.
- AI Hub에 올라가있는 데이터다보니 나름 잘 정리되어있지만 누락된 데이터도 있으니 꼭 확인을 꼼꼼하게 하길 바란다.

### 2. TextGrid 만들기

- FastSpeech2를 학습시키기 위해서는 phoneme-utterance sequence간의 alignment 정보가 필요한데 이를 TextGrid라고 한다.
- TextGrid는 MFA를 사용해서 추출할 수 있다.
- MFA 설치는 [공식 문서](https://montreal-forced-aligner.readthedocs.io/en/latest/)를 참고해서 설치하는 것이 가장 깔끔하다.. 개인적으로는 도커를 활용하였다.
- TextGrid를 추출하기 위해서는 MFA 학습용 데이터셋을 만들어야하는데 이때 원본 오디오파일과 그 오디오파일에 해당하는 스크립트, 그리고 음소(phoneme) 단위의 딕셔너리가 필요하다.

| ![](/assets/images/tts/kss_phoneme.png) |
| :-------------------------------------: |
| _kss 데이터셋을 음소 단위로 변환한 예_  |

- 딕셔너리 제작시에 MFA로 g2p 모델을 학습시켜서 변환시키는 방법도 있지만 학습시간이 너무 오래걸리기 때문에 되도록이면 [g2pk](https://github.com/Kyubyong/g2pK)를 사용해서 미리 한글을 위의 그림처럼 phoneme으로 변환시켜 놓자.
- 아래의 커맨드를 통해 최종적으로 TextGrid를 획득할 수 있다.

```bash
mfa train [dataset_path] [dictionary_path] [save_model_path]
```

>

- _dataset_path_ : 오디오, 스크립트 쌍(wav, lab)이 존재하는 디렉토리의 경로
- _dictionary_path_ : g2pk로 만든 딕셔너리 파일의 경로
- _save_model_path_ : 학습 완료 후 모델을 저장할 경로

```bash
mfa align [dataset_path] [dict_file_path] [model_path] [result_path]
```

>

- _dataset_path_ : 학습 시킬 때 사용했던 데이터 경로와 동일
- _dict_file_path_ : train 결과롤 생성된 \*.dict 파일의 경로
- _model_path_ : 학습된 모델 파일의 경로
- _result_path_ : TextGrid를 저장할 경로

| ![](/assets/images/tts/textgrid.png){: width="300"} |
| :-------------------------------------------------: |
|               _생성된 TextGrid 예시_                |

---

### 3. Preprocessing

- TextGrid를 만들었다고 끝난게 아니다. ~~이제시작이다..~~
- TextGrid가 준비되었으면 데이터셋의 형태에 맞게 (kss데이터셋의 포맷을 따라가는게 편리함) 전처리를 진행하자.

| ![](/assets/images/tts/preprocessed_folder.png){: width="300"} |
| :------------------------------------------------------------: |
|                      _전처리 후 폴더구조_                      |

---

## Training

| ![](/assets/images/tts/training_loss.png) |
| :---------------------------------------: |
|                _학습결과_                 |

- 보코더는 한국인 남성의 목소리를 학습시킨 모델이 없어서 [VocGAN](https://github.com/rishikksh20/VocGAN)의 영어 다화자 사전학습 모델을 사용하였다.
  - _추후 [diffwave](https://github.com/lmnt-com/diffwave) 기반 모델 테스트 예정_
- 학습용 데이터의 수량은 training set 9,115건, validation set 1,951건으로 결코 많은 양은 아닌 듯 하다.
- 하이퍼파라미터가 굉장히 많은데(attention head, dropout, learning rate 등등), 하나하나 테스트해보기에는 너무 시간이 오래걸리므로 [HGU-DLLAB의 Jackson Kang님의 코드](https://github.com/HGU-DLLAB/Korean-FastSpeech2-Pytorch)에 수록되어있는 파라미터를 대부분 그대로 적용하였다.
- 3000 epoch으로 총 180만 스텝을 학습시키게 되었다.

### 학습결과 분석

- 데이터의 글자 빈도 수에 따라서 발화가 결정되는 케이스 존재 $$ \rightarrow $$ overfitting 우짜꼬..
- loss 만으로는 학습이 잘 되었는지 판별이 불가.
- 데이터 전처리에 따라서 품질이 달라질 수 있을듯..

---

# References

- [ming024's implementation](https://github.com/ming024/FastSpeech2)
- [HGU-DLLAB's implementation for Korean](https://github.com/HGU-DLLAB/Korean-FastSpeech2-Pytorch)

---
layout: default
title: Talking Face Generation
parent: AI Research
nav_order: 4
---

RESEARCH
{: .label .label-yellow}
ON-PROGRESS
{: .label .label-green}

# 2D base

## SyncNet -> LipGAN -> Wav2Lip

### SyncNet

| ![](/assets/images/talkingface/syncnet_input.png){: width="400"} |
| :--------------------------------------------------------------: |
|                        _SyncNet의 입력값_                        |

- SyncNet은 영상 데이터의 립싱크가 잘 되어있다는 전제하에 0.2초의 오디오와 비디오를 입력값으로 받는다.
- 오디오는 MFCC를 입력값으로 받으며, 0.2초의 입력 신호로부터 20개의 타임스텝을 제공하며, 매 타입스텝마다 13개의 mel frequency band가 사용된다.
- 비디오는 5장의 입 주변의 그레이스케일 이미지 시퀀스를 입력받는다. (25FPS)

| ![](/assets/images/talkingface/syncnet_architecture.png){: width="400"} |
| :---------------------------------------------------------------------: |
|                            _SyncNet의 구조_                             |

- 오디오와 비디오는 동시에 학습되며, 학습시에 데이터셋에서 정답 페어와 오답 페어를 지정하고 contrastive loss를 통해 학습이 진행된다.

### LipGAN과 Wav2Lip

| ![](/assets/images/talkingface/lipgan.webp){: width="600"} |
| :--------------------------------------------------------: |
|                      _LipGAN의 구조_                       |

| ![](/assets/images/talkingface/wav2lip.webp){: width="600"} |
| :---------------------------------------------------------: |
|                      _Wav2Lip의 구조_                       |

- 두 모델 다 유사한 구조를 가지고 있고, SyncNet에서 발전한 립싱크 생성 모델이다.
- LipGAN은 정적인 이미지에서는 높은 성능을 보여주었으나 실제 영상에 적용했을 때 시각적 이상 현상이 발생하거나 움직임이 자연스럽지 않았다.
- 두 논문을 읽어보면 알겠지만, 여러모로 Wav2Lip이 LipGAN의 단점을 개선한 모델이라고 볼 수 있겠다.

### Wav2Lip의 특징

- 단일 프레임이 아닌 복수의 연속적인 프레임을 사용하여 temporal correlation을 고려하였음.
- Lip-sync Expert, Visual Quality의 두 판별기가 존재!
- 사전학습된 Lip-sync expert discriminator(전문가 판별기)가 생성된 입술의 움직임에만 집중하도록하여 퀄리티를 더욱 끌어올림.
- 단순한 contrastive loss가 아닌 visual quality loss를 사용하여 생성된 프레임 내의 얼굴이 자연스러운지를 판단하였음.

# 3D base

## Speech Driven Facial Animation

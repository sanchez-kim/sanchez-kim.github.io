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

# Talking Face Generation

- Talking Face Generation이라는 것은 글자 뜻 그대로 말하는 얼굴을 생성하는 task이다.
- 딥페이크가 유행하면서 립싱크 기술에도 관심이 많아진듯하다.
- 2D와 3D 방식으로 나눌수 있는데 두 기술은 접근 방식 자체가 다르다.

# 2D-based Lip-Sync Methods

- 간단하게 SyncNet -> LipGAN -> Wav2Lip의 순서대로 훑어보겠다.

## SyncNet

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

## LipGAN과 Wav2Lip

| ![](/assets/images/talkingface/lipgan.webp){: width="600"} |
| :--------------------------------------------------------: |
|                      _LipGAN의 구조_                       |

| ![](/assets/images/talkingface/wav2lip.webp){: width="600"} |
| :---------------------------------------------------------: |
|                      _Wav2Lip의 구조_                       |

- 두 모델 다 유사한 구조를 가지고 있고, SyncNet에서 발전한 립싱크 생성 모델이다.
- LipGAN은 정적인 이미지에서는 높은 성능을 보여주었으나 실제 영상에 적용했을 때 시각적 이상 현상이 발생하거나 움직임이 자연스럽지 않았다.
- 두 논문을 읽어보면 알겠지만, 여러모로 Wav2Lip이 LipGAN의 단점을 개선한 모델이라고 볼 수 있겠다.

## Wav2Lip의 특징

- 단일 프레임이 아닌 복수의 연속적인 프레임을 사용하여 temporal correlation을 고려하였음.
- Lip-sync Expert, Visual Quality의 두 판별기가 존재!
- 사전학습된 Lip-sync expert discriminator(전문가 판별기)가 생성된 입술의 움직임에만 집중하도록하여 퀄리티를 더욱 끌어올림.
- 단순한 contrastive loss가 아닌 visual quality loss를 사용하여 생성된 프레임 내의 얼굴이 자연스러운지를 판단하였음.
- 솔직히 저화질로 학습되어서(아웃풋이 96X96이라고 한다..)그런지 신기하지만 퀄리티가 높지는 않다.
- 이후에 고화질화된 버전들이 조금씩 나오기도 했지만 썩..
- GFPGAN과 같은 방법으로 업스케일링을 하면 조금은 봐줄만한데, 이 역시도 영상에 따라 stuttering, noise가 생겨서 오히려 어색하게 보이는 경우도 있다.

# 3D Face Animation

- 3D 방식은 Parameter-based와 Vertex-based의 두 가지 접근 방식이 존재한다.

## VisemeNet(2018) - Parameter-based

| ![](/assets/images/talkingface/visemenet1.png){: width="400"} |
| :-----------------------------------------------------------: |
|                     _viseme의 목록 예시_                      |

- Viseme이란 음소(phoneme)를 시각적 설명을 의미한다. ~~벌써부터 어렵다~~
- 음소란 사용자가 인식할 수 있는 소리의 최소 단위를 말한다.
- 2000년대 초반에 phoneme과 viseme을 매핑하여 자연스러운 애니메이션을 구현하려는 시도가 있었으나 실제 얼굴의 움직임을 표현하기에는 자연스러움이 떨어졌었다.
- 이후에 점차 기술이 발전하였으나 여전히 rule-based algorithm에서 벗어나지 못하고 인공적인 느낌이 많았다고 한다.

  | ![](/assets/images/talkingface/visemenet2.png) |
  | :--------------------------------------------: |
  |        _VisemeNet Network Architecture_        |

- VisemeNet은 3D 애니메이션 업계에서 흔히 사용하는 JALI의 파라미터를 입력된 오디오를 통해 학습하는 네트워크이다.

## FaceFormer(2022) - Vertex-based

# References

## Papers

- [SyncNet](https://www.robots.ox.ac.uk/~vgg/publications/2016/Chung16a/chung16a.pdf)
- [LipGAN](https://arxiv.org/abs/2003.00418)
- [Wav2Lip](https://arxiv.org/abs/2008.10010)
- [VisemeNet](https://arxiv.org/abs/1805.09488)
- [FaceFormer](https://arxiv.org/abs/2112.05329)

## Others

- [JALI](https://jaliresearch.com)

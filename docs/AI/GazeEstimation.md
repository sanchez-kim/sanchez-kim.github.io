---
layout: default
title: Gaze Estimation
parent: AI Research
nav_order: 6
---

RESEARCH
{: .label .label-yellow}
ON-PROGRESS
{: .label .label-green}
# 영유아의 눈 움직임 추적을 통한 자폐 진단 
## Experiment Plan
- 24개월 미만 정상, 자폐 아동(50명, 50명) 대상으로 실험설계

## ASD(Autism Spectrum Disorder) Detection
![](/assets/images/gaze_estimation/experiment1.jpeg)
#### *아동이 동영상 속 인물의 눈을 응시한 시간 비율 (출처:UNIST)*
 
<br/>
- 1~4세 미만 아동 616명에게 1분 미만의 짧은 영상을 보여주고 눈 운동 추적 장비를 통해 측정 
- 자폐 아동들이 동영상 속 인물의 눈을 응시한 총 시간은 다른 집단과 유사했음. 
- 자폐 영유아들은 눈동자를 응시하지 못한다기보다 얼굴 전체를 덜 보는 경향이 있다. 
- 문맥에 맞게 중요한 정보로 주의 집중하는 능력이 일반인에 비해 떨어짐을 알 수 있음.
<br/>

## †DeepLabCut, GazeNet을 이용한 eye-tracking 
[참고문서](https://www.frontiersin.org/articles/10.3389/fnhum.2021.685830/full)
- Video camera-based eye-tracking
    - Model-based
        - 각막에 반사되는 적외선의 패턴으로 gaze의 포인트 계산
    - Appearance-based
        - 이미지 데이터에만 의존하여 눈의 음직임을 추적
        - 머리가 고정되어 있지 않은 경우 시선을 추정하기 어렵다
        - position of facial landmarks VS point of gaze

## †Computer Vision Approach
[GazeTracking](https://github.com/antoinelame/GazeTracking)<br/>
[OWLET](https://github.com/denisemw/OWLET)<br/>
[dlib-models](https://github.com/davisking/dlib-models)
- dlib으로 face landmark를 추출하고 눈의 움직임을 추척하는 방식
> *추후 dlib의 성능을 개선할 수 있을지?* 
> {: .text-red-000}


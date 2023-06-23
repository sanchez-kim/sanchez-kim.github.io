<!-- ---
layout: default
title: 3D Reconstruction
parent: AI Research
nav_order: 2
---

RESEARCH
{: .label .label-yellow}
ON-PROGRESS
{: .label .label-green} -->

# 3D Reconstruction을 위한 기반 기술 연구

## Image Matching을 위한 Feature Extraction

## 좋은 특징점이 되기 위한 조건
- 물체의 형태나 크기, 위치가 변해도 쉽게 식별이 가능할 것
- 조도변화, 카메라 시점 변화에도 해당 지점을 찾아낼 수 있을 것
> 위 조건을 모두 만족하는 것은 Corner Point이다!

## <개념정리>
### 특징점과 지역 불변 특징량(Local Invariant Feature Descriptor)의 차이점
- 특징점(Keypoint)은 특징이 되는 영상 내의 좌표를 의미하고 Descriptor는 해당 특징점의 위치에서 추출한 지역적 영상 특징 정보를 의미
- Descriptor의 예로 SIFT, SURF, ORB 등이 있음
- Descriptor 계산을 위해서 우선 특징점을 뽑아야 한다
- 예를들어 FAST로 특징점을 추출하고 SIFT로 Descriptor를 계산하는 것 또한 가능하다

### SIFT(Scale Invariance Feature Transform)
- 크기에 불변한 특징 정보를 찾기 위해 다양한 스케일의 영상을 분석하고 영상에 존재하는 특징 정보를 추출
- 이미지 피라미드를 이용해서 크기 변화에 강인한 특징점 검출이 가능
- DoG(Difference of Gaussian)를 기반으로 특징점 추출

### SURF(Speed Up Robust Features)
- SIFT의 이미지 피라미드 대신 필터의 크기를 변화시키는 방식으로 속도를 개선함

### FAST(Features from Accelerated Segment Test)
- 한 픽셀 p를 선택하고 그 주변에 반지름이 3인 원을 그려 그 주변의 16개 픽셀값을 비교해서 p보다 일정값 이상 밝거나 어두운 픽셀들이 n개 이상 연속하면 코너점으로 판단하는 방식
- decision tree를 이용해서 빠르게 판단함
- p가 코너 점으로 인식되면 p와 인접한 주변 점들도 같이 코너점으로 검출되는 경우가 있는데 이때 NMS(Non-maximal Suppression) 방식으로 후보군을 지워나감
- 다른 검출 알고리즘에 비해 속도가 매우 빠름
- 이미지에 노이즈가 많을 경우 제대로 검출하지못하고 threshold 값에 의존적임

### ORB(Oriented and Rotated BRIEF)
- BREIF(Binary Robust Independent Elementary Features)는 특징점 검출은 지원하지 않는 디스크립터 추출기임
- ORB는 BRIEF에 방향과 회전을 고려하도록 개선한 알고리즘
- 특징점 검출 알고리즘으로는 FAST를 사용

### BRISK(Binary Robust Independent Elementary Features)

### HOG(Histogram of Oriented Gradient)
- 영상에 존재하는 특징 정보의 방향과 기울기를 이용하여 특징 정보의 히스토그램을 분석하여 특히 보행자 탐지에 많이 이용됨
- HOG는 아래의 단계로 특징 벡터를 생성함
1. N개의 윈도우로 영상분할
2. 윈도우 내 그래디언트 크기 및 방향 정보를 이용하여 히스토그램 생성
3. 각각의 윈도우로부터 생성된 히스토그램들을 연결하여 병합
4. N(윈도우)*R개의 벡터로 이루어진 HOG 특징 벡터가 생성됨

## 한계점은 무엇인가?
- 복잡하기 때문에 계산 비용이 크다
- 조도 변화에 민감하다
- 회전, 스케일 변화에 대응이 어렵다
- 이미지가 반복적인 패턴이나 부드러운 지역(smooth regions)을 포함 하는 경우 성능이 떨어진다
- Occlusion(겹침)에 취약하다
- 시점변화에 취약하다

## 딥러닝 방식
### SuperPoint: Self-Supervised Interest Point Detection and Description (CVPR 2018)
- SLAM(Simultaneous Localization and Mapping)에 딥러닝을 적용하기 위한 시도
- Synthetic Dataset에 대해 Keypoint Detector를 사전학습시킨 후, 학습된 모델을 MS-COCO 데이터셋에 이용해서 psedo-ground truth를 생성한다(self-labeling)
- self-labeling 할때 Homography Adaptation이라는 기법을 활용한다
- 원본 이미지에 homography warp로 다른 각도에서 바라보는 이미지를 생성하고 이에 대한 키포인트를 추출한다
- 추출된 키포인트 셋과 이미지들을 unwarp 한뒤 aggregation을 진행하면 interest point superset을 얻을 수 있다
- 위의 label을 바탕으로 supervised learning 진행
- Backbone으로 사용된 VGG가 rotation invariant 하지는 않아서 최대 15~30도 회전만 고려했다고함

### LoFTR: Detector-Free Local Feature Matching with Transformers
- CNN으로 feature를 뽑은 다음 patch로 자르고 flatten, positional encoding 과정을 거친 후 Self-attention으로 이미지의 문맥을 학습하고, Cross-attention으로 원본과 비교 이미지 간의 문맥을 학습한다.
- 이후 patch-wise matching을 실시한다

## 1. 조도변화 및 거대시차 이미지에 대한 특징점 추출
- 우선 데이터양이 많아야함..(제일 문제)
- lighting condition에 따른 feature matching은 학습을 통해 충분히 구현 가능
- 극단적인 조건에도 잘 매칭되도록 하는 것이 목표
- 거대시차의 경우 시간이 지나면서 겹치는 부분이 많이 없어지면(건물이 없어진다던지 해서 중첩률이 많이 낮아진다면) 불가능듯
- 랜드마크 같은 건물이 존재하거나.. 어쨌든 feature를 뽑을 수 있는 환경이면 충분히 가능할 듯

## 2. 반투명 물체 비율이 높은 이미지에서의 특징점 추출


## 3. 공중 및 지상 영상 간의 매칭을 위한 특징점 추출

## 4. 중첩률이 낮은 영상의 특징 정합

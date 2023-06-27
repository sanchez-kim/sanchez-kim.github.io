---
layout: default
title: Stable Diffusion
parent: AI Research
nav_order: 2
---

RESEARCH
{: .label .label-yellow}
ON-PROGRESS
{: .label .label-green}

# Stable Diffusion Web UI 설치 & 사용법

## 설치방법
- Ubuntu 20.04 환경을 기준으로 설치를 진행함
- 본인은 remote server의 도커 환경에 설치를 진행하였음
- 공식 [repository](https://github.com/AUTOMATIC1111/stable-diffusion-webui)에는 파이썬 3.10 설치하고 webui.sh 실행하면 끝이라고 되어있지만 그렇게 간단하지 않다..

## Dockerfile 만들기
- 우선 공식 repo를 클론하고 해당 폴더에 도커파일을 작성해주자.
- 도커파일의 내용은 아래와 같다.   

```dockerfile
FROM nvidia/cuda:11.4.0-cudnn8-runtime-ubuntu20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y git curl wget software-properties-common \
    && echo "Asia/Seoul" > /etc/timezone \
    && apt-get install -y tzdata \
    && rm /etc/localtime \
    && ln -snf /usr/sahre/zoneinfo/Asia/Seoul /etc/localtime \
    && dpkg-reconfigure -f noninteractive tzdata \
    && add-apt-repository ppa:deadsnakes/ppa -y \
    && apt-get install -y python3.10 python3.10-venv python3-pip \
    && apt-get install -y libsm6 libxext6 libxrender-dev libgl1-mesa-glx libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get upgrade -y
RUN apt-get install libgoogle-perftools4 libtcmalloc-minimal4 -y

RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

ENV PATH="/venv/bin:$PATH"

WORKDIR /webui
```

- 본인이 개삽질하면서 작성한 도커파일인데 테스트는 해보지 않았으나 아마도 잘 빌드 될 것임.
- 뭘 설치해야하는지 들여다보면 대충 감이 올것임.
- 위의 코드 내용으로 도커파일을 작성하고 이미지를 빌드하자.
```bash
docker build --network=host -t webui:latest
``` 
> <b>*권한문제 발생시*</b>
```shell
# this script cannot be run as root by default
can_run_as_root=0
```
- 초기에 webui실행시 root로는 실행할 수 없게끔 되어있다.
- 다른 유저로 실행하거나 위에 해당하는 값을 1로 수정해주면 해결됨.
- 아니면 더 간단하게 -f 옵션을 주어 관리자로 실행할 수 있다.
- 빌드가 잘 되었다면 컨테이너를 만들어 접속하고, ui를 실행해보자.
```bash
./webui.sh --listen --deepdanbooru --enable-insecure-extension-access
```
> launch.py의 --help를 통해 어떤 옵션이 있는지 확인할 수 있다.   
> 원하는 옵션을 선택하고 위와 같이 webui 쉘스크립트를 실행해준다. 


## ControlNet
![](/assets/images/stable_diffusion/controlnet1.png)
- Stable Diffusion으로 이미지를 생성할 때 사용자가 생성과정을 더 세부적으로 제어할 수 있도록 하는 기술이며, 일반적으로 conditioning은 text prompt가 그 역할을 하게되는데, 그와 별개로 conditioning 요소를 하나 더 추가한다고 보면되겠다.  
- 위의 그림상 (a)가 Stable Diffusion의 U-Net block이고 (b)가 ControlNet이다.  
- (a)는 pretrained model의 파라미터를 복제하여 학습가능한 block과 잠긴 block을 만들고 이는 zero convolution 레이어와 연결된다.  
- trainable copy라고 되어있는 학습 가능한 block만 학습을 진행하게 되는데 이때 zero convolution을 통해 출력값이 0에서 시작해서 점점 학습되도록 한다.  
- ControlNet의 모델은 Canny, Openpose, Depth Map 등 여러가지가 있으며, 여러개의 모델을 한번에 적용할 수 도 있다. ~~*갓 컨트롤넷!*~~  

### 설치 & 적용방법
> 작성예정

## Lora
### 적용방법
### 학습방법

## Trouble Shooting
### webui 실행 시 나타나는 오류 정리 예정
- Cannot locate TCMalloc
    - apt install libgoogle-perftools4 libtcmalloc-minimal4 -y

### Extension Install
### Requirements
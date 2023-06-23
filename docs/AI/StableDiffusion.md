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

## Dockerfile
```dockerfile
FROM nvidia/cuda:11.4.0-cudnn8-runtime-ubuntu20.04

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y git curl wget software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa -y \
    && apt-get install -y python3.10 python3.10-venv python3-pip \
    && apt-get install -y libsm6 libxext6 libxrender-dev libgl1-mesa-glx libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

RUN apt install libgoogle-perftools4 libtcmalloc-minimal4 -y

RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

RUN python3.10 -m venv venv \
    && . /venv/bin/activate \
    && pip install --upgrade pip
```
- 본인이 개삽질하면서 작성한 도커파일인데 테스트는 해보지 않았으나 아마도 잘 빌드 될 것임.
- 뭘 설치해야하는지 들여다보면 대충 감이 올것임.
- 빌드가 잘 되었다면 컨테이너를 만들어 접속하고, ui를 실행해보자
```bash
./webui.sh --listen --deepdanbooru --enable-insecure-extension-access
```
- webui.sh --help를 통해 어떤 옵션이 있는지 확인할 수 있다. 
- 원하는 옵션을 선택하고 위와 같이 webui 쉘스크립트를 실행해준다.

## ControlNet
- 컨트롤넷이란?
    - *컨트롤넷!*
- 설치방법
- 적용방법
> 작성예정

## Lora
- 적용방법
- 학습방법

## Trouble Shooting
### Cannot locate TCMalloc
- webui 실행 시 나타나는 오류 정리 예정
- apt install libgoogle-perftools4 libtcmalloc-minimal4 -y

### Extension Install
### Requirements
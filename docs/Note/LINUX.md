---
layout: default
title: LINUX
parent: Note
nav_order: 1
---

# LINUX

<details open>
<summary style="font-size: 20px; font-weight: 600;">로케일 설정</summary>

<div markdown="1">

- 도커 컨테이너 상의 bash에서 로케일 설정이 제대로 되지 않는 것을 발견. (한글 안쳐짐)
- 사용 가능한 로케일 확인.

```bash
locale -a
```

- 환경변수 설정

```bash
export LANG=ko_KR.utf8
bash
```

_이걸 도커에 넣어야할지 리눅스 이슈에 넣어야 할지 고민을 많이 했다만.. 추후 우분투에서 문제가 있을 경우도 있고해서 리눅스 이슈란에 포함시킴._

</div>
</details>

<details open>
<summary style="font-size: 20px; font-weight: 600;">GPG 키 에러</summary>
<div markdown="1">

- 도커로 이미지를 빌드할때 발생하곤 함.
- 키를 등록해주면 해결.
- 일단 업데이트 및 업그레이드를 하고 sudo를 설치해주자.

```bash
apt update && apt upgrade
apt install sudo
```

- 이후 에러 메시지의 PUBKEY를 복사한 후 아래 커맨드로 등록을 해주면 끝

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <PUBKEY>
```

</div>
</details>

<details open>
<summary style="font-size: 20px; font-weight: 600;">프로세스 한방에 종료 시키기</summary>
<div markdown="1">
- 통상 kill -9 [PID]로 프로세스를 종료시키는데 만약에 병렬 프로세스가 걸려있을 경우 일일이 PID를 찾기가 귀찮아진다.
- 아래 커맨드로 한방에 프로세스를 종료해보자.

```bash
kill -9 -ef <PROCESS_NAME>
```

- 권한이 없다면 sudo를 넣어주자
</div>
</details>

<details open>
<summary style="font-size: 20px; font-weight: 600;">wget으로 구글드라이브 파일 다운로드 받기</summary>
<div markdown="1">

```bash
wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id={FILEID}' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id={FILEID}" -O {FILENAME} && rm -rf /tmp/cookies.txt
```

- 직접적으로 drive.google.com으로 접근이 불가능하기 때문에 docs.google.com으로 우회해야 한다.
- FILEID에 공유 링크에서 파일아이디를 복사하여 집어넣고 FILENAME에는 원하는 파일명을 작성하면 된다.
</div>
</details>

---
layout: default
title: Issues
parent: Note
nav_order: 1
---

# 생각날 때 꺼내먹으려고 기록하는 이슈 & 팁 모음

## †LINUX
### 로케일 설정
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
*이걸 도커에 넣어야할지 리눅스 이슈에 넣어야 할지 고민을 많이 했다만.. 추후 우분투에서 문제가 있을 경우도 있고해서 리눅스 이슈란에 포함시킴.*

### GPG 키 에러
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

### 프로세스 한방에 종료 시키기
- 통상 kill -9 [PID]로 프로세스를 종료시키는데 만약에 병렬 프로세스가 걸려있을 경우 일일이 PID를 찾기가 귀찮아진다.
- 아래 커맨드로 한방에 프로세스를 종료해보자.
```bash
kill -9 -ef <PROCESS_NAME>
```
- 권한이 없다면 sudo를 넣어주자

### wget으로 구글드라이브 파일 다운로드 받기
```bash
wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id={FILEID}' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id={FILEID}" -O {FILENAME} && rm -rf /tmp/cookies.txt
```
- 직접적으로 drive.google.com으로 접근이 불가능하기 때문에 docs.google.com으로 우회해야 한다.
- FILEID에 공유 링크에서 파일아이디를 복사하여 집어넣고 FILENAME에는 원하는 파일명을 작성하면 된다.

## †DOCKER
### 컨테이너 재시작
- 도커 컨테이너가 중지되었을때 강제로 무조건 다시 시작하도록 하는 커맨드.
```bash
docker update --restart=always <ContainerID>
```

## †JUPYTER
### Sublime Text 스타일로 키 맵핑하기
- VSCode를 쓰다보면 cmd + D로 다중 선택하는 것에 익숙해져있다.
- 주피터 노트북에서는 한줄을 다 지우는 단축키여서 화가 날때가 많다.
- custom.js를 수정하면 키 맵핑이 가능하다.
```bash
# 커스텀 파일 경로
# 없으면 하나 만들어주자
~/.jupyter/custom/custom.js
```
- custom.js 코드
```javascript
require(["codemirror/keymap/sublime", "notebook/js/cell", "base/js/namespace"],
    function(sublime_keymap, cell, IPython){
        cell.Cell.options_default.cm_config.keyMap = "sublime";
        var cells = IPython.notebook.get_cells();
        for(var cl=0; cl<cells.length; cl++){
            cells[cl].code_mirror.setOption("keyMap", "sublime");
        }
    }
);
```

### 테마설치
```bash
pip install jupyterthemes
pip install jupyter_contrib_nbextensions && jupyter contrib nbextension install
# 자주 쓰는 설정 1
jt -t onedork -T -N -kl -f roboto -fs 12 -tfs 11 -nfs 14 -tfs 14 -ofs 10 -cellw 90% -lineh 170 -cursc r -cursw 6
# 자주 쓰는 설정 2
jt -t chesterish -f bitstream -fs 12 -tf roboto -tfs 13 -nf opensans -nfs 12 -ofs 12 -dfs 12 -cellw 95% -lineh 150 -T -N
```

## †GIT
### gitignore 적용 안될 때
- 캐시를 삭제해주자
```bash
git rm -r --cached .
```
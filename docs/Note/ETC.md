---
layout: default
title: ETC
parent: Note
nav_order: 999
---

<details open>
<summary style="font-size: 20px; font-weight: 600;">Mac OS</summary>
<div markdown="1">

### Gatekeeper 비활성화 하기

```bash
sudo spctl --master-disable
```

- "손상되었기 때문에 열 수 없습니다." 라는 메시지를 띄울시에는 다음 커맨드로 해결해보자.

```bash
xattr -cr [path/to/error/app]
```

</div>
</details>

<br/>

<details open>
<summary style="font-size: 20px; font-weight: 600;">Windows</summary>
<div markdown="1">

### MBR to GPT

- 윈도우 설치시에 "이 디스크에 Windows를 설치할 수 없습니다. 선택한 디스크에 MBR 파티션 테이블이 있습니다. EFI 시스템에서는 GPT 디스크에만 Windows를 설치할 수 있습니다."라는 에러가 발생할 때 해결방법이다.
- 개인적으로 개발용으로 윈도우를 웬만하면 사용하지 않으므로 윈도우를 설치할 일 자체가 별로 없음.. 이런 에러를 만날 확률도 적은데 다음에 또 마주하면 귀찮아지기에 정리해두려한다.
- Shift + F10을 눌러서 cmd 프롬프트를 띄우고 다음 커맨드를 차례로 입력하면 해결됨.

```shell
diskpart # diskpart 진입

DISKPART> select disk 0 # 선택할 디스크 번호 입력
DISKPART> clean # 선택한 디스크 정리
DISKPART> convert gpt # MBR에서 GPT로 변환
```

## 출처

- [bk32167님의 블로그](https://blog.naver.com/bk32167/222979034395)
</div>
</details>

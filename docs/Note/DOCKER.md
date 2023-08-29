---
layout: default
title: DOCKER
parent: Note
nav_order: 2
---

# DOCKER

<details open>
<summary style="font-size: 20px; font-weight: 600;">컨테이너 재시작</summary>
<div markdown="1">

- 도커 컨테이너가 중지되었을때 강제로 무조건 다시 시작하도록 하는 커맨드.

```bash
docker update --restart=always <ContainerID>
```

</div>
</details>

<details open>
<summary style="font-size: 20px; font-weight: 600;">컨테이너 저장하기</summary>
<div markdown="1">

- 작업하던 컨테이너 내용을 그대로 저장하고 싶을때, 갑자기 컨테이너를 내리거나 재시작해야할때!

```bash
docker commit [CONTAINER] [IMAGENAME]
```

</div>
</details>

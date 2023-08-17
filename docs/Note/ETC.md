---
layout: default
title: ETC
parent: Note
nav_order: 2
---

# Mac OS

## Gatekeeper 비활성화 하기

```bash
sudo spctl --master-disable
```

- "손상되었기 때문에 열 수 없습니다." 라는 메시지를 띄울시에는 다음 커맨드로 해결해보자.

```bash
xattr -cr [path/to/error/app]
```

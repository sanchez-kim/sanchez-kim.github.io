---
layout: default
title: DEV
parent: Note
nav_order: 3
---

# JUPYTER

<details open>
<summary style="font-size: 20px; font-weight: 600;">Sublime Text 스타일로 키 맵핑하기</summary>
<div markdown="1">

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
require([
  "codemirror/keymap/sublime",
  "notebook/js/cell",
  "base/js/namespace",
], function (sublime_keymap, cell, IPython) {
  cell.Cell.options_default.cm_config.keyMap = "sublime";
  var cells = IPython.notebook.get_cells();
  for (var cl = 0; cl < cells.length; cl++) {
    cells[cl].code_mirror.setOption("keyMap", "sublime");
  }
});
```

</div>
</details>

<details open>
<summary style="font-size: 20px; font-weight: 600;">테마설치</summary>
<div markdown="1">

```bash
pip install jupyterthemes
pip install jupyter_contrib_nbextensions && jupyter contrib nbextension install
# 자주 쓰는 설정 1
jt -t onedork -T -N -kl -f roboto -fs 12 -tfs 11 -nfs 14 -tfs 14 -ofs 10 -cellw 90% -lineh 170 -cursc r -cursw 6
# 자주 쓰는 설정 2
jt -t chesterish -f bitstream -fs 12 -tf roboto -tfs 13 -nf opensans -nfs 12 -ofs 12 -dfs 12 -cellw 95% -lineh 150 -T -N
```

</div>
</details>

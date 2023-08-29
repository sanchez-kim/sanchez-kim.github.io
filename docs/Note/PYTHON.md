---
layout: default
title: PYTHON
parent: Note
nav_order: 5
---

# PYTHON

## pip freeze 에러

|                                                       |
| :---------------------------------------------------: |
| ![](/assets/images/issues/python1.png){: width="450"} |
|                    _요렇게 나올때_                    |
|                                                       |
| ![](/assets/images/issues/python2.png){: width="450"} |
|                  _이렇게 잘 해결됨_                   |

```bash
pip list --format=freeze > requirements.txt
```

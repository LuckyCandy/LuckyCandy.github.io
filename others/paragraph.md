# 文段

markdwon内置了一些字体的展示样式：

| 写法 | 效果 | 
| :----------: |:------------:| 
| `**我是粗体**`         | **我是粗体**          |
| `*我是斜体*`         | *我是斜体*          |
| `~~我被划掉了~~`         | ~~我被划掉了~~          |
| `<mark>我有底色</mark>`         | <mark>我有底色</mark>         |
| `<pre>格式化</pre>`         | <pre>格式化</pre>         |
|`<small>我是小字体</small>`|<small>我是小字体</small>|
|`<large>我是大字体</large>`|<large>我是大字体</large>|
|`x<sup>2</sup> + y<sup>2</sup> = 1`|x<sup>2</sup> + y<sup>2</sup> = 1|
|`x<sub>2</sub> + y<sub>2</sub> = 1`|x<sub>2</sub> + y<sub>2</sub> = 1|


当在文段中想要给某个部分增加特定样式，可以使用[]将需要特殊处理的部分括起来，在后面{}内些css样式，比如：
```html
Hello, [World]{color:red}!
```

展示效果：

Hello, [World]{color:red;font-size:5rem}!


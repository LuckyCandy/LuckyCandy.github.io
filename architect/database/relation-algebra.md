## 关系代数运算

### 1.选择
选择运算：取得R关系中符合条件的<mark>行</mark>，用小写的sigma来表示σ

例如：σ<sub>age<'20'</sub>(student)，表示选择 **student** 表中属性 **age** 小于 **20** 的所有行(元组)。

|id|name|age|
|-|-|-|
|1|Damon|18|
|2|Lee|20|
|3|Lucy|30|

*σ<sub>3<'20'</sub>(student)，跟上面等同，这里使用列号替代了列名*

### 2.投影
投影运算：取得关系R中符合条件的<mark>列</mark>组成新的关系，用 π 表示。

例如：查询学生的姓名和年龄：π<sub>name,age</sub>(student)，当然也可以写为：π<sub>2,3</sub>(student)

### 3.笛卡尔积
两个关系分别为 N 列和 M 列的关系 R 和 S 的笛卡尔积是一个 （M+N）列的元组的集合，前 N 列是关系 R 的一个元组，后 M 列是关系 S 的一个元组，记作：R X S

若 R 有 K 个元组，S 有 J 个元组，则笛卡尔积有 K * J 个元组。

<img src="/assets/imgs/architect/database/笛卡尔积.png">

### 4.连接

#### 4.1 等值连接

关系 R、S，取两者笛卡尔积中<mark>属性值相等</mark>的元组进行连接。（架构师考试中，此部分没有考点）

#### 4.2 自然连接 ⋈

是一种<mark>特殊的等值连接</mark>，它要求比较的属性列必须是相同的属性组，并且需要把结果中<mark>重复属性去掉</mark>。

#### 4.3 左外连接 ⋊

1. 取出左侧关系中所有与右侧关系都不匹配的元组，用空值null填充右侧没有匹配的属性;
2. 将第一步得到的元组加入到自然连接的结果之中

#### 4.4 右外连接 ⋉

1. 取出右侧关系中所有与左侧关系都不匹配的元组，用空值null填充左侧没有匹配的属性；
2. 将第一步得到的元组加入到自然连接的结果之中

#### 4.5 完全外连接 ⫘

1. 取出右侧关系中所有与左侧关系都不匹配的元组，用空值null填充左侧没有匹配的属性；
2. 取出左侧关系中所有与右侧关系都不匹配的元组，用空值null填充右侧没有匹配的属性；
3. 将前两步得到的元组加入到自然连接的结果之中

#### 4.6.巩固一下

有如下关系：R 和 S

<img src="/assets/imgs/architect/database/所有连接.png">

1. 等值连接（R ⋈ S，⋈符号下有R.A1 = S.A1、R.A2 = S.A2）:
|R.A1|R.A2|A3|S.A1|S.A2|A4|
|-|-|-|-|-|-|
|b|a|d|b|a|h|
|c|d|d|c|d|d|

2. 自然连接（R ⋈ S）:
|A1|A2|A3|A4|
|-|-|-|-|
|b|a|d|h|
|c|d|d|d|

3. 左外连接（R ⋊ S）:
|A1|A2|A3|A4|
|-|-|-|-|
|b|a|d|h|
|c|d|d|d|
|a|b|c|null|
|d|f|g|null|

4. 右外连接（R ⋉ S）:
|A1|A2|A3|A4|
|-|-|-|-|
|b|a|d|h|
|c|d|d|d|
|a|z|null|a|
|d|s|null|c|

5. 完全外连接（R ⫘ S）:
|A1|A2|A3|A4|
|-|-|-|-|
|b|a|d|h|
|c|d|d|d|
|a|b|c|null|
|d|f|g|null|
|a|z|null|a|
|d|s|null|c|

### 5.练习
[例题：]{color:red;font-weight:bold}若关系模式 R 和 S 分别为：R(A,B,C,D)、S(B,C,E,F)，，那么：<br/>
1. R 与 S 自然连接运算后的属性列右( ? )个；
2. 与表达式<mark>π<sub>1,3,5,6</sub>(σ<sub>3<6</sub>(R ⋈ S))</mark>等价的SQL语句是：( )

[解：]{color:red;font-weight:bold}
1. 自然连接取出相同列B、C，剩余结果 = R ⋈ S = (A,B,C,D,E,F)，共6列；
2. 表达式先进行了选择运算，选择了自然连接结果中，第三列 < 第六列的元组，即：<br/>R.B = S.B AND R.C = S.C AND R.C < S.F;<br/>然后选择了第1，3，5，6列投影，所以等价的SQL为：SELECT A,C,E,F FROM R,S WHERE R.B = S.B AND R.C = S.C AND R.C < S.F

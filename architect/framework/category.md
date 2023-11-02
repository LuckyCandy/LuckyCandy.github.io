## 软件架构分类

### 1.轻量级架构
轻量级架构一般有SSH、SSM，侧重于减小开发的复杂度，不带有侵略性API，对容器也没有依赖性，易于配置，启动速度也比较快；相应的它的处理能力也有所减弱（如事务功能弱、不具备分布式处理能力），比较适合开发中小型企业应用。

对于轻量级架构，一般分为以下3层，从上到下依次为：
* **表现层：**用户界面的逻辑，负责把用户要求的业务处理逻辑结果以可视化的友好的方式返回给用户，并提供接受用户命令的接口和页面控制逻辑代码

* **业务逻辑层：**负责处理问题领域的业务规则和根据用户需求进行业务处理以满足用户的功能需求。
* **持久层：**数据通过持久层进行持久化存储。

关于数据持久层的优点：
1. 屏蔽数据库平台的变换对业务逻辑层的影响。
2. 通过持久层的封装处理，可以在持久层实现多种数据库平台，对业务逻辑层来说提供的时统一的接口。
3. 能完成所有的数据库访问操作，代码可重用性高。

**SSH、SSM在各个分层对应实现：**

<img src="/assets/imgs/architect/framework/轻量级架构分层实现.png">

**Mybatis和Hibernate的区别：**
1. 开发方面：Hibernate中sql语句已经被封装好，可以直接使用；Mybatis时半自动化，sql需要手工完成；
2. sql优化：对于复杂的sql调优，Mybatis更方便；
3. 可移植性：Hibernate使用时自动生成sql预计，因此具备良好的数据库移植性；而Mybatis中手动编写的sql需要针对厂商的数据库进行修改。

### 2.SOA架构
面向服务架构（Service-Oriented architecture，SOA）是如何基于服务或基于一堆服务来实现业务架构。面向服务是在面向对象的基础之上发展来的，其区别如下：
* 对象主要是面向系统的而服务是面向业务的；
* 对象的粒度级别主要集中在类级而服务是粗粒度的；
* 类是函数调用为基础来交互的，而服务是以网络请求为基础交互的。

关于服务，一些常见的设计原则有：<mark>明确接口定义</mark>、<mark>自包含</mark>和<mark>模块化</mark>、<mark>粗粒度</mark>、<mark>松耦合</mark>、<mark>互操作性</mark>。

SQA紧密相关的技术主要有：<mark>UDDI（Universal Description, Discovery, and Integration）</mark>、<mark>WSDL（网络服务描述语言，Web Services Description Language）</mark>、<mark>SOAP（简单对象访问协议，Simple Object Access Protocol）</mark>等。

交互方式如下：

<img src="/assets/imgs/architect/framework/SOA交互.png">

**SAO的两种实现方式**
1. **服务注册表模式：**
    * Web Sewrvices是应用服务组件；
    * Web Sewrvices使用开放协议进行通信
    * Web Sewrvices是独立的并可自我描述
    * Web Sewrvices使用UDDI来发现
    * Web Sewrvices可被其他应用程序使用
    * XML是Web Sewrvices的基础（目前来说是JSON）
2. **企业服务总线模式（ESB）**
    企业服务总线架构模式在于整合，可能是公司内部各团队的服务，也可能是公司之间的不同服务，组合成一个整体来向外提供给服务。

    业务方只跟业务总线交互，由业务总线转发请求给后端服务，收到后在转发给业务方。

    <img src="/assets/imgs/architect/framework/ESB.png">


### 3.微服务架构
微服务将单体应用划分成一组小的服务，服务之间相互协作，实现业务功能每个服务运行在独立的进程中，服务件采用轻量级的通信机制协作（通常是HTTP/JSON），每个服务围绕业务能力范围进行构建，并且能够通过自动化机制独立部署。

**微服务具有的优势：**
1. 通过分解巨大单体应用，解决了单体应用复杂性的问题；
2. 让每个服务可以独立开发，开发者也能自由的选择可行的技术；
3. 每个服务单独部署，系统影响范围控制在有限的几个服务之间；
4. 横向扩展容易。

**微服务带来的挑战：**
1. 并非所有的系统都可以转成微服务；
2. 部署微服务更加复杂，需要使用容器编排技术；
3. 性能一般。多个服务间通过标准接口访问，可能产生延迟或调用出错；
4. 数据一致性问题；
5. 错误排查难度增大，需要使用链式日志技术

### 4.特定领域软件架构
特定领域软件架构（Domain Specific Software Architecture，DSSA）是在一个特定应用领域中，为一组应用提供组织结构参考的标准软件体系结构。

从功能覆盖范围角度由两种理解DSSA中领域的含义的方式：
1. 垂直域：定义了一个特定的系统族，包含整个系统族内的多个系统，结果是在该领域中可作为系统的可行解决方案中的一个通用软件体系结构；
2. 水平域：定义了在多个系统和多个系统族中功能区域的共有部分。在子系统级上涵盖多个系统族的特定部分功能。

**DSSA的基本活动和目标：**

<img src="/assets/imgs/architect/framework/DSSA基本活动.png">

### 5.其他架构类型

其他的架构类型还有<mark>MVC</mark>、<mark>MVP</mark>和<mark>MVVM</mark>

#### 5.1 MVC
MVC（Model-View-Controller）是软件工程中常见的一种软件架构模式，该模式把软件系统（项目）分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）

|部分|作用|
|-|:-:|
**Model：**|执行业务流程（不包括输入输出），存储业务数据。模型不依赖视图和控制器
**View：**|接收用户输入，展示模型中的数据，对Model由较强的依赖性；
**Controller：**|用来决定对于视图发来的请求，需要用哪一个模型来处理，以及处理完后需要跳回到哪一个视图。即用来连接视图和模型。

MVC模型常见的问题：
1. controller既处理业务逻辑，又处理拼接视图，违背了单一职责原则；
2. 视图依赖过多，不符合依赖倒置原则，且破坏“分层”架构思想；
3. model既处理前端业务逻辑，又处理后端数据库访问，违背单一职责原则。

#### 5.2 MVP
MVP从数据管理和用户界面两个维度的几个问题出发，将 Smalltalk 版本的 MVC 进行再分解演化而成，拆分出了几个中间组件：Interactor、Commands、Selections。

<img src="/assets/imgs/architect/framework/MVP.png">

MVP的优点：
1. 低耦合。模型与视图完全分开，修改视图不影响模型；
2. 可以更加高效的使用模型，因为所有的交互都发生在Presenter内部；
3. 复用性好。可以将一个Presenter用于多个视图，而不需要修改Presenter的逻辑。
4. 可测试性好。如果把逻辑放在Presenter中，就可以脱离用户接口来测试了。

#### 5.3 MVVM
<mark>MVVM是由MVP进化而来的</mark>。MVVM模式基本上与MVP相同，知识把MVP中的P分解成了VM，即ViewModel。MVVM中的数据可以实现双向绑定，当Model中的数据变化时，View-Model会自动更新，View也会自动变化。

<img src="/assets/imgs/architect/framework/MVVM.png">


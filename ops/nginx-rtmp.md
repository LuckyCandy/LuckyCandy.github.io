## 基于Nginx搭建RTMP服务
> 操作环境：  
os: CentOS Linux release 8.5.2111 

@info 由于Nginx本身不支持RTMP，所以需要安装组件，因此需要编译源码安装Nginx

### 1. 安装依赖
```shell
yum install -y pcre pcre-devel openssl openssl-devel gcc wget make vim curl
```

### 2. 下载源码并编译
#### 2.1 Nginx源码下载
```shell
wget https://nginx.org/download/nginx-1.24.0.tar.gz
```
#### 2.2 Module下载
```shell
wget https://github.com/winshining/nginx-http-flv-module/archive/refs/tags/v1.2.11.tar.gz
```
#### 2.3 解压编译
```shell
# 解压nginx
tar -zxvf nginx-1.24.0.tar.gz
# 解压module
tar -zxvf v1.2.11.tar.gz
# 进入nginx源码目录
cd nginx-1.24.0
# 构建
./configure --add-module=../nginx-http-flv-module-1.2.11
# 编译
make
# 安装
make install
```
### 3. 配置Nginx
安装路径默认在/usr/local下，配置文件路径在**/usr/local/nginx/conf/nginx.conf**，修改文件：
```shell
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}
rtmp {
    server {
        listen 1935;
        chunk_size 4096;
        application live {
            live on;
        }
        application hls {
            live on;
            hls on;
            hls_path /usr/local/nginx/html/hls;
        }
        application vod {
            play /usr/local/nginx/html/vod;
        }
    }
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

### 4. 启动
```shell
# 检查配置是否正确
/usr/local/nginx/sbin/nginx -t
# 启动
/usr/local/nginx/sbin/nginx
```

### 5. 测试

@info 测试环境在Mac上，RTMP运行于docker容器中暴漏端口80和1935，并分别绑定宿主机18880以及11935。我们使用ffmpeg捕捉摄像头数据，并将其推送到RTMP服务

#### 5.1 展示本机设备
```shell
# -f avfoundation: 所有可用的音频和视频设备
# -list_devices true: 显示设备列表
# -i "" 指定空输入设备
ffmpeg -f avfoundation -list_devices true -i ""
```

### 5.2 音视频捕捉并推送
```shell
# -f avfoundation: 指定使用avfoundation设备进行捕获
# -video_device_index 1: 指定使用的视频设备索引
# -audio_device_index 0: 指定使用的音频设备索引
# -framerate 30: 指定帧率
# -video_size 1280x720: 指定分辨率
# -c:v libx264 -preset ultrafast -tune zerolatency -pix_fmt yuv420p 这部分是用于设置视频编码器参数，这里使用了 H.264 编码器
# -c:a aac 是用于设置音频编码器参数，这里使用了 AAC 编码器
# -f flv rtmp://127.0.0.1:11935/hls/test 指定了输出格式为 FLV，并推送到RTMP服务器
ffmpeg -f avfoundation -video_device_index 0 -framerate 30 -video_size 1280x720 -audio_device_index 0 -i "" -c:v libx264 -preset ultrafast -tune zerolatency -pix_fmt yuv420p -c:a aac -f flv rtmp://127.0.0.1:11935/hls/test
```

### 5.3 使用VLC Player播放网络串流

地址为前一步的推送地址，即rtmp://127.0.0.1:11935/hls/test

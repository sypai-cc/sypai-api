# 思源派API

## 前置条件：

[Locoy.php](Locoy.php)需要上传到wordpress程序的根目录下，并在程序开头配置相应的$secretWord

[via.php](via.php)创建了一个自定义的REST API端点来验证WordPress用户名和密码，需要完整复制然后添加到主题的 `functions.php` 文件中

程序[publish.js](publish.js)监听在5566端口获取客户端发来的请求，需要运行在服务器上。

## 介绍：

[example.js](example.js)是一个客户端请求发布文章API的程序实例

程序[example.js](example.js)向服务器5566端口发送需要的数据。

[example.js](example.js)发送数据到[publish.js](publish.js)后，[publish.js](publish.js)先通过[via.php](via.php)验证username，password是否正确，然后再发送表单数据进行发布。


销售配置器 DEMO版
####
> author: afterloe liu
> mail: lm6289511@gmail.com

安装
===

```bash
$ git clone git@github.com:afterloe/yunqi_cloud.git
$ cd yunqi_cloud
$ npm install
```

如果安装出现问题，或则网络较为卡顿。可以使用淘宝的镜像
```bash
$ npm install --registry=https://registry.npm.taobao.org
```

数据库和配置
===

启动前请先编辑项目根目录下的configuration.json,修改 db的位置, 数据库使用的是sqlite3。
```bash
$ vim configuration.json

{
	"registryPort": "对外开放端口",
	"bindHost": "绑定监听IP，只内网访问可以改成127.0.0.1，对外可改成0.0.0.0",
	"db": "sqlite3 db的目录全路径"
}
```

sqlite3数据导入,使用sqlite3客户端工具或则使用shell工具进行数据导入
```bash
$ sqlite3 path/wehouse.db

> .read _path/doc/yunxi.sql
> .tables
allocation  scheme      style       type        warehouse
```

启动
===

项目是后端采用 koa2 前端采用 react 都使用了 ecmascript6 或 ecmascript6+ 的语法，为了保持兼容性，需要先编译再启动
```bash
$ pwd
path/yunqi_cloud
$ cd ./yunqi_cloud
$ npm run build

.
..
...
....

$ npm start
```

生产环境
===
生产环境可以使用pm2进行项目监控，或者使用作业提交的方式部署方案
```bash
$ nohup node bin/main.js > yunqi.log 2>&1 &
```
或
```bash
$ pm2 start bin/main.js --name yunqi --watch
```

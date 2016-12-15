销售配置器 DEMO版
###
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

使用
===

	浏览器访问 127.0.0.1:15021 进入销售配置器首页，左边为上衣选配目录，右边为裤子选配目录。选择目录进入到各个详细子目录中。选择喜欢的衣服和裤子进行搭配。最后勾选保存方案。保存方案之后可以看到系统对当前方案的一个推荐方案，点击比对的时候就能多选方案进行比对。但是比对按钮在勾选1个方案的时候是不能够进行比对的，所以需要勾选2个或2个以上的方案才能激活对比事件。在对比的页面可以看到选配项的属性和图片，对比之后就能在该页面进行下单。最后点击返回按钮即可返回到销售配置页  
	浏览器访问 127.0.0.1:15021/views 进入到销售页，该页能够看到最多被点击的衣服，也能看到最多被下单的衣服。这些数据都是之前客户页面进行勾选的时候收集统计的，所以排序和内容会有相同也会有不同，点击热点配置项，再单击添加到销售列表，就能将定制型发送到对应的项目上前端也就能看到最新的内容。  
	更多内容可以体验

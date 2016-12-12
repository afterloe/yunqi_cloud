/**!
 * tru.jwis.cn - routers/index.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Create Date: 16-11-4
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import common from './common';
import style from './style';

export default function (router) {
    router.get('/', common['home']); // 页面 - 销售配置器首页
    router.get('/compare', common['compare']); //页面 - 选配项比较页
    router.get('/views', common['views']);
    router.get('/json/style/styleInfo/:id', style['styleInfo']); // JSON - 获取style下的所有信息
};

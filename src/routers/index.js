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
    router.get("/", common['home']); // 首页
    router.get('/json/style/styleInfo/:id', style['styleInfo']);
};

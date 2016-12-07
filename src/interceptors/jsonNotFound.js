/**!
 * tru.jwis.cn - .js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Create Date: 16-11-4
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

export default async function (ctx, next) {
    if (ctx.status && 404 !== ctx.status) return;
    await next();
    ctx.status = 404;
    ctx.render('notFound', {
        title: `page is not found!`
    });
};

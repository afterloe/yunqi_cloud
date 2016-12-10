/**!
 * tru.jwis.cn - src/routers/style.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import wareHouseService from '../service/wareHouseService';

export default class Style {
    static async styleInfo(ctx, next) {
        if (ctx.error) return next();
        try {
            const {id} = ctx['params'];
            if(!id) ctx['error'] = new Error('缺少请求参数');
            const data = await wareHouseService.queryStylesheetById(id);
            ctx['body'] = ctx.success(data);
        } catch (error) {
            console.log(error);
            ctx.error = error;
        }

        return next();
    }
};

/**!
 * tru.jwis.cn -routers/common.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import jacketService from '../service/jacketService';
import pantsService from '../service/pantsService';

export default class Common {
    static async home(ctx, next) {
        if (ctx.error) return next();
        try {
            const jacketStyles = await jacketService.queryStylesheets();
            const pantsStyles = await pantsService.queryStylesheets();
            ctx.render('home', {
                title: `welcome TRU`,
                jacketStyles,
                pantsStyles
            });
        } catch (error) {
            console.log(error);
            ctx.error = error;
        }
        return next();
    }
};

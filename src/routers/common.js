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

export default class Common {
    static async home(ctx, next) {
        if (ctx.error) return next();
        try {
			const jacketStyles = jacketService.queryJacketStyle();
			const pantsStyles = [];

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

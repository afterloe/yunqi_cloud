/**!
 * tru.jwis.cn - src/routers/common.js
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

    static views(ctx, next) {
        if (ctx.error) return next();
        try {
          ctx.render('views', {
              title: '产品视图'
          });
        } catch (error) {

        }

        return next();
    }

    static async compare(ctx, next) {
        if (ctx.error) return next();
        try {
            ctx.render('compare', {
                title: '对比'
            });
        } catch (error) {
            ctx.error = error;
        }

        return next();
    }

    static async home(ctx, next) {
        if (ctx.error) return next();
        try {
            const jacketStyles = await jacketService.queryStylesheets();
            const pantsStyles = await pantsService.queryStylesheets();
            ctx.render('home', {
                title: 'JWI 销售配置器',
                jacketStyles,
                pantsStyles
            });
        } catch (error) {
            ctx.error = error;
        }
        return next();
    }
};

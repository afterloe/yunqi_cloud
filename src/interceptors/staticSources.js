/**!
 * tru.jwis.cn - interceptors/staticSources.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import {resolve} from "path";
import send from "koa-send";
import assert from "assert";

export default class StaticSources {
    constructor(root, opts = {}) {
        assert(root, 'root directory is required to serve files');
        opts.root = resolve(root);
        if (opts.index !== false) opts.index = opts.index || 'index.html';
        this.opts = opts;
    }

    asyncStatic() {
        let opts = this.opts;
        return opts.defer ? async function (ctx, next) {
            await next();
            if (ctx["method"] != 'HEAD' && ctx["method"] != 'GET') return;
            if (ctx["body"] != null || ctx["status"] != 404) return;
            await send(ctx, ctx.path, opts);
        } : async function (ctx, next) {
            if (ctx.method == 'HEAD' || ctx.method == 'GET') {
                if (await send(ctx, ctx.path, opts)) return;
            }
            await next();
        };
    }
};
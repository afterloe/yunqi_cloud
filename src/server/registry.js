/**!
 * tru.jwis.cn - server/registry.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import Koa from "koa";
import Pug from "koa-pug";
import {resolve} from "path";
import Route from "koa-router";
import staticService from "../interceptors/staticSources";
import logger from "../interceptors/requestLogger";
import notFound from "../interceptors/jsonNotFound";
import Controller from "../routers";

const [app, router, staticSources] = [new Koa(), new Route(), new staticService(resolve(__dirname, '..', '..', 'static'))];
const pug = new Pug({
    viewPath: 'views',
    debug: false,
    noCache: true,
    pretty: false,
    compileDebug: false,
    basedir: 'views',
    app: app
});

Controller(router);

app.use(logger).use(staticSources.asyncStatic()).use(router.routes()).use(router.allowedMethods()).use(notFound);

export default app;

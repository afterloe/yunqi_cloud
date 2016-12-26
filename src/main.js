/**!
 * tru.jwis.cn - main.js
 *
 * Copyright(c) afterloe.
 * MIT Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import 'babel-polyfill';
import {get} from '../config';
import registry from './server/registry';
import {createServer} from "http";

const [bindHost, registryPort] = [get('bindHost'), get('registryPort')];
const yunxiServer = createServer(registry.callback())
      .listen(registryPort, bindHost, () => console.log('%s : server is running in %s:%s', new Date(), bindHost, registryPort));


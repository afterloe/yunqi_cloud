/**!
 * tru.jwis.cn - main.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import 'babel-polyfill';
import {registryPort, bindHost} from '../configuration';
import registry from './server/registry';
import graceful from 'graceful';
import {createServer} from "http";

const yunxiServer = createServer(registry.callback())
      .listen(registryPort, bindHost, () => console.log('%s : server is running in %s:%s', new Date(), bindHost, registryPort));

graceful({
    server: [yunxiServer],
    error: (err, throwErrorCount) => {
        if (err['message'])
            err.message += ' (uncaughtException throw ' + throwErrorCount + ' times on pid:' + process.pid + ')';
    }
});

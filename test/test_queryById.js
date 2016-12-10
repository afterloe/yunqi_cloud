/**!
 * tru.jwis.cn - test/test_queryById.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {styleDao} from '../src/dao';

styleDao.queryStylesheetById(2).then(data => console.log(data)).catch(error => console.log(error));

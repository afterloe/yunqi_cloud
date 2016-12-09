/**!
 * tru.jwis.cn - dao/index.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import {resolve} from 'path';
import sequelize from './sequelize';

function load(name) {
	return sequelize.import(resolve(__dirname, name));
};

export const styleDao = load('style');
// export const pantsDao = load('pants');


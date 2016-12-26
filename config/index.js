/**!
 * afterloe - config/index.js
 *
 * Copyright(c) afterloe.
 * MIT Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {cpus} from 'os';
import {resolve} from 'path';

const siteConfig = new Map(); // 主配置列表
const defaultRoot = resolve(process['env']['HOME'], '.cynomys', 'yunqi');

const [num, dataDir, logDir] = [cpus()['length'], resolve(defaultRoot, 'data'), resolve(defaultRoot, 'logs')];

siteConfig.set('slaveNumber', num); // 奴隶数 -- 默认和 CPU核数相同
siteConfig.set('bindHost', '127.0.0.1'); // 监听IP
siteConfig.set('registryPort', 15021); // 监听端口
siteConfig.set('db', '/home/afterloe/wehouse.db'); // DB 目录
siteConfig.set('dataDir', dataDir); // 数据存储目录
siteConfig.set('logDir', logDir); // 日志存储目录
siteConfig.set('mailSender', {
	enable : false, // 是否开启邮件发送功能
});

export const get = key => siteConfig.has(key) ? siteConfig.get(key) : ({});

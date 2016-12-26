/**!
 * afterloe - src/slave.js
 *
 * Copyright(c) afterloe.
 * MIT Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {createServer} from 'http';
import registry from './server/registry.js';

const server = createServer(registry.callback());

let workerServer;

process.on('message', (msg, handler) => {
	if ('start-up' === msg) {
		workerServer = handler;
		workerServer.on('connection', socket => server.emit('connection', socket));
		console.log(`${new Date().toLocaleString()} : slave ${process['pid']} is ready to running`);
	}
});

process.on('uncaughtException', err => {
	process.send({act: 'suicide'});

	workerServer.close(() => {
		process.exit(1);
	});

	process.nextTick(() => process.exit(1));
});

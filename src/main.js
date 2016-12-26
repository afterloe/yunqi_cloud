/**!
 * tru.jwis.cn - main.js
 *
 * Copyright(c) afterloe.
 * MIT Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import 'babel-polyfill';
import cluster from 'cluster';
import {get} from './config';
import {createServer} from "net";
import {resolve} from 'path';
import {fork} from 'child_process';

const [threadManager, slavePath ,bindHost, registryPort, {enable, slaveNum = 1}] = [new Map(), resolve(__dirname, 'slave'), get('bindHost'), get('registryPort'), get('distributed')];

function startSlave() {
	const worker = fork(slavePath);
	const {pid} = worker;

	worker.on('message', msg => {
		if ('suicide' === msg['act']) startSlave();
	});

	worker.on('exit', () => {
		threadManager.has(pid)? threadManager.delete(pid): null;
		startSlave();
	});

	worker.send('start-up', this);
	threadManager.set(pid, worker);	
}

if (enable) {
//	cluster['schedulingPolicy'] = cluster['SCHED_RR']; // 启用轮叫调度策略
	const server = createServer();
	server.listen(registryPort, bindHost, () => {
		server::startSlave;
		for(let i = 0; i < slaveNum; i++) {
			server::startSlave();
		}
	});
} else {
	// 单进程
	console.log('sing thread runner');
}

process.on('exit', () => {
	for (let worker of threadManager.values()) {
		worker.kill();
	}

	threadManager.clear();
	console.log('server will shut down safely');
});

process.on('uncaughtException', err => {
	console.log(`${new Date().toLocaleString()} catch express : 
		${err['message']}
		${err['stack']}
	`);
});

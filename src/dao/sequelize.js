/**!
 * tru.jwis.cn - src/dao/sequelize.js 
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import sqliteLib from 'sqlite3';
import {get} from '../../config';

const db = get('db');
const dbPath = db? db: ':memory:';
const sqlite3 = sqliteLib.verbose();
const databases = new sqlite3.Database(dbPath);

function define(dao) {
	let object = {};
	for (let k in dao) {
		object[k] = async function (...args) {
			return dao[k].apply(databases, args);
		}
	}
	return object;
}

function buildModule(path) {
	let module = require(path);
	return module.default({define});
}

export default {import: buildModule, define};

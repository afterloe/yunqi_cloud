/**!
 * tru.jwis.cm - /src/dao/style.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

const sqlMap = new Map();

sqlMap.set('queryStylesheets','SELECT name,representative,id,colors,interval FROM style WHERE type = $type');
sqlMap.set('queryStylesheetById', 'SELECT name,interval,id,describe FROM style WHERE id = $id');

export default sequelize => sequelize.define({
	queryStylesheetById: function(__id) {
		return new Promise((resolve,reject) => {
			this.get(sqlMap.get('queryStylesheetById'), {$id: __id}, (error, row) => {
				if(error) reject(error);
				resolve(row);
			});
		});
	},
	queryStylesheets: function (__type) {
		return new Promise((resolve,reject) => {
			this.all(sqlMap.get('queryStylesheets'), {$type: __type}, (error, rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	}
});

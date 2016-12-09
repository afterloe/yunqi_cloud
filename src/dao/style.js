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

sqlMap.set('selectStyle','SELECT name,representative,id,colors,interval FROM style WHERE type = $type');

export default sequelize => sequelize.define({
	selectStylesheets: function (__type) {
		return new Promise((resolve,reject) => {
			this.all(sqlMap.get('selectStyle'), {$type: __type}, (error, rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	}
});

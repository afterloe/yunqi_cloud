/**!
 * tru.jwis.cm - /src/dao/jacket.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

const sqlMap = new Map();

sqlMap.set('selectStyle','SELECT * FROM style WHERE type = 1');

export default sequelize => sequelize.define({
	selectStyle: function () {
		return new Promise((resolve,reject) => {
			this.all(sqlMap.get('selectStyle'), (error, rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	}
});

/**!
 * tru.jwis.cm - /src/dao/warehouse.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

const sqlMap = new Map();

sqlMap.set('queryStylesheetItems','SELECT name,price,color,repertory,thumbnail,cycle,hot FROM warehouse WHERE style = $style');

export default sequelize => sequelize.define({
	queryStylesheetItems: function (__style) {
		return new Promise((resolve,reject) => {
			this.all(sqlMap.get('queryStylesheetItems'), {$style: __style}, (error, rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	}
});

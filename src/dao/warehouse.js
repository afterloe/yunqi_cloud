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

sqlMap.set('queryStylesheetItems','SELECT id,name,price,color,repertory,thumbnail,cycle,hot FROM warehouse WHERE style = $style');
sqlMap.set('queryLook','SELECT id,name,price,color,repertory,thumbnail,cycle FROM warehouse order by hot DESC LIMIT 0,9');
sqlMap.set('queryHot','SELECT id,name,price,color,repertory,thumbnail,cycle FROM warehouse order by sell DESC LIMIT 0,9');

export default sequelize => sequelize.define({
	queryHot: function() {
		return new Promise((resolve, reject) => {
			this.all(sqlMap.get('queryHot'), (error,rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	},
	queryLook: function () {
		return new Promise((resolve,reject) => {
			this.all(sqlMap.get('queryLook'), (error, rows) => {
				if (error) reject(error);
				resolve(rows);
			});
		});
	},
	queryStylesheetItems: function (__style) {
		return new Promise((resolve,reject) => {
			this.all(sqlMap.get('queryStylesheetItems'), {$style: __style}, (error, rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	}
});

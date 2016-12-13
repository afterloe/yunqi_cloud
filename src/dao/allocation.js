/**!
 * tru.jwis.cm - /src/dao/allocation.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

const sqlMap = new Map();

sqlMap.set('queryAllocation','SELECT id,color,name,repertory,thumbnail FROM allocation ORDER BY repertory DESC LIMIT 0,9');

export default sequelize => sequelize.define({
	queryAllocation: function () {
		return new Promise((resolve,reject) => {
			this.all(sqlMap.get('queryAllocation'), (error, rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	}
});

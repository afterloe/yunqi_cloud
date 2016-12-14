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
sqlMap.set('querySchemeByName','SELECT id,color,name,repertory,thumbnail FROM allocation WHERE name = $name');
sqlMap.set('likeScheme','UPDATE allocation SET repertory = $count WHERE id = $id');
sqlMap.set('createScheme', 'INSERT INTO allocation (name,thumbnail,color,repertory) VALUES (?,?,?,1)');

export default sequelize => sequelize.define({
	createScheme: function (name, mould, rgb) {
		return new Promise((resolve, reject) => {
			this.run(sqlMap.get('createScheme'), [name, mould, rgb], (err, flag) => {
				if (err) reject(err);
				resolve(flag);
			});
		});
	},
	likeScheme: function (_id, _count) {
		return new Promise((resolve, reject) => {
			this.run(sqlMap.get('likeScheme'), {$id : _id, $count: _count}, (err, row) => {
				if (err) reject(err);
				resolve(row);
			});
		});
	},
	querySchemeByName: function (_name) {
		return new Promise((resolve, reject) => {
			this.get(sqlMap.get('querySchemeByName'), {$name: _name}, (err, row) => {
				if (err) reject(err);
				resolve(row);
			});
		});
	},
	queryAllocation: function () {
		return new Promise((resolve, reject) => {
			this.all(sqlMap.get('queryAllocation'), (err, rows) => {
				if (err) reject(err);
				resolve(rows);
			});
		});
	}
});

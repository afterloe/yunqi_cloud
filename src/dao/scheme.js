/**!
 * tru.jwis.cm - /dao/scheme.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

const sqlMap = new Map();

sqlMap.set('queryScheme','SELECT id,view,like FROM scheme WHERE jackeId = $jackeId AND pantsId = $pantsId');
sqlMap.set('createScheme', 'INSERT INTO scheme (jackeId,pantsId,jackeThumbnail,pantsThumbnail) VALUES (?,?,?,?)');
sqlMap.set('likeScheme', 'UPDATE scheme SET like=? WHERE id=?');
sqlMap.set('viewScheme', 'UPDATE scheme SET view=? WHERE id=?');
sqlMap.set('querySchemeById', 'SELECT * FROM scheme WHERE id=$id');
sqlMap.set('getRecommend', 'SELECT jackeThumbnail,pantsThumbnail,id FROM scheme ORDER BY like,view DESC LIMIT 0,5');

export default sequelize => sequelize.define({
	likeScheme: function (_id, count) {
		return new Promise((resolve, reject) => {
			this.run(sqlMap.get('likeScheme'), [count, _id], (error, flag) => {
				if(error) reject(error);
				resolve(flag);
			});
		});
	},
	createScheme: function (scheme) {	
		return new Promise((resolve, reject) => {
			const {jackeId, pantsId, jackeThumbnail, pantsThumbnail} = scheme;
			console.log(typeof jackeId);
			console.log(typeof pantsId);
			console.log(jackeId, pantsId, jackeThumbnail, pantsThumbnail);
			this.run(sqlMap.get('createScheme'), [jackeId, pantsId, jackeThumbnail, pantsThumbnail], (error,flag) => {
				if(error) reject(error);
				resolve(flag);
			});
		});
	},
	getRecommend: function() {
		return new Promise((resolve, reject) => {
			this.all(sqlMap.get('getRecommend'), (error, rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	},
	viewScheme: function (_id, count) {
		return new Promise((resolve,reject) => {
			this.run(sqlMap.get('viewScheme'), [count,_id], (error, flag) => {
				if(error) reject(error);
				resolve(flag);
			});
		});
	},
	querySchemeById: function (_id) {
		return new Promise((resolve,reject) => {
			this.get(sqlMap.get('querySchemeById'), {$id: _id}, (error, row) => {
				if(error) reject(error);
				resolve(row);
			});
		});
	},
	queryScheme: function (__jackeId, __pantsId) {
		return new Promise((resolve,reject) => {
			this.get(sqlMap.get('queryScheme'), {$jackeId: __jackeId, $pantsId: __pantsId},(error, row) => {
				if(error) reject(error);
				resolve(row);
			});
		});
	}
});

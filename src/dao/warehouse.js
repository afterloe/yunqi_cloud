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

sqlMap.set('queryStylesheetItems','SELECT id,name,price,color,repertory,thumbnail,cycle,hot FROM warehouse WHERE style = $style ORDER BY hot,sell DESC');
sqlMap.set('queryById', 'SELECT id,name,price,color,repertory,thumbnail,cycle,hot,sell FROM warehouse WHERE id = $id');
sqlMap.set('queryLook', 'select price,repertory,thumbnail,cycle,warehouse.id as id,warehouse.name as color,hot,style.name as name,style from warehouse left outer join style on warehouse.style = style.id order by hot desc limit 0,9');
sqlMap.set('queryHot', 'select price,repertory,thumbnail,cycle,warehouse.id as id,warehouse.name as color,sell,style.name as name,style from warehouse left outer join style on warehouse.style = style.id order by sell desc limit 0,9');
sqlMap.set('viewGoods', 'UPDATE warehouse SET hot = $hot WHERE id = $id');
sqlMap.set('buyGoods', 'UPDATE warehouse SET sell = $sell, repertory = $repertory WHERE id = $id');
sqlMap.set('createGoods', 'INSERT INTO warehouse (name, price, color, style, repertory, thumbnail, cycle, hot, sell) VALUES (?,?,?,?,?,?,?,?,?)');
sqlMap.set('queryGoodsByName', 'SELECT id,name FROM warehouse WHERE name = $name AND style = $style')

export default sequelize => sequelize.define({
	queryGoodsByName: function (name, style) {
		return new Promise((resolve, reject) => {
			this.get(sqlMap.get('queryGoodsByName'), {$name: name, $style: style}, (error, row) => {
				if (error) reject(error);
				resolve(row);
			});
		});
	},
	createGoods: function (...args) {
		return new Promise((resolve, reject) => {
			this.run(sqlMap.get('createGoods'), args, (error,flag) => {
				if(error) reject(error);
				resolve(flag);
			});
		});
	},
	viewGoods: function (_id, hotCount) {
		return new Promise((resolve, reject) => {
			this.run(sqlMap.get('viewGoods'), {$id: _id, $hot: hotCount}, (error, flag) => {
				if(error) reject(error);
				resolve(flag);
			});
		});
	},
	buyGoods: function (_id, sellCount, repertoryCount) {
		return new Promise((resolve, reject) => {
			this.run(sqlMap.get('buyGoods'), {$sell: sellCount, $repertory: repertoryCount, $id: _id}, (error, flag) => {
				if(error) reject(error);
				resolve(flag);
			});
		});
	},
	queryHot: function() {
		return new Promise((resolve, reject) => {
			this.all(sqlMap.get('queryHot'), (error,rows) => {
				if(error) reject(error);
				resolve(rows);
			});
		});
	},
	queryById: function (_id) {
		return new Promise((resolve, reject) => {
			this.get(sqlMap.get('queryById'), {$id: _id}, (error,row) => {
				if (error) reject(error);
				resolve(row);
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

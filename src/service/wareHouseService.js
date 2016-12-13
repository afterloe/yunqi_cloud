/**!
 * tru.jwis.cn - service/wareHouseService.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import {styleDao, warehouseDao, allocationDao} from '../dao';

export default class WareHouseService {

	static async queryStylesheetById(id) {
	    const [stylesheetInfo, stylesheetItems] = await Promise.all([styleDao.queryStylesheetById(id), warehouseDao.queryStylesheetItems(id)]);
		return {stylesheetInfo, stylesheetItems};
	}

	static async sellGoods(id) {
		const good = await warehouseDao.queryById(id);
		let flag = false;
		if (good && good['repertory'] && good['sell']) {
			let [sellCount, repertoryCount] = [Number.parseInt(good['sell']), Number.parseInt(good['repertory'])];
			sellCount++;
			repertoryCount--;
			if (repertoryCount < 0) repertoryCount = 0;
			await warehouseDao.buyGoods(good['id'], sellCount, repertoryCount);
			flag = true;
		}
		return flag;
	}

	static async collectionHot(id) {
		const good = await warehouseDao.queryById(id);
		let flag = false;
		if (good && good['hot']) {
			let hotCount = Number.parseInt(good['hot']);
			hotCount++;
			await warehouseDao.viewGoods(good['id'], hotCount);
			flag = true;
		}
		return flag;
	}
	
	static async queryHot() {
		const list = await warehouseDao.queryHot();
		return list;
	}

	static async queryAllocation() {
		const list = await allocationDao.queryAllocation();
		return list;
	}

	static async queryLook() {
		const list = await warehouseDao.queryLook();
		return list;
	}
}

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

export default class JacketService {

	static async queryStylesheetById(id) {
	    const [stylesheetInfo, stylesheetItems] = await Promise.all([styleDao.queryStylesheetById(id), warehouseDao.queryStylesheetItems(id)]);
		return {stylesheetInfo, stylesheetItems};
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

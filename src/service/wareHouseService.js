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

import {styleDao, warehouseDao} from '../dao';

export default class JacketService {

	static async queryStylesheetById(id) {
    const [stylesheetInfo, stylesheetItems] = await Promise.all([styleDao.queryStylesheetById(id), warehouseDao.queryStylesheetItems(id)]);
		return {stylesheetInfo, stylesheetItems};
	}
}

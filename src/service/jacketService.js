/**!
 * tru.jwis.cn - service/jacketService.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import {styleDao} from '../dao';

export default class JacketService {

	static queryStylesheets() {
		return styleDao.queryStylesheets(1);
	}
}

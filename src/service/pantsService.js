/**!
 * tru.jwis.cn - service/pantsService.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import {ratzDao} from '../dao'

export default class JacketService {

	static queryJacketStyle() {
		return ratzDao.selectStyle();
	}
}

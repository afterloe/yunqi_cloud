/**!
 * tru.jwis.cn - service/jacketService
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import {jacketDao} from '../dao'

export default class JacketService {

	static queryJacketStyle() {
		return jacketDao.selectStyle();
	}
}

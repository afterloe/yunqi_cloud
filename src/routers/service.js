/**!
 * tru.jwis.cn - route/service.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import wareHouseService from '../service/wareHouseService';

export default class Service {

	static async appendScheme(ctx, next) {
		if (ctx['error']) return next();
		try {
			const {price, name , color, repertory, thumbnail} = ctx['request']['body'];
			const flag = await wareHouseService.appendToWarehouse(price, name , color, repertory, thumbnail);
			ctx['body'] = ctx.success(true);
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}
}

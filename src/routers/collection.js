/**!
 * tru.jwis.cn - routers/collection.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import wareHouseService from '../service/wareHouseService';

export default class Collection {

	static look(ctx, next) {
		if (ctx['error']) return next();
		try {
		
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}

	static hot(ctx, next) {
		if (ctx['error']) return next();
		try {
		
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}

	static allocation(ctx, next) {
		if (ctx['error']) return next();
		try {
		
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}

	static async getLook(ctx, next) {
		if (ctx['error']) return next();
		try {
			const list = await wareHouseService.queryLook();
			ctx['body'] = ctx.success(list);
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}

	static async getHot(ctx, next) {
		if (ctx['error']) return next();
		try {
			const list = await wareHouseService.queryHot();
			ctx['body'] = ctx.success(list);
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}

	static async getAllocation(ctx, next) {
		if (ctx['error']) return next();
		try {
			const list = await wareHouseService.queryAllocation();
			ctx['body'] = ctx.success(list);
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}
}

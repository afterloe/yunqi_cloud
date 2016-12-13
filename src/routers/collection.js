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
import schemeService from '../service/schemeService';

export default class Collection {

	static async look(ctx, next) {
		if (ctx['error']) return next();
		try {
			const {id} = ctx['params'];
			const flag = await wareHouseService.collectionHot(id);
			ctx['body'] = ctx.success(flag);
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}

	static async hot(ctx, next) {
		if (ctx['error']) return next();
		try {
			const {id} = ctx['params'];
			const flag = await wareHouseService.sellGoods(id);
			ctx['body'] = ctx.success(flag);
		} catch (error) {
			ctx['error'] = error;
		}

		return next();
	}

	static async scheme(ctx, next) {
		if(ctx['error']) return next();
		try {
			const {jackeId, pantsId} = ctx['request']['body'];
			if (!jackeId || !pantsId) throw new Error('lack params');
			const flag = await schemeService.collectionUserScheme(jackeId, pantsId);
			ctx['body'] = ctx.success(flag);
		} catch (error) {
			console.log(error);
			ctx['error'] = error;
		}

		return next();
	}

	static async allocation(ctx, next) {
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
			console.log(error);
			ctx['error'] = error;
		}

		return next();
	}

	static async getHotRecommend(ctx, next) {
		if (ctx['error']) return next();
		try {
			const {id} = ctx['params'];
			const list = await schemeService.askForRecommendation(id);
			ctx['body'] = ctx.success(list);
		} catch (error) {
			ctx['error'] = error;
		}
	}

	static async getRecommend(ctx, next) {
		if (ctx['error']) return next();
		try {
			const list = await schemeService.obmitSystemRecommend();
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

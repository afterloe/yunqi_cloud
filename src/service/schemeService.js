/**!
 * tru.jwis.cn - service/schemeService.js 
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {schemeDao, warehouseDao} from '../dao';

export default class SchemeService {

	static async askForRecommendation(id) {
		let list = await schemeDao.askForRecommendation(id);
		if(!list || 0 === list.length) {
			list = await schemeDao.getRecommend();
		}
		return list;
	}

	static async collectionUserScheme(jackeId, pantsId) {
		let scheme = await schemeDao.queryScheme(jackeId, pantsId);
		if (scheme) {
			let likeCount = Number.parseInt(scheme['like']);
			likeCount++;
			await schemeDao.likeScheme(scheme['id'], likeCount);
		} else {
			const [jacket, pants] = await Promise.all([warehouseDao.queryById(jackeId), warehouseDao.queryById(pantsId)]);
			if (!jacket || !pants) return;
			await schemeDao.createScheme({
				jackeId: jacket['id'],
				pantsId: pants['id'],
				jackeThumbnail: jacket['thumbnail'],
				pantsThumbnail: pants['thumbnail']
			});
		}
	}

	static async obmitSystemRecommend() {
		const recommendList = await schemeDao.getRecommend();
		return recommendList || [];
	}

	static async addLook(id) {
		let scheme = await schemeDao.querySchemeById(id);
		if (scheme) {
			let viewCount = Number.parseInt(scheme['view']);
			viewCount++;
			await schemeDao.likeScheme(scheme['id'], viewCount);
		}
	}
}

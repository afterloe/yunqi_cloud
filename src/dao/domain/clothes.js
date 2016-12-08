/**!
 * tru.jwis.cn - dao/domain/clothes.js 
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import YunxiDomain from './yunxiDomain';

export default class Clothes extends YunxiDomain {

	constructor(id, name, thumbnail, bitmap) {
		super(id, name);
		this['thumbnail'] = thumbnail;
		this['bitmap'] = bitmap;
	}

	getThumbnail() {
		return this['thumbnail'];
	}

	setThumbnail(thumbnail) {
		this['thumbnail'] = thumbnail;
	}

	getBitmap() {
		return this['bitmap']
	}

	setBitmap(bitmap) {
		this['bitmap'] = bitmap;
	}
}

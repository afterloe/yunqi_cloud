/**!
 * tru.jwis.cn - dao/domain/yunxiDomain.js 
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

export default class YunxiDomain {

	constructor(id, name) {
		this['id'] = id;
		this['name'] = name;
	}

	getId() {
		return this['id'];
	}

	setId(id) {
		this['id'] = id;
	}

	getName() {
		return this['name'];
	}

	setName(name) {
		this['name'] = name;
	}

	equals(obj) {
		if (obj instanceof YunxiDomain)	{
			return this['id'] === obj['id'];
		} 

		return false;
	}

	toString() {
		this['type'] = 'YunxiDomain';
		const str = JSON.stringify(this);
		delete this['type'];
		return str;
	}
}


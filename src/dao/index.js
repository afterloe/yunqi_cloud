/**!
 * tru.jwis.cn - dao/index.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import Clothes from './domain/clothes';

let jacketStyles = [{name:'NELSON', pic:'15K/20K',thumbnails:'OM196D.png', colors:[]},{name:'SIMON', pic:'10K/15K', thumbnails:'OM197A.png', colors:[]},{name:'CARNES', pic:'10K/15K', thumbnails:'OM198A.png', colors:[]},{name:'DAWSON', pic:'10K/10K', thumbnails:'OM199C.png', colors:[]},{name:'BAKER', pic:'10K/10K', thumbnails:'OM200D.png', colors:[]},{name:'COOPER', pic:'10K/10K', thumbnails:'OM201A.png', colors:[]},{name:'MOORE', pic:'5K/10K', thumbnails:'OM202C.png',colors:[]},{name:'RATZ', pic:'5K/10K', thumbnails:'OM203A.png', colors:[]},{name:'MEAGER', pic:'5K/10K', thumbnails:'OM204A.png', colors:[]},{name:'CAYLEY', pic:'5K/5K', thumbnails:'OM206C.png', colors:[]},{name:'JWI', pic:'5K/10K', thumbnails:'OM197A.png', colors:[]}];

class Jacket {
	/**
	 *	查询夹克样式列表
	 */
	static selectStyle() {
		return jacketStyles;
	}

	/**
	 *	查询夹克产品列表
	 *
	 *	@param style 夹克样式
	 */
	static selectJacketItems(style) {
	
	}
}

class Ratz {

	/**
	 *	查询裤子样式列表
	 */
	static selectStyle() {

	}

	/**
	 *	查询裤子产品列表
	 *
	 *	@param style 裤子样式
	 */
	static selectRatzItems(style) {

	}
}

export const jacketDao = Jacket;
export const ratzDao = Ratz;

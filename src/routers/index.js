/**!
 * tru.jwis.cn - routers/index.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Create Date: 16-11-4
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import common from './common';
import style from './style';
import service from './service';
import coll from './collection';

export default router => {
    router.get('/', common['home']); // 页面 - 销售配置器首页
    router.get('/compare', common['compare']); //页面 - 选配项比较页
    router.get('/views', common['views']);
    router.get('/json/style/styleInfo/:id', style['styleInfo']); // JSON - 获取style下的所有信息

  	router.get('/json/collection/look/:id', coll['look']); // 收集吸引眼球的衣服(规则：点击衣服的时候就收集)
  	router.get('/json/collection/sell/:id', coll['hot']); // 收集点击下单的衣服
  	router.post('/json/collection/allocation', coll['allocation']); // 收集定制项
  	router.post('/json/collection/scheme', coll['scheme']); // 收集用户选择的方案

  	router.get('/json/obmit/look', coll['getLook']); // 获取 吸引眼球的数据
  	router.get('/json/obmit/hot', coll['getHot']); // 获取 最热销的数据
  	router.get('/json/obmit/allocation', coll['getAllocation']); // 获取 热点定制项
  	router.get('/json/obmit/recommend', coll['getRecommend']); // 获取冷推荐数据
  	router.get('/json/obmit/recommend/:id', coll['getHotRecommend']); // 获取热推荐数据

	router.post('/json/service/appendScheme', service['appendScheme']); // 添加到系统项
};

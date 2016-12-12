/**!
 * tru.jwis.cn - src/routers/views.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

class SellViews extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className='container'>
            <div className='pull-right sellViews-addView'>+ 添加视图</div>
              <div className='row compareKeys'>
                  <span className='compareActive'>最吸引眼球</span>
                  <span>最热销</span>
                  <span>热点定制项</span>
              </div>
              <div className='row compareValues'>

                  <div className='col-md-3 sellViews-item'>
                      <div className='sellViews-view'><img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg'/></div>
                      <div className='sellViews-card'>
                          <p className='sellViews-pri'>价格 : $225.00</p>
                          <p className='sellViews-info'>商品名 : REGULAR</p>
                          <p className='sellViews-info'>色系 : PRIMALOFT SILVER</p>
                          <div className='sellViews-other'>
                            <span className='pull-left'>库存: 219</span>
                            <span className='pull-right'>交货周期: 3~5 天</span>
                          </div>
                      </div>
                  </div>

                  <div className='col-md-3 sellViews-item'>
                      <div className='sellViews-view'><img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg'/></div>
                      <div className='sellViews-card'>
                          <p className='sellViews-pri'>价格 : $225.00</p>
                          <p className='sellViews-info'>商品名 : REGULAR</p>
                          <p className='sellViews-info'>色系 : PRIMALOFT SILVER</p>
                          <div className='sellViews-other'>
                            <span className='pull-left'>库存: 219</span>
                            <span className='pull-right'>交货周期: 3~5 天</span>
                          </div>
                      </div>
                  </div>

                  <div className='col-md-3 sellViews-item'>
                      <div className='sellViews-view'><img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg'/></div>
                      <div className='sellViews-card'>
                          <p className='sellViews-pri'>价格 : $225.00</p>
                          <p className='sellViews-info'>商品名 : REGULAR</p>
                          <p className='sellViews-info'>色系 : PRIMALOFT SILVER</p>
                          <div className='sellViews-other'>
                            <span className='pull-left'>库存: 219</span>
                            <span className='pull-right'>交货周期: 3~5 天</span>
                          </div>
                      </div>
                  </div>

                  <div className='col-md-3 sellViews-item'>
                      <div className='sellViews-view'><img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg'/></div>
                      <div className='sellViews-card'>
                          <p className='sellViews-pri'>价格 : $225.00</p>
                          <p className='sellViews-info'>商品名 : REGULAR</p>
                          <p className='sellViews-info'>色系 : PRIMALOFT SILVER</p>
                          <div className='sellViews-other'>
                            <span className='pull-left'>库存: 219</span>
                            <span className='pull-right'>交货周期: 3~5 天</span>
                          </div>
                      </div>
                  </div>

              </div>
        </div>
      );
    }
}

ReactDOM.render(
    <SellViews />,
    document.getElementById('body')
);

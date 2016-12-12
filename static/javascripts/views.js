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

const loadHotAllocation = activityView => {
      if ('热点定制项' !== activityView) return [];
      return [1,2];
}

const loadHotSell = activityView => {
      if ('最热销' !== activityView) return loadHotAllocation(activityView);
      return [1,2,3,4,5];
}

const loadHightClick = activityView => {
      if ('最吸引眼球' !== activityView) return loadHotSell(activityView);
      return [1,2,3];
};

class SellViews extends React.Component {
    constructor(props) {
        super(props);
        this['changeSelectView'] = this['changeSelectView'].bind(this);
        this['state'] = {
          activityView: props['views'][0]
        };
    }

    componentWillMount() {
        const {activityView} = this['state'];
        const items = loadHightClick(activityView);
        this.setState({items});
    }

    changeSelectView(event) {
        const activityView = event['currentTarget']['innerText'];
        const items = loadHightClick(activityView);
        this.setState({activityView, items});
    }

    renderViewItems() {
        const {items} = this['state'];
        return items.map(item => (
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
        ));
    }

    renderViewsList() {
        const {activityView} = this['state'];
        return this['props']['views'].map(view => (<span className={view === activityView? 'compareActive':''} onClick={this.changeSelectView}>{view}</span>));
    }

    render() {
      return (
        <div className='container'>
            <div className='row compareKeys'>
                {this.renderViewsList()}
            </div>
            <div className='row compareValues'>
                {this.renderViewItems()}
            </div>
        </div>
      );
    }
}

//             <div className='pull-right sellViews-addView'>+ 添加视图</div>

ReactDOM.render(
    <SellViews views={['最吸引眼球','最热销','热点定制项']}/>,
    document.getElementById('body')
);

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

function obmitItemValues(__path) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr['timeout'] = 15 * 1000;
		xhr['ontimeout'] = event => reject(new Error('time is up!'));
		xhr.open('get', __path);
		xhr.send();
		xhr.onreadystatechange = () => {
			if (4 === xhr['readyState']) {
				if (200 === xhr['status']) {
					const result = JSON.parse(xhr['responseText']);
					resolve(result['result']);
				} else
					reject(new Error('system error'));
			}
		}
	});
}

const loadHotAllocation = activityView => {
      if ('热点定制项' !== activityView) return [];
      return obmitItemValues('/json/obmit/allocation');
}

const loadHotSell = activityView => {
      if ('最热销' !== activityView) return loadHotAllocation(activityView);
      return obmitItemValues('/json/obmit/hot');
}

const loadHightClick = activityView => {
      if ('最吸引眼球' !== activityView) return loadHotSell(activityView);
      return obmitItemValues('/json/obmit/look');
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
        const [__self, items] = [this, loadHightClick(activityView)];
		items.then(data => {
			__self.setState({items: data});
		}).catch(err => {
			alert('系统繁忙');
		});
    }

    changeSelectView(event) {
        const activityView = event['currentTarget']['innerText'];
        const items = loadHightClick(activityView);
		items.then(data => this.setState({items: data, activityView})).catch(err => alert('系统繁忙'));
    }

	renderCard(item, activityView) {
		return '热点定制项' === activityView ? (
			<div className='sellViews-card'>
                  <p className='sellViews-pri'>需求数 : {item['repertory'] || 0}</p>
                  <p className='sellViews-info'>商品名 : {item['name']}</p>
                  <p className='sellViews-info'>色系 : <span className='colorDisc' style={{'background-color':item['color']}}></span></p>
            </div>
		) : (
			<div className='sellViews-card'>
                  <p className='sellViews-pri'>价格 : HK$ {item['price'] || '-'}</p>
                  <p className='sellViews-info'>商品名 : {item['name']}</p>
                  <p className='sellViews-info'>色系 : {item['color']}</p>
                  <div className='sellViews-other'>
                    <span className='pull-left'>库存: {item['repertory'] || 0}</span>
                    <span className='pull-right'>交货周期: {item['cycle'] || '-'} 天</span>
                  </div>
            </div>
		);
	}

    renderViewItems() {
        const {items = [], activityView} = this['state'];
        return items.map(item => (
          <div className='col-md-3 sellViews-item'>
              <div className='sellViews-view'><img src={'/images/warehouse/' + item['thumbnail']} /></div>
              {this.renderCard(item, activityView)}
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

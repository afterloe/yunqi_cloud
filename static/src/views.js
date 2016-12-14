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

function paseData(data) {
	const __result = [];
	for (let __data in data) {
		__result.push(`${__data}=${data[__data]}`);
	}
	return __result.join('&');
}

function sendScheme(__data) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr['timeout'] = 15 * 1000;
		xhr['ontimeout'] = event => reject(new Error('time is up!'));
		xhr.open('post', '/json/service/appendScheme');
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(paseData(__data));
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

class SellViewsForm extends React.Component {
    constructor(props){
		super(props);
		this['cancle'] = this['cancle'].bind(this);
		this['submit'] = this['submit'].bind(this);
		this['inputName'] = this['inputName'].bind(this);
		this['inputPrice'] = this['inputPrice'].bind(this);
    }

	cancle(event) {
		this['props'].onClose();
	}

	submit(event) {
		const {price, name} = this['state'];
		if (!price || !name) {
			alert('请输入必要参数');
		}
		const data = this['props']['data'];
		sendScheme(Object.assign(data, {name, price})).then(data => {
			this['props'].onClose();
		}).catch(err => console.log(err));
	}

	inputPrice(event) {
		const price = event['currentTarget']['value'];
		this.setState({price});
	}

	inputName(event) {
		const name = event['currentTarget']['value'];
		this.setState({name});
	}

    render() {
		const {data} = this['props'];
		if (!data) return (<span></span>);
		return (
			<div className='sellViews-form'>
				<div className='sellViews-clos'>
					<span className='sellViews-clo'><span className='sellViews-key'>商品名</span><input onChange={this.inputName} /></span>
					<span className='sellViews-clo'><span className='sellViews-key'>定价</span><input onChange={this.inputPrice} /></span>
				</div>
				<div className='sellViews-other'>
					<span className='sellViews-btn' style={{'color':'#999'}} onClick={this.cancle}>取消</span>
					<span className='sellViews-btn' onClick={this.submit}>提交</span>
				</div>
			</div>
		);
    }
}

class SellViews extends React.Component {
    constructor(props) {
        super(props);
        this['changeSelectView'] = this['changeSelectView'].bind(this);
		this['openForm'] = this['openForm'].bind(this);
		this['closeForm'] = this['closeForm'].bind(this);
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

	openForm(event) {
		const key = event['currentTarget'].getAttribute('data-id');
		const activeScheme = this['state']['items'][key];
		this.setState({activeScheme, readySubmit: true});
	}

	closeForm(event) {
		this.setState({activeScheme: null, readySubmit: false});
	}

	renderCard(item, activityView, key) {
		return '热点定制项' === activityView ? (
			<div className='sellViews-card'>
                  <p className='sellViews-pri'>需求数 : {item['repertory'] || 0}</p>
                  <p className='sellViews-info'>颜色名 : {item['name']}</p>
                  <p className='sellViews-info'>色系 : <span className='colorDisc' style={{'background-color':item['color']}}></span></p>
				  <div className='sellViews-other'>
					<span className='pull-right sellViews-btn' data-id={key} onClick={this.openForm}>添加到销售列表</span>
				  </div>
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
        return items.map((item,key) => (
          <div className='col-md-3 sellViews-item'>
              <div className='sellViews-view'><img src={'/images/warehouse/' + item['thumbnail']} /></div>
              {this.renderCard(item, activityView, key)}
          </div>
        ));
    }

    renderViewsList() {
        const {activityView} = this['state'];
        return this['props']['views'].map(view => (<span className={view === activityView? 'compareActive':''} onClick={this.changeSelectView}>{view}</span>));
    }

	renderForm() {
		const {readySubmit} = this['state'];

	}

    render() {
	  const {activeScheme} = this['state'];
      return (
        <div className='container'>
            <div className='row compareKeys'>
                {this.renderViewsList()}
            </div>
            <div className='row compareValues'>
                {this.renderViewItems()}
            </div>
			<SellViewsForm data={activeScheme} onClose={this.closeForm}/>
        </div>
      );
    }
}

//             <div className='pull-right sellViews-addView'>+ 添加视图</div>

ReactDOM.render(
    <SellViews views={['最吸引眼球','最热销','热点定制项']}/>,
    document.getElementById('body')
);

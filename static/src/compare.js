/**!
 * tru.jwis.cn - static/javascripts/compare.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

const data = getData();

function sellGood(id) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
        xhr['timeout'] = 15 * 1000;
        xhr['ontimeout'] = event => reject(new Error('time up'));
        xhr.open('get', `/json/collection/sell/${id}`);
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
    }).then(data => console.log(data)).catch(err => console.log(err));
}

class SimpleInfo extends React.Component {
	constructor(props) {
		super(props);
		this['sellGood'] = this['sellGood'].bind(this);
		this['state'] = {};
	}

	sellGood(event) {
		let {sellSet = new Set()} = this['state'];
		const id = event['currentTarget'].getAttribute('data-id');
		if (sellSet.has(id)) {
			alert('已经通知发货了');
			return;
		}
		sellGood(id);
		this.setState((prevState,props) => {
			let set = prevState['sellSet'] || new Set();
			set.add(id);
			return {sellSet: set}
		});
	}

	render() {
		const {type,data} = this['props'];
		const {styleName, name, price, repertory, cycle, id} = data;
		return (
			<div className='simpleInfo'>
				<span className='styleType'>{type} <span className='quickGo' onClick={this.sellGood} data-id={id}></span></span>
				<p>产品名: {styleName} - {name}</p>
				<p>价格: {price}</p>
				<p>库存: {repertory}</p>
				<p>交货周期: {cycle} 天</p>
			</div>
		);
	}
}

class SchemeContrast extends React.Component {
    constructor(props) {
        super(props);
        this['closeThisPage'] = this['closeThisPage'].bind(this);
    }

    closeThisPage(event) {
      window.opener=null;
      window.open('','_self');
      window.close();
    }

    renderSchemeItems() {
      const {schemeItems} = this['props'];
      return schemeItems.map(scheme => (
        <div className='col-md-3 schemeItem'>
            <div className='schemeViews'>
                  <img className='mini-views-jacket' src={'/images/warehouse/' + scheme['choseJacket']['thumbnail']}/>
                  <img className='mini-views-pants' src={'/images/warehouse/' + scheme['chosePants']['thumbnail']}/>
            </div>
            <div className='simpleIist'>
				  <SimpleInfo type='上衣' data={scheme['choseJacket']} />
				  <SimpleInfo type='裤子' data={scheme['chosePants']} />
            </div>
        </div>
      ));
    }

    render() {
      const items = this.renderSchemeItems();
      return (
        <div className='row schemeContrast'>
            <span className='col-md-1 btn_back' onClick={this.closeThisPage}>&lt; 返回</span>
            {items}
        </div>
      );
    }
}

class CompareInfo extends React.Component {
  constructor(props) {
      super(props);
  }

  renderCompareValues() {
    const {values, keyWord} = this['props'];
    return values.map(item => '上衣' === keyWord ? (<div className='col-md-3 compareValue'>{item['choseJacket']['describe']}</div>):(<div className='col-md-3 compareValue'>{item['chosePants']['describe']}</div>));
  }

  renderCompareImage() {
    const {values, keyWord} = this['props'];
    return values.map(item => (
      <div className='col-md-3 compareImage'>
          {'上衣' === keyWord?
            (<img className='mini-views' src={'/images/warehouse/' + item['choseJacket']['thumbnail']} />):
            (<img className='mini-views' src={'/images/warehouse/' + item['chosePants']['thumbnail']} />)
          }
      </div>
    ));
  }

  render() {
    const {keyWord, type} = this['props'];
    const content = 'image' === type ? this.renderCompareImage(): this.renderCompareValues();
    return (
      <div className='row compareValues'>
          <div className='col-md-1 compareKey'>{keyWord}</div>
          {content}
      </div>
    );
  }
}

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this['changeCompareKey'] = this['changeCompareKey'].bind(this);
    this['state'] = {
      activeKey: props['keys'][0]
    };
  }

  changeCompareKey(event) {
    const activeKey = event['currentTarget'].getAttribute('data-key');
    this.setState({activeKey});
  }

  renderCompareKeys() {
    const {keys} = this['props'];
    const {activeKey} = this['state'];
    return keys.map(key => (<span className={key === activeKey ? 'compareActive': ''} onClick={this.changeCompareKey} data-key={key}>{key}</span>));
  }

  render() {
    const {values} = this['props'];
    const {activeKey} = this['state'];
    const type = '图片对比' === activeKey? 'image':'props';
    return (
      <div className='container'>
        <SchemeContrast schemeItems={values}/>
        <div className='row compareKeys'>
          {this.renderCompareKeys()}
        </div>
        <CompareInfo keyWord={'上衣'} values={values} type={type} />
        <CompareInfo keyWord={'裤子'} values={values} type={type} />
      </div>
    );
  }
}

ReactDOM.render(
 <Compare keys={['属性对比', '图片对比']} values={data}/>,
 document.getElementById('body')
);

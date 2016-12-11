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
console.log(data);

class SchemeContrast extends React.Component {
    constructor(props) {
        super(props);
        this['closeThisPage'] = this['closeThisPage'].bind(this);
    }

    closeThisPage(event) {
      history.go(-1);
    }

    renderSchemeItems() {
      const {schemeItems} = this['props'];
      return schemeItems.map(scheme => (
        <div className='col-md-3 schemeItem'>
            <div className='schemeViews'>
                  <img className='mini-views' src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg'/>
            </div>
            <div className='simpleIist'>
                  <div className='simpleInfo'>
                      <span className='styleType'>上衣 <span className='quickGo'></span></span>
                      <p>价格: $225.00</p>
                      <p>库存: 219</p>
                      <p>交货周期 3~5天</p>
                  </div>
                  <div className='simpleInfo'>
                      <span className='styleType'>上衣 <span className='quickGo'></span></span>
                      <p>价格: $225.00</p>
                      <p>库存: 219</p>
                      <p>交货周期 3~5天</p>
                  </div>
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
    const {values} = this['props'];
    return values.map(item => (<div className='col-md-3 compareValue'>FIT: REGULAR 100% POLYESTER WATER REPELLENT LAMINATED MEMBRANE OUTER DURABLE WATER REPELLENT TREATMENT INSULATION: OPTIMAL (80 G BODY, 60 G SLEEVES) LINING: 100% NYLON TAFFETA ADJUSTABLE BOTTOM HEM FLEECE POCKET LINING JACKET-PANT CONNECTORS AUDIO POCKET ELASTIC SNOWSKIRT WITH NON-SLIP BAND ADJUSTABLE SLEEVE CUFFS WITH VELCRO CLOSURE CHINGUARD WITH BRUSHED FLEECE THREADS BY COATS ONE HAND HOOD ADJUSTMENT YKK ZIPPERS CRITICALLY TAPED SEAMS</div>));
  }

  renderCompareImage() {
    const {values} = this['props'];
    return values.map(item => (
      <div className='col-md-3 compareImage'>
          <img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg' />
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
    const values = [1,3];
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
 <Compare keys={['属性对比', '图片对比']}/>,
 document.getElementById('body')
);

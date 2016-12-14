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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = getData();

function _sellGood(id) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr['timeout'] = 15 * 1000;
    xhr['ontimeout'] = function (event) {
      return reject(new Error('time up'));
    };
    xhr.open('get', '/json/collection/sell/' + id);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (4 === xhr['readyState']) {
        if (200 === xhr['status']) {
          var result = JSON.parse(xhr['responseText']);
          resolve(result['result']);
        } else reject(new Error('system error'));
      }
    };
  }).then(function (data) {
    return console.log(data);
  }).catch(function (err) {
    return console.log(err);
  });
}

var SimpleInfo = function (_React$Component) {
  _inherits(SimpleInfo, _React$Component);

  function SimpleInfo(props) {
    _classCallCheck(this, SimpleInfo);

    var _this = _possibleConstructorReturn(this, (SimpleInfo.__proto__ || Object.getPrototypeOf(SimpleInfo)).call(this, props));

    _this['sellGood'] = _this['sellGood'].bind(_this);
    _this['state'] = {};
    return _this;
  }

  _createClass(SimpleInfo, [{
    key: 'sellGood',
    value: function sellGood(event) {
      var _state$sellSet = this['state'].sellSet,
          sellSet = _state$sellSet === undefined ? new Set() : _state$sellSet;

      var id = event['currentTarget'].getAttribute('data-id');
      if (sellSet.has(id)) {
        alert('已经通知发货了');
        return;
      }
      _sellGood(id);
      this.setState(function (prevState, props) {
        var set = prevState['sellSet'] || new Set();
        set.add(id);
        return { sellSet: set };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this['props'],
          type = _props.type,
          data = _props.data;
      var styleName = data.styleName,
          name = data.name,
          price = data.price,
          repertory = data.repertory,
          cycle = data.cycle,
          id = data.id;

      return React.createElement(
        'div',
        { className: 'simpleInfo' },
        React.createElement(
          'span',
          { className: 'styleType' },
          type,
          ' ',
          React.createElement('span', { className: 'quickGo', onClick: this.sellGood, 'data-id': id })
        ),
        React.createElement(
          'p',
          null,
          '\u4EA7\u54C1\u540D: ',
          styleName,
          ' - ',
          name
        ),
        React.createElement(
          'p',
          null,
          '\u4EF7\u683C: ',
          price
        ),
        React.createElement(
          'p',
          null,
          '\u5E93\u5B58: ',
          repertory
        ),
        React.createElement(
          'p',
          null,
          '\u4EA4\u8D27\u5468\u671F: ',
          cycle,
          ' \u5929'
        )
      );
    }
  }]);

  return SimpleInfo;
}(React.Component);

var SchemeContrast = function (_React$Component2) {
  _inherits(SchemeContrast, _React$Component2);

  function SchemeContrast(props) {
    _classCallCheck(this, SchemeContrast);

    var _this2 = _possibleConstructorReturn(this, (SchemeContrast.__proto__ || Object.getPrototypeOf(SchemeContrast)).call(this, props));

    _this2['closeThisPage'] = _this2['closeThisPage'].bind(_this2);
    return _this2;
  }

  _createClass(SchemeContrast, [{
    key: 'closeThisPage',
    value: function closeThisPage(event) {
      window.opener = null;
      window.open('', '_self');
      window.close();
    }
  }, {
    key: 'renderSchemeItems',
    value: function renderSchemeItems() {
      var schemeItems = this['props'].schemeItems;

      return schemeItems.map(function (scheme) {
        return React.createElement(
          'div',
          { className: 'col-md-3 schemeItem' },
          React.createElement(
            'div',
            { className: 'schemeViews' },
            React.createElement('img', { className: 'mini-views-jacket', src: '/images/warehouse/' + scheme['choseJacket']['thumbnail'] }),
            React.createElement('img', { className: 'mini-views-pants', src: '/images/warehouse/' + scheme['chosePants']['thumbnail'] })
          ),
          React.createElement(
            'div',
            { className: 'simpleIist' },
            React.createElement(SimpleInfo, { type: '\u4E0A\u8863', data: scheme['choseJacket'] }),
            React.createElement(SimpleInfo, { type: '\u88E4\u5B50', data: scheme['chosePants'] })
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var items = this.renderSchemeItems();
      return React.createElement(
        'div',
        { className: 'row schemeContrast' },
        React.createElement(
          'span',
          { className: 'col-md-1 btn_back', onClick: this.closeThisPage },
          '< \u8FD4\u56DE'
        ),
        items
      );
    }
  }]);

  return SchemeContrast;
}(React.Component);

var CompareInfo = function (_React$Component3) {
  _inherits(CompareInfo, _React$Component3);

  function CompareInfo(props) {
    _classCallCheck(this, CompareInfo);

    return _possibleConstructorReturn(this, (CompareInfo.__proto__ || Object.getPrototypeOf(CompareInfo)).call(this, props));
  }

  _createClass(CompareInfo, [{
    key: 'renderCompareValues',
    value: function renderCompareValues() {
      var _props2 = this['props'],
          values = _props2.values,
          keyWord = _props2.keyWord;

      return values.map(function (item) {
        return '上衣' === keyWord ? React.createElement(
          'div',
          { className: 'col-md-3 compareValue' },
          item['choseJacket']['describe']
        ) : React.createElement(
          'div',
          { className: 'col-md-3 compareValue' },
          item['chosePants']['describe']
        );
      });
    }
  }, {
    key: 'renderCompareImage',
    value: function renderCompareImage() {
      var _props3 = this['props'],
          values = _props3.values,
          keyWord = _props3.keyWord;

      return values.map(function (item) {
        return React.createElement(
          'div',
          { className: 'col-md-3 compareImage' },
          '上衣' === keyWord ? React.createElement('img', { className: 'mini-views', src: '/images/warehouse/' + item['choseJacket']['thumbnail'] }) : React.createElement('img', { className: 'mini-views', src: '/images/warehouse/' + item['chosePants']['thumbnail'] })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this['props'],
          keyWord = _props4.keyWord,
          type = _props4.type;

      var content = 'image' === type ? this.renderCompareImage() : this.renderCompareValues();
      return React.createElement(
        'div',
        { className: 'row compareValues' },
        React.createElement(
          'div',
          { className: 'col-md-1 compareKey' },
          keyWord
        ),
        content
      );
    }
  }]);

  return CompareInfo;
}(React.Component);

var Compare = function (_React$Component4) {
  _inherits(Compare, _React$Component4);

  function Compare(props) {
    _classCallCheck(this, Compare);

    var _this4 = _possibleConstructorReturn(this, (Compare.__proto__ || Object.getPrototypeOf(Compare)).call(this, props));

    _this4['changeCompareKey'] = _this4['changeCompareKey'].bind(_this4);
    _this4['state'] = {
      activeKey: props['keys'][0]
    };
    return _this4;
  }

  _createClass(Compare, [{
    key: 'changeCompareKey',
    value: function changeCompareKey(event) {
      var activeKey = event['currentTarget'].getAttribute('data-key');
      this.setState({ activeKey: activeKey });
    }
  }, {
    key: 'renderCompareKeys',
    value: function renderCompareKeys() {
      var _this5 = this;

      var keys = this['props'].keys;
      var activeKey = this['state'].activeKey;

      return keys.map(function (key) {
        return React.createElement(
          'span',
          { className: key === activeKey ? 'compareActive' : '', onClick: _this5.changeCompareKey, 'data-key': key },
          key
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var values = this['props'].values;
      var activeKey = this['state'].activeKey;

      var type = '图片对比' === activeKey ? 'image' : 'props';
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(SchemeContrast, { schemeItems: values }),
        React.createElement(
          'div',
          { className: 'row compareKeys' },
          this.renderCompareKeys()
        ),
        React.createElement(CompareInfo, { keyWord: '上衣', values: values, type: type }),
        React.createElement(CompareInfo, { keyWord: '裤子', values: values, type: type })
      );
    }
  }]);

  return Compare;
}(React.Component);

ReactDOM.render(React.createElement(Compare, { keys: ['属性对比', '图片对比'], values: data }), document.getElementById('body'));
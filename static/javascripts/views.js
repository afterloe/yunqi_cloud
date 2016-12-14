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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function obmitItemValues(__path) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr['timeout'] = 15 * 1000;
    xhr['ontimeout'] = function (event) {
      return reject(new Error('time is up!'));
    };
    xhr.open('get', __path);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (4 === xhr['readyState']) {
        if (200 === xhr['status']) {
          var result = JSON.parse(xhr['responseText']);
          resolve(result['result']);
        } else reject(new Error('system error'));
      }
    };
  });
}

var loadHotAllocation = function loadHotAllocation(activityView) {
  if ('热点定制项' !== activityView) return [];
  return obmitItemValues('/json/obmit/allocation');
};

var loadHotSell = function loadHotSell(activityView) {
  if ('最热销' !== activityView) return loadHotAllocation(activityView);
  return obmitItemValues('/json/obmit/hot');
};

var loadHightClick = function loadHightClick(activityView) {
  if ('最吸引眼球' !== activityView) return loadHotSell(activityView);
  return obmitItemValues('/json/obmit/look');
};

var SellViews = function (_React$Component) {
  _inherits(SellViews, _React$Component);

  function SellViews(props) {
    _classCallCheck(this, SellViews);

    var _this = _possibleConstructorReturn(this, (SellViews.__proto__ || Object.getPrototypeOf(SellViews)).call(this, props));

    _this['changeSelectView'] = _this['changeSelectView'].bind(_this);
    _this['state'] = {
      activityView: props['views'][0]
    };
    return _this;
  }

  _createClass(SellViews, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var activityView = this['state'].activityView;
      var _ref = [this, loadHightClick(activityView)],
          __self = _ref[0],
          items = _ref[1];

      items.then(function (data) {
        __self.setState({ items: data });
      }).catch(function (err) {
        alert('系统繁忙');
      });
    }
  }, {
    key: 'changeSelectView',
    value: function changeSelectView(event) {
      var _this2 = this;

      var activityView = event['currentTarget']['innerText'];
      var items = loadHightClick(activityView);
      items.then(function (data) {
        return _this2.setState({ items: data, activityView: activityView });
      }).catch(function (err) {
        return alert('系统繁忙');
      });
    }
  }, {
    key: 'renderCard',
    value: function renderCard(item, activityView) {
      return '热点定制项' === activityView ? React.createElement(
        'div',
        { className: 'sellViews-card' },
        React.createElement(
          'p',
          { className: 'sellViews-pri' },
          '\u9700\u6C42\u6570 : ',
          item['repertory'] || 0
        ),
        React.createElement(
          'p',
          { className: 'sellViews-info' },
          '\u5546\u54C1\u540D : ',
          item['name']
        ),
        React.createElement(
          'p',
          { className: 'sellViews-info' },
          '\u8272\u7CFB : ',
          React.createElement('span', { className: 'colorDisc', style: { 'background-color': item['color'] } })
        )
      ) : React.createElement(
        'div',
        { className: 'sellViews-card' },
        React.createElement(
          'p',
          { className: 'sellViews-pri' },
          '\u4EF7\u683C : HK$ ',
          item['price'] || '-'
        ),
        React.createElement(
          'p',
          { className: 'sellViews-info' },
          '\u5546\u54C1\u540D : ',
          item['name']
        ),
        React.createElement(
          'p',
          { className: 'sellViews-info' },
          '\u8272\u7CFB : ',
          item['color']
        ),
        React.createElement(
          'div',
          { className: 'sellViews-other' },
          React.createElement(
            'span',
            { className: 'pull-left' },
            '\u5E93\u5B58: ',
            item['repertory'] || 0
          ),
          React.createElement(
            'span',
            { className: 'pull-right' },
            '\u4EA4\u8D27\u5468\u671F: ',
            item['cycle'] || '-',
            ' \u5929'
          )
        )
      );
    }
  }, {
    key: 'renderViewItems',
    value: function renderViewItems() {
      var _this3 = this;

      var _state = this['state'],
          _state$items = _state.items,
          items = _state$items === undefined ? [] : _state$items,
          activityView = _state.activityView;

      return items.map(function (item) {
        return React.createElement(
          'div',
          { className: 'col-md-3 sellViews-item' },
          React.createElement(
            'div',
            { className: 'sellViews-view' },
            React.createElement('img', { src: '/images/warehouse/' + item['thumbnail'] })
          ),
          _this3.renderCard(item, activityView)
        );
      });
    }
  }, {
    key: 'renderViewsList',
    value: function renderViewsList() {
      var _this4 = this;

      var activityView = this['state'].activityView;

      return this['props']['views'].map(function (view) {
        return React.createElement(
          'span',
          { className: view === activityView ? 'compareActive' : '', onClick: _this4.changeSelectView },
          view
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'row compareKeys' },
          this.renderViewsList()
        ),
        React.createElement(
          'div',
          { className: 'row compareValues' },
          this.renderViewItems()
        )
      );
    }
  }]);

  return SellViews;
}(React.Component);

//             <div className='pull-right sellViews-addView'>+ 添加视图</div>

ReactDOM.render(React.createElement(SellViews, { views: ['最吸引眼球', '最热销', '热点定制项'] }), document.getElementById('body'));
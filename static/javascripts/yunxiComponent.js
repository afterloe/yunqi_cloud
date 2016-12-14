/**!
 * tru.jwis.cn - static/javascripts/yunxiComponent.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChoseApp = function (_React$Component) {
	_inherits(ChoseApp, _React$Component);

	function ChoseApp(props) {
		_classCallCheck(this, ChoseApp);

		var _this = _possibleConstructorReturn(this, (ChoseApp.__proto__ || Object.getPrototypeOf(ChoseApp)).call(this, props));

		_this['chose'] = _this['chose'].bind(_this);
		return _this;
	}

	_createClass(ChoseApp, [{
		key: 'chose',
		value: function chose(event) {
			var choseStyleId = event['currentTarget'].getAttribute('data-id');
			this['props'].onChose(choseStyleId);
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			var _this2 = this;

			var items = this['props']['items'];
			return items.map(function (it, key) {
				return React.createElement(
					'div',
					{ className: 'col-md-3 jacketStyle', onClick: _this2.chose, 'data-id': key },
					React.createElement('img', { src: '/images/warehouse/' + it['representative'], className: 'img-responsive center-block jacketImage' }),
					React.createElement(
						'p',
						{ className: 'jacketInfo' },
						React.createElement(
							'span',
							{ className: 'jacketName' },
							React.createElement(
								'h3',
								null,
								it['name']
							)
						),
						React.createElement(
							'span',
							{ className: 'jacketPic' },
							it['interval']
						),
						React.createElement(
							'span',
							{ className: 'jacketColor' },
							it['colors']
						)
					)
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this['props'],
			    btn_text = _props.btn_text,
			    text_align = _props.text_align;

			var styles = this.renderStyles();
			return React.createElement(
				'div',
				{ className: 'col-md-5 choiceJeaketApp_border' },
				React.createElement(
					'div',
					{ className: 'chose_btn_' + text_align },
					btn_text
				),
				styles
			);
		}
	}]);

	return ChoseApp;
}(React.Component);

var ShowApp = function (_React$Component2) {
	_inherits(ShowApp, _React$Component2);

	function ShowApp(props) {
		_classCallCheck(this, ShowApp);

		return _possibleConstructorReturn(this, (ShowApp.__proto__ || Object.getPrototypeOf(ShowApp)).call(this, props));
	}

	_createClass(ShowApp, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'col-md-2' },
				React.createElement('img', { className: 'jacket', src: '/images/warehouse/' + this['props']['jacket'] }),
				React.createElement('img', { className: 'pants', src: '/images/warehouse/' + this['props']['pants'] }),
				React.createElement('img', { className: 'shadow', src: '/images/warehouse/bottom-shadow.png' })
			);
		}
	}]);

	return ShowApp;
}(React.Component);

ChoseApp['defaultProps'] = {
	items: [],
	btn_text: '默认标题',
	text_align: 'left'
};

ShowApp['defaultProps'] = {
	jacket: 'default-men-top.png',
	pants: 'default-men-bottom.png'
};

var choseApp = exports.choseApp = ChoseApp;
var showApp = exports.showApp = ShowApp;
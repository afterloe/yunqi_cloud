/**!
 * tru.jwis.cn - static/javascripts/home.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

function sendCollectionData(__path) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr['timeout'] = 15 * 1000;
		xhr['ontimeout'] = function (event) {
			return reject(new Error('time up'));
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
	}).then(function (data) {
		return console.log(data);
	}).catch(function (err) {
		return console.log(err);
	});
}

function sendScheme(jackeId, pantsId) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.timeout = 15 * 1000;
		xhr['ontimeout'] = function (event) {
			return reject(new Error('time up'));
		};
		xhr.open('post', '/json/collection/scheme');
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send('jackeId=' + jackeId + '&pantsId=' + pantsId);
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

function getStyleInfomation(id) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.timeout = 15 * 1000;
		xhr.ontimeout = function (event) {
			return reject(new Error('can\'t get style info from server, please try again'));
		};
		xhr.open('get', '/json/style/styleInfo/' + id);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (4 === xhr['readyState']) {
				if (200 === xhr['status']) {
					var result = JSON.parse(xhr['responseText']);
					resolve(result['result']);
				} else reject(new Error('can\'t get style info from server, please try again'));
			}
		};
	});
}

function sendAllocationScheme() {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.timeout = 15 * 1000;
		xhr.ontimeout = function (event) {
			return reject(new Error('can\'t get style info from server, please try again'));
		};
		xhr.open('get', '/json/style/styleInfo/' + id);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (4 === xhr['readyState']) {
				if (200 === xhr['status']) {
					var result = JSON.parse(xhr['responseText']);
					resolve(result['result']);
				} else reject(new Error('can\'t get style info from server, please try again'));
			}
		};
	});
}

var AllocationApp = function (_React$Component) {
	_inherits(AllocationApp, _React$Component);

	function AllocationApp(props) {
		_classCallCheck(this, AllocationApp);

		var _this = _possibleConstructorReturn(this, (AllocationApp.__proto__ || Object.getPrototypeOf(AllocationApp)).call(this, props));

		_this['openColorDisc'] = _this['openColorDisc'].bind(_this);
		_this['changColor'] = _this['changColor'].bind(_this);
		_this['changeOptions'] = _this['changeOptions'].bind(_this);
		_this['openOptionList'] = _this['openOptionList'].bind(_this);
		_this['addOption'] = _this['addOption'].bind(_this);
		_this['deleteOption'] = _this['deleteOption'].bind(_this);
		_this['state'] = {
			choseColor: props['mould'][0],
			options_flag: '<',
			configText: '编辑'
		};
		return _this;
	}

	_createClass(AllocationApp, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var options = this['props'].options;
			var __options = [],
			    ___options = [];

			options.map(function (opt, index) {
				return index < 5 ? __options.push(opt) : ___options.push(opt);
			});
			this.setState({ options: __options, props: ___options });
		}
	}, {
		key: 'changColor',
		value: function changColor(event) {
			var id = event['currentTarget'].getAttribute('data-id');
			var mould = this['props']['mould'][id];
			this.setState({ choseColor: mould, isChoseColor: false });
		}
	}, {
		key: 'openColorDisc',
		value: function openColorDisc(event) {
			this.setState(function (prevState, props) {
				return { isChoseColor: !prevState['isChoseColor'] };
			});
		}
	}, {
		key: 'openOptionList',
		value: function openOptionList(event) {
			var options_flag = this['state'].options_flag;

			this.setState(function (prevState, props) {
				return '<' === options_flag ? { options_flag: '>' } : { options_flag: '<' };
			});
		}
	}, {
		key: 'changeOptions',
		value: function changeOptions(event) {
			this.setState(function (prevState, props) {
				return '编辑' === prevState['configText'] ? { configText: '完成', isConfig: true } : { configText: '编辑', isConfig: false };
			});
		}
	}, {
		key: 'deleteOption',
		value: function deleteOption(event) {
			var index = event['currentTarget'].getAttribute('data-id');
			this.setState(function (prevState, __props) {
				var options = prevState.options,
				    props = prevState.props;

				if (options[index]) {
					props.push(options[index]);
					options.splice(index, 1);
				}
				return { options: options, props: props };
			});
		}
	}, {
		key: 'addOption',
		value: function addOption(event) {
			var index = event['currentTarget'].getAttribute('data-id');
			this.setState(function (prevState, __props) {
				var options = prevState.options,
				    props = prevState.props;

				if (props[index]) {
					options.push(props[index]);
					props.splice(index, 1);
				}
				return { options_flag: '<', options: options, props: props };
			});
		}
	}, {
		key: 'renderOptions',
		value: function renderOptions() {
			var _this2 = this;

			var _state = this['state'],
			    options = _state.options,
			    isConfig = _state.isConfig;

			return options.map(function (opt, key) {
				return React.createElement(
					'div',
					{ className: 'allocation-value' },
					isConfig ? React.createElement('span', { className: 'allocation-delete', 'data-id': key, onClick: _this2.deleteOption }) : '',
					React.createElement(
						'span',
						{ className: 'allocation-name' },
						opt,
						' ( CM ) '
					),
					React.createElement('input', { className: 'allocation-input', 'data-input-id': key })
				);
			});
		}
	}, {
		key: 'renderHiddenOptionsList',
		value: function renderHiddenOptionsList() {
			var _this3 = this;

			var _state2 = this['state'],
			    options_flag = _state2.options_flag,
			    props = _state2.props;

			if ('<' === options_flag) return;
			var options = props.map(function (opt, key) {
				return React.createElement(
					'div',
					{ className: 'allocation-add-option', 'data-id': key, onClick: _this3.addOption },
					opt
				);
			});
			return React.createElement(
				'div',
				{ className: 'allocation-add-optionList' },
				options
			);
		}
	}, {
		key: 'renderAddOptions',
		value: function renderAddOptions() {
			var _state3 = this['state'],
			    isConfig = _state3.isConfig,
			    options_flag = _state3.options_flag;

			if (!isConfig) return;
			return React.createElement(
				'div',
				{ className: 'allocation-value' },
				React.createElement('span', { className: 'allocation-add', onClick: this.openOptionList }),
				React.createElement(
					'span',
					{ className: 'allocation-name', onClick: this.openOptionList },
					'\u6DFB\u52A0\u9009\u9879 ',
					options_flag
				),
				this.renderHiddenOptionsList()
			);
		}
	}, {
		key: 'renderColorDisc',
		value: function renderColorDisc() {
			var _this4 = this;

			var isChoseColor = this['state'].isChoseColor;

			if (!isChoseColor) return;
			var mould = this['props'].mould;

			var recommendColor = mould.map(function (m, key) {
				return React.createElement('span', { style: { 'background-color': m['rgb'] }, onClick: _this4.changColor, 'data-id': key });
			});
			return React.createElement(
				'div',
				{ className: 'colorDisc-default' },
				React.createElement('div', { className: 'colorDisc-bar' }),
				React.createElement(
					'span',
					{ className: 'colorDisc-title' },
					'\u4E3B\u9898\u989C\u8272'
				),
				React.createElement('div', { className: 'colorDisc-vitta' }),
				React.createElement(
					'span',
					{ className: 'colorDisc-title' },
					'\u63A8\u8350\u989C\u8272'
				),
				React.createElement(
					'div',
					{ className: 'colorDisc-recommend' },
					recommendColor
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _state4 = this['state'],
			    choseColor = _state4.choseColor,
			    configText = _state4.configText;

			return React.createElement(
				'div',
				{ className: 'col-md-6 choiceJeaketApp_border', style: { 'margin-left': '2.5rem', background: '#ffffff' } },
				React.createElement(
					'div',
					{ className: 'allocation-config', onClick: this.changeOptions },
					configText
				),
				React.createElement(
					'div',
					{ className: 'allocation-view' },
					React.createElement('input', { type: 'color', id: 'colorDisc', onChange: this.changColor }),
					React.createElement('img', { src: '/images/warehouse/' + choseColor['mould'] })
				),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'span',
						{ className: 'allocation-key' },
						'COLOR'
					),
					this.renderColorDisc(),
					React.createElement('div', { className: 'allocation-color-chose', style: { 'background-color': choseColor['rgb'] }, onClick: this.openColorDisc }),
					React.createElement(
						'span',
						{ className: 'allocation-color-selected' },
						choseColor['name']
					)
				),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'span',
						{ className: 'allocation-key' },
						'SIZE'
					),
					React.createElement(
						'div',
						{ className: 'allocation-values' },
						this.renderOptions(),
						this.renderAddOptions()
					)
				),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'span',
						{ className: 'btn_saveChose' },
						'\u63D0\u4EA4\u5B9A\u5236\u65B9\u6848'
					)
				)
			);
		}
	}]);

	return AllocationApp;
}(React.Component);

var ChoseMouldApp = function (_React$Component2) {
	_inherits(ChoseMouldApp, _React$Component2);

	function ChoseMouldApp(props) {
		_classCallCheck(this, ChoseMouldApp);

		var _this5 = _possibleConstructorReturn(this, (ChoseMouldApp.__proto__ || Object.getPrototypeOf(ChoseMouldApp)).call(this, props));

		_this5['exitChoseMould'] = _this5['exitChoseMould'].bind(_this5);
		return _this5;
	}

	_createClass(ChoseMouldApp, [{
		key: 'exitChoseMould',
		value: function exitChoseMould() {
			this['props'].exitChoseMould();
		}
	}, {
		key: 'renderMouldHeader',
		value: function renderMouldHeader() {
			var _props = this['props'],
			    btn_text = _props.btn_text,
			    text_align = _props.text_align;

			return 'left' === text_align ? React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'span',
					{ className: 'pull-right backChoseStyle', onClick: this.exitChoseMould },
					'\u9000\u51FA\u5B9A\u5236',
					React.createElement('span', { className: 'backIcon_right' })
				)
			) : React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'span',
					{ className: 'pull-left backChoseStyle', onClick: this.exitChoseMould },
					React.createElement('span', { className: 'backIcon' }),
					'\u9000\u51FA\u5B9A\u5236'
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this['props'],
			    btn_text = _props2.btn_text,
			    text_align = _props2.text_align;

			return React.createElement(
				'div',
				{ className: 'col-md-5 choiceJeaketApp_border' },
				this.renderMouldHeader(),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'span',
						{ className: 'styleFullName' },
						'\u9009\u62E9\u6A21\u7248\u8FDB\u884C\u5B9A\u5236'
					),
					React.createElement(
						'small',
						{ className: 'styleInfo' },
						'\u5EFA\u8BAE\uFF1A\u9009\u62E9\u6A21\u7248\u4E4B\u540E\u70B9\u51FB\u53F3\u4FA7\u989C\u8272\u8FDB\u884C\u7B5B\u9009\uFF0C\u6216\u586B\u5165\u8BE6\u7EC6\u8BA2\u5236\u4FE1\u606F\u3002'
					),
					React.createElement(
						'small',
						{ className: 'styleInfo' },
						'\u6CE8\u610F\uFF1A\u751F\u6210\u9884\u89C8\u56FE\u4E0D\u662F\u6B63\u5728\u4EA7\u54C1\uFF0C\u4EC5\u4F9B\u53C2\u8003'
					)
				),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'span',
						{ className: 'styleChose' },
						'\u9009\u62E9\u6A21\u677F'
					),
					React.createElement(
						'div',
						{ className: 'col-md-3 infoItem' },
						React.createElement('img', { src: '/images/warehouse/OM198B.png', className: 'img-responsive center-block infoImage' }),
						React.createElement(
							'p',
							null,
							'CARNES'
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'btn_styleInfo' },
					' \u5382\u5BB6\u63CF\u8FF0 '
				),
				React.createElement(
					'div',
					{ className: 'styleDescribe' },
					'FIT: REGULAR 100% MECHANICAL STRETCH NYLON WATER REPELLENT LAMINATED MEMBRANE OUTER DURABLE WATER REPELLENT TREATMENT INSULATION: PRIMALOFT SILVER (40 G BODY, 40 G SLEEVES) LINING: 100% POLYESTER MESH, 100% NYLON TAFFETA MULTIPURPOSE INTERIOR POCKET LIFT-PASS SLEEVE POCKET ADJUSTABLE BOTTOM HEM FLEECE POCKET LINING JACKET-PANT CONNECTORS AUDIO POCKET WITH TOUCH-FRIENDLY TRANSPARENT WINDOW ELASTIC SNOWSKIRT WITH NON-SLIP BAND ELASTIC INNER SLEEVE CUFFS ADJUSTABLE SLEEVE CUFFS WITH VELCRO CLOSURE CHINGUARD WITH BRUSHED FLEECE THREADS BY COATS ERGONOMIC INTERIOR MESH PANEL ONE HAND HOOD ADJUSTMENT YKK ZIPPERS VENTS WITH MESH BACKING FULLY TAPED SEAMS'
				)
			);
		}
	}]);

	return ChoseMouldApp;
}(React.Component);

var ChoseApp = function (_React$Component3) {
	_inherits(ChoseApp, _React$Component3);

	function ChoseApp(props) {
		_classCallCheck(this, ChoseApp);

		var _this6 = _possibleConstructorReturn(this, (ChoseApp.__proto__ || Object.getPrototypeOf(ChoseApp)).call(this, props));

		_this6['chose'] = _this6['chose'].bind(_this6);
		_this6['exitStyleInfo'] = _this6['exitStyleInfo'].bind(_this6);
		_this6['changeDescribeState'] = _this6['changeDescribeState'].bind(_this6);
		_this6['beginCustomization'] = _this6['beginCustomization'].bind(_this6);
		return _this6;
	}

	_createClass(ChoseApp, [{
		key: 'changeDescribeState',
		value: function changeDescribeState(event) {
			this.setState(function (prevState, props) {
				return { showDescribe: !prevState['showDescribe'] };
			});
		}
	}, {
		key: 'exitStyleInfo',
		value: function exitStyleInfo(event) {
			this['props'].onExitStyleInfo();
		}
	}, {
		key: 'chose',
		value: function chose(event) {
			var choseStyleId = event['currentTarget'].getAttribute('data-id');
			this['props'].onChose(choseStyleId, this['props']['isInfo']);
		}
	}, {
		key: 'beginCustomization',
		value: function beginCustomization(event) {
			this['props'].beginCustomization();
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			var _this7 = this;

			var items = this['props']['items'];
			return items.map(function (it, key) {
				return React.createElement(
					'div',
					{ className: 'col-md-3 jacketStyle', onClick: _this7.chose, 'data-id': key },
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
		key: 'renderStyleInfoItem',
		value: function renderStyleInfoItem() {
			var _this8 = this;

			var _props3 = this['props'],
			    info = _props3.info,
			    _props3$choseItem = _props3.choseItem,
			    choseItem = _props3$choseItem === undefined ? 0 : _props3$choseItem;
			var stylesheetItems = info.stylesheetItems;

			return stylesheetItems.map(function (it, key) {
				return React.createElement(
					'div',
					{ className: key == choseItem ? 'col-md-3 infoItem chosed' : 'col-md-3 infoItem', onClick: _this8.chose, 'data-id': key },
					React.createElement('img', { src: '/images/warehouse/' + it['thumbnail'], className: 'img-responsive center-block infoImage' }),
					React.createElement(
						'p',
						null,
						it['name']
					)
				);
			});
		}
	}, {
		key: 'renderStyleInfoHeader',
		value: function renderStyleInfoHeader() {
			var _props4 = this['props'],
			    btn_text = _props4.btn_text,
			    text_align = _props4.text_align;

			return 'left' === text_align ? React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'span',
					{ className: 'pull-right backChoseStyle', onClick: this.exitStyleInfo },
					'\u8FD4\u56DE',
					btn_text,
					React.createElement('span', { className: 'backIcon_right' })
				),
				React.createElement(
					'span',
					{ className: 'pull-left btn_customization', onClick: this.beginCustomization },
					React.createElement('span', { className: 'pull-left customizationIcon_right' }),
					'\u6CA1\u6709\u559C\u6B22\u7684?'
				)
			) : React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'span',
					{ className: 'pull-left backChoseStyle', onClick: this.exitStyleInfo },
					React.createElement('span', { className: 'backIcon' }),
					'\u8FD4\u56DE',
					btn_text
				),
				React.createElement(
					'span',
					{ className: 'pull-right btn_customization', onClick: this.beginCustomization },
					React.createElement('span', { className: 'pull-right customizationIcon' }),
					'\u6CA1\u6709\u559C\u6B22\u7684?'
				)
			);
		}
	}, {
		key: 'renderStyleInfo',
		value: function renderStyleInfo() {
			var info = this['props'].info;
			var stylesheetInfo = info.stylesheetInfo,
			    type = info.type;

			var _ref = this['state'] || {},
			    showDescribe = _ref.showDescribe;

			return React.createElement(
				'div',
				{ className: 'col-md-5 choiceJeaketApp_border' },
				this.renderStyleInfoHeader(),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'span',
						{ className: 'styleFullName' },
						stylesheetInfo['name'],
						' ',
						type
					),
					React.createElement(
						'small',
						{ className: 'styleInfo' },
						'\u5EFA\u8BAE\u96F6\u552E\u4EF7: ',
						stylesheetInfo['interval']
					),
					React.createElement(
						'small',
						{ className: 'styleInfo' },
						'\u6CE8\u610F\uFF1A',
						stylesheetInfo['warning'] || "无"
					)
				),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'span',
						{ className: 'styleChose' },
						'\u9009\u62E9\u989C\u8272'
					),
					this.renderStyleInfoItem()
				),
				React.createElement(
					'div',
					{ className: 'btn_styleInfo', onClick: this.changeDescribeState },
					'\u67E5\u770B\u8BE6\u60C5'
				),
				React.createElement(
					'div',
					{ className: 'styleDescribe' },
					showDescribe ? stylesheetInfo['describe'] : ''
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props5 = this['props'],
			    btn_text = _props5.btn_text,
			    text_align = _props5.text_align,
			    isInfo = _props5.isInfo;

			if (isInfo) return this.renderStyleInfo();
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

var ShowApp = function (_React$Component4) {
	_inherits(ShowApp, _React$Component4);

	function ShowApp(props) {
		_classCallCheck(this, ShowApp);

		var _this9 = _possibleConstructorReturn(this, (ShowApp.__proto__ || Object.getPrototypeOf(ShowApp)).call(this, props));

		_this9['saveScheme'] = _this9['saveScheme'].bind(_this9);
		return _this9;
	}

	_createClass(ShowApp, [{
		key: 'saveScheme',
		value: function saveScheme(event) {
			this['props'].onSaveScheme();
		}
	}, {
		key: 'renderSaveButton',
		value: function renderSaveButton() {
			var flag = this['props']['showSave'];
			if (!flag) return;
			return React.createElement(
				'span',
				{ className: 'btn_saveChose', onClick: this.saveScheme },
				'\u4FDD\u5B58\u65B9\u6848'
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var saveButton = this.renderSaveButton();
			return React.createElement(
				'div',
				{ className: 'col-md-2' },
				React.createElement('img', { className: 'jacket', src: '/images/warehouse/' + this['props']['jacket']['thumbnail'] }),
				React.createElement('img', { className: 'pants', src: '/images/warehouse/' + this['props']['pants']['thumbnail'] }),
				React.createElement('img', { className: 'shadow', src: '/images/warehouse/bottom-shadow.png' }),
				saveButton
			);
		}
	}]);

	return ShowApp;
}(React.Component);

AllocationApp['defaultProps'] = {
	mould: [{
		name: 'wathet',
		rgb: '#01acd8',
		mould: 'OM198B.png'
	}, {
		name: 'yellow',
		rgb: '#c38e00',
		mould: '黄色.png'
	}, {
		name: 'navy blue',
		rgb: '#001ac7',
		mould: '深蓝色.png'
	}, {
		name: 'green',
		rgb: '#02cc04',
		mould: '绿色.png'
	}, {
		name: 'pink',
		rgb: '#ca019c',
		mould: '粉色.png'
	}],
	options: ['肩宽', '胸围', '腰围', '臀围', '袖长', '背长', '领围', '手头', '碗围', '头围', '袖孔', '股上', '总长']
};

ChoseApp['defaultProps'] = {
	items: [],
	btn_text: '默认标题',
	isInfo: false,
	text_align: 'left'
};

ShowApp['defaultProps'] = {
	jacket: { thumbnail: 'default-men-top.png' },
	showSave: false,
	pants: { thumbnail: 'default-men-bottom.png' }
};

var data = parseData();
console.log(data);

var ContrastBar = function (_React$Component5) {
	_inherits(ContrastBar, _React$Component5);

	function ContrastBar(props) {
		_classCallCheck(this, ContrastBar);

		var _this10 = _possibleConstructorReturn(this, (ContrastBar.__proto__ || Object.getPrototypeOf(ContrastBar)).call(this, props));

		_this10['changeActionBar'] = _this10['changeActionBar'].bind(_this10);
		_this10['choiceScheme'] = _this10['choiceScheme'].bind(_this10);
		_this10['addContrastItem'] = _this10['addContrastItem'].bind(_this10);
		_this10['confirmCompare'] = _this10['confirmCompare'].bind(_this10);
		_this10['state'] = {
			checkedItem: new Set(),
			hidden_barName: '方案对比',
			action_barName: '精品推荐'
		};
		return _this10;
	}

	_createClass(ContrastBar, [{
		key: 'choiceScheme',
		value: function choiceScheme(event) {
			this.setState(function (prevState, props) {
				var checkedItem = prevState['checkedItem'];
				checkedItem.clear();
				return {
					isEdit: !prevState['isEdit'],
					checkedItem: checkedItem
				};
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var __self = this;
			obmitItemValues('/json/obmit/recommend').then(function (data) {
				__self.setState({ recommend: data });
			}).catch(function (err) {
				return console.log(err);
			});
		}
	}, {
		key: 'changeActionBar',
		value: function changeActionBar(event) {
			this.setState(function (prevState, props) {
				var interim = prevState['hidden_barName'];
				return {
					hidden_barName: prevState['action_barName'],
					action_barName: interim
				};
			});
		}
	}, {
		key: 'addContrastItem',
		value: function addContrastItem(event) {
			var isEdit = this['state'].isEdit;

			var checkedId = Number.parseInt(event['currentTarget'].getAttribute('data-id'));
			if (!isEdit) {
				this.setState(function (prevState, props) {
					var checkedItem = prevState['checkedItem'];
					checkedItem.has(checkedId) ? checkedItem.delete(checkedId) : checkedItem.add(checkedId);
					return checkedItem;
				});
			} else {
				this['props'].onDeleteContrastItem(checkedId);
			}
		}
	}, {
		key: 'confirmCompare',
		value: function confirmCompare(event) {
			var checkedItem = this['state'].checkedItem;

			this['props'].onBeginCompare([].concat(_toConsumableArray(checkedItem)));
		}
	}, {
		key: 'renderBtn',
		value: function renderBtn() {
			var _state5 = this['state'],
			    action_barName = _state5.action_barName,
			    isEdit = _state5.isEdit;

			return '精品推荐' === action_barName ? React.createElement('span', { className: 'pull-right closeContrastBar', onClick: this.changeActionBar }) : React.createElement(
				'span',
				{ className: 'pull-right choiceScheme', onClick: this.choiceScheme },
				isEdit ? '取消' : '编辑'
			);
		}
	}, {
		key: 'renderRecommendScheme',
		value: function renderRecommendScheme(activityName) {
			if ('精品推荐' !== activityName) return;
			var _state$recommend = this['state'].recommend,
			    recommend = _state$recommend === undefined ? [] : _state$recommend;

			var items = recommend.map(function (item, key) {
				return React.createElement(
					'span',
					{ className: 'contrast', 'data-id': key },
					React.createElement('img', { className: 'miniView-jacket', src: '/images/warehouse/' + item['jackeThumbnail'] }),
					React.createElement('img', { className: 'miniView-pants', src: '/images/warehouse/' + item['pantsThumbnail'] })
				);
			});
			return React.createElement(
				'div',
				null,
				items
			);
		}
	}, {
		key: 'renderCustomScheme',
		value: function renderCustomScheme(activityName) {
			var _this11 = this;

			if ('方案对比' !== activityName) return this.renderRecommendScheme(activityName);
			var _ref2 = [this['props'], this['state'], React.createElement('span', { className: 'checkItem' })],
			    _ref2$0$schemeItem = _ref2[0].schemeItem,
			    schemeItem = _ref2$0$schemeItem === undefined ? [] : _ref2$0$schemeItem,
			    _ref2$ = _ref2[1],
			    checkedItem = _ref2$.checkedItem,
			    isEdit = _ref2$.isEdit,
			    checked = _ref2[2];

			var deleteItem = isEdit ? React.createElement('span', { className: 'deleteItem' }) : '';
			var items = schemeItem.map(function (item, key) {
				return React.createElement(
					'span',
					{ className: 'contrast', onClick: _this11.addContrastItem, 'data-id': key },
					checkedItem.has(key) ? checked : '',
					deleteItem,
					React.createElement('img', { className: 'miniView-jacket', src: '/images/warehouse/' + item['choseJacket']['thumbnail'] }),
					React.createElement('img', { className: 'miniView-pants', src: '/images/warehouse/' + item['chosePants']['thumbnail'] })
				);
			});
			return React.createElement(
				'div',
				null,
				items
			);
		}
	}, {
		key: 'renderScheme',
		value: function renderScheme() {
			var action_barName = this['state'].action_barName;

			return this.renderCustomScheme(action_barName);
		}
	}, {
		key: 'renderBottomBtn',
		value: function renderBottomBtn() {
			var _state6 = this['state'],
			    checkedItem = _state6.checkedItem,
			    action_barName = _state6.action_barName;

			if ('方案对比' !== action_barName) return;
			return checkedItem && checkedItem.size > 1 ? React.createElement(
				'div',
				{ className: 'contrast_plan_row' },
				React.createElement('span', { className: 'contrast_btn_confirm', onClick: this.confirmCompare })
			) : React.createElement(
				'div',
				{ className: 'contrast_plan_row' },
				React.createElement('span', { className: 'contrast_btn_prohibit' })
			);
		}
	}, {
		key: 'renderSelectedContrastBar',
		value: function renderSelectedContrastBar() {
			var _state7 = this['state'],
			    hidden_barName = _state7.hidden_barName,
			    action_barName = _state7.action_barName;

			return React.createElement(
				'div',
				{ className: 'row contrast_position' },
				React.createElement(
					'div',
					{ className: 'hidden_bar', onClick: this.changeActionBar },
					hidden_barName
				),
				React.createElement(
					'div',
					{ className: 'contrast_bar' },
					React.createElement(
						'div',
						{ className: 'container contrast_title' },
						action_barName,
						' ',
						this.renderBtn()
					),
					this.renderScheme(),
					this.renderBottomBtn()
				)
			);
		}
	}, {
		key: 'renderDefaultBar',
		value: function renderDefaultBar() {
			return React.createElement(
				'div',
				{ className: 'row contrast_position' },
				React.createElement(
					'div',
					{ className: 'contrast_bar' },
					React.createElement(
						'div',
						{ className: 'contrast_title' },
						'\u70ED\u70B9\u63A8\u8350'
					),
					React.createElement(
						'div',
						null,
						this.renderRecommendScheme('精品推荐')
					),
					React.createElement(
						'div',
						{ className: 'contrast_plan_row' },
						React.createElement('span', { className: 'contrast_btn_prohibit' })
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var schemeItem = this['props']['schemeItem'];
			if (schemeItem && schemeItem.length > 0) return this.renderSelectedContrastBar();
			return this.renderDefaultBar();
		}
	}]);

	return ContrastBar;
}(React.Component);

var SeletedApp = function (_React$Component6) {
	_inherits(SeletedApp, _React$Component6);

	function SeletedApp(props) {
		_classCallCheck(this, SeletedApp);

		var _this12 = _possibleConstructorReturn(this, (SeletedApp.__proto__ || Object.getPrototypeOf(SeletedApp)).call(this, props));

		_this12['choseJacket'] = _this12['choseJacket'].bind(_this12);
		_this12['exitJacketInfo'] = _this12['exitJacketInfo'].bind(_this12);
		_this12['chosePants'] = _this12['chosePants'].bind(_this12);
		_this12['exitPantsInfo'] = _this12['exitPantsInfo'].bind(_this12);
		_this12['saveScheme'] = _this12['saveScheme'].bind(_this12);
		_this12['deleteContrastItem'] = _this12['deleteContrastItem'].bind(_this12);
		_this12['beginCompare'] = _this12['beginCompare'].bind(_this12);
		_this12['beginCustomization'] = _this12['beginCustomization'].bind(_this12);
		_this12['state'] = {
			jacketItems: _this12['props']['jacketItems'],
			pantsItems: _this12['props']['pantsItems']
		};
		return _this12;
	}

	_createClass(SeletedApp, [{
		key: 'choseJacket',
		value: function choseJacket(id, isInfo) {
			var _this13 = this;

			if (!isInfo) {
				var choseJacke = this['state']['jacketItems'][id];
				getStyleInfomation(choseJacke['id']).then(function (data) {
					_this13.setState({
						choseJacket: data['stylesheetItems'][0],
						jacketInfo: {
							stylesheetInfo: data['stylesheetInfo'],
							type: '上衣',
							stylesheetItems: data['stylesheetItems']
						},
						goToJacketInfo: true
					});
				}).catch(function (error) {
					return console.log(error);
				});
			} else {
				var _choseJacke = this['state']['jacketInfo']['stylesheetItems'][id];
				sendCollectionData('/json/collection/look/' + _choseJacke['id']);
				this.setState({
					choseJacket: _choseJacke,
					choseJacketItem: id
				});
			}
		}
	}, {
		key: 'exitJacketInfo',
		value: function exitJacketInfo() {
			this.setState({ goToJacketInfo: false });
		}
	}, {
		key: 'chosePants',
		value: function chosePants(id, isInfo) {
			var _this14 = this;

			if (!isInfo) {
				var chosePants = this['state']['pantsItems'][id];
				getStyleInfomation(chosePants['id']).then(function (data) {
					_this14.setState({
						chosePants: data['stylesheetItems'][0],
						pantsInfo: {
							stylesheetInfo: data['stylesheetInfo'],
							type: '裤子',
							stylesheetItems: data['stylesheetItems']
						},
						goToPantsInfo: true
					});
				}).catch(function (error) {
					return console.log(error);
				});
			} else {
				var _chosePants = this['state']['pantsInfo']['stylesheetItems'][id];
				sendCollectionData('/json/collection/look/' + _chosePants['id']);
				this.setState({
					chosePants: _chosePants,
					chosePantsItem: id
				});
			}
		}
	}, {
		key: 'exitPantsInfo',
		value: function exitPantsInfo() {
			this.setState({ goToPantsInfo: false });
		}
	}, {
		key: 'addScheme',
		value: function addScheme(obj) {
			var choseJacket = obj.choseJacket,
			    chosePants = obj.chosePants;

			var flag = this.find(function (item) {
				return item['choseJacket']['id'] === choseJacket['id'] && item['chosePants']['id'] === chosePants['id'];
			});
			if (flag || this.length > 5) return;
			this.push(obj);
			sendScheme(choseJacket['id'], chosePants['id']);
		}
	}, {
		key: 'generatorScheme',
		value: function generatorScheme(choseItem, styleInfo) {
			return Object.assign({
				styleName: styleInfo['stylesheetInfo']['name'],
				describe: styleInfo['stylesheetInfo']['describe'],
				styleId: styleInfo['stylesheetInfo']['id']
			}, choseItem);
		}
	}, {
		key: 'saveScheme',
		value: function saveScheme() {
			var _ref3 = [this['state'], this],
			    _ref3$ = _ref3[0],
			    choseJacket = _ref3$.choseJacket,
			    chosePants = _ref3$.chosePants,
			    jacketInfo = _ref3$.jacketInfo,
			    pantsInfo = _ref3$.pantsInfo,
			    __self = _ref3[1];
			var _ref4 = [__self.generatorScheme(choseJacket, jacketInfo), __self.generatorScheme(chosePants, pantsInfo)],
			    jacket = _ref4[0],
			    pant = _ref4[1];

			this.setState(function (prevState, props) {
				var schemeItem = prevState['schemeItem'] || [];
				__self.addScheme.call(schemeItem, { choseJacket: jacket, chosePants: pant });
				return { schemeItem: schemeItem };
			});
		}
	}, {
		key: 'deleteContrastItem',
		value: function deleteContrastItem(checkedId) {
			this.setState(function (prevState, props) {
				var schemeItem = prevState['schemeItem'] || [];
				if (schemeItem[checkedId]) schemeItem.splice(checkedId, 1);
				return { schemeItem: schemeItem };
			});
		}
	}, {
		key: 'beginCompare',
		value: function beginCompare(index) {
			var schemeItem = this['state'].schemeItem;

			var selectItems = index.map(function (i) {
				return schemeItem[i];
			});
			localStorage['compare'] = JSON.stringify(selectItems);
			window.open('/compare');
		}
	}, {
		key: 'beginCustomization',
		value: function beginCustomization() {
			this.setState(function (prevState, props) {
				return { isCustomization: !prevState['isCustomization'] };
			});
		}
	}, {
		key: 'renderConvention',
		value: function renderConvention() {
			var _ref5 = this['state'] || {},
			    choseJacket = _ref5.choseJacket,
			    chosePants = _ref5.chosePants,
			    jacketItems = _ref5.jacketItems,
			    pantsItems = _ref5.pantsItems,
			    goToJacketInfo = _ref5.goToJacketInfo,
			    goToPantsInfo = _ref5.goToPantsInfo,
			    jacketInfo = _ref5.jacketInfo,
			    pantsInfo = _ref5.pantsInfo,
			    choseJacketItem = _ref5.choseJacketItem,
			    chosePantsItem = _ref5.chosePantsItem,
			    schemeItem = _ref5.schemeItem;

			var flag = goToJacketInfo && goToPantsInfo;
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(ChoseApp, { items: jacketItems, info: jacketInfo, choseItem: choseJacketItem, btn_text: '\u9009\u62E9\u4E0A\u8863', text_align: 'right', onChose: this.choseJacket, isInfo: goToJacketInfo, onExitStyleInfo: this.exitJacketInfo, beginCustomization: this.beginCustomization }),
						React.createElement(ShowApp, { jacket: choseJacket, pants: chosePants, showSave: flag, onSaveScheme: this.saveScheme }),
						React.createElement(ChoseApp, { items: pantsItems, info: pantsInfo, choseItem: chosePantsItem, btn_text: '\u9009\u62E9\u88E4\u5B50', text_align: 'left', onChose: this.chosePants, isInfo: goToPantsInfo, onExitStyleInfo: this.exitPantsInfo, beginCustomization: this.beginCustomization })
					)
				),
				React.createElement(ContrastBar, { schemeItem: schemeItem, onBeginCompare: this.beginCompare, onDeleteContrastItem: this.deleteContrastItem })
			);
		}
	}, {
		key: 'renderCustomization',
		value: function renderCustomization() {
			var _ref6 = this['state'] || {},
			    jacketItems = _ref6.jacketItems,
			    jacketInfo = _ref6.jacketInfo,
			    choseJacketItem = _ref6.choseJacketItem,
			    goToJacketInfo = _ref6.goToJacketInfo,
			    schemeItem = _ref6.schemeItem;

			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(ChoseMouldApp, { btn_text: '\u9000\u51FA\u5B9A\u5236', text_align: 'right', exitChoseMould: this.beginCustomization }),
					React.createElement(AllocationApp, null)
				),
				React.createElement(ContrastBar, { schemeItem: schemeItem, onBeginCompare: this.beginCompare, onDeleteContrastItem: this.deleteContrastItem })
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var isCustomization = this['state'].isCustomization;

			return isCustomization ? this.renderCustomization() : this.renderConvention();
		}
	}]);

	return SeletedApp;
}(React.Component);

ReactDOM.render(React.createElement(SeletedApp, { jacketItems: data['jacketStyles'], pantsItems: data['pantsStyles'] }), document.getElementById('body'));
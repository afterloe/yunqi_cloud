/**!
 * tru.jwis.cn - /static/javascript/footer.js
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

var Footer = function (_React$Component) {
	_inherits(Footer, _React$Component);

	function Footer(props) {
		_classCallCheck(this, Footer);

		return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
	}

	_createClass(Footer, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "footer" },
				React.createElement(
					"ul",
					{ className: "left ul_first" },
					React.createElement(
						"li",
						null,
						"\u670D\u52A1\u70ED\u7EBF\uFF1A400-888-888"
					),
					React.createElement(
						"li",
						null,
						"\u4EA4\u6D41\u7FA4\uFF1A8576848"
					),
					React.createElement(
						"li",
						null,
						"\u516C\u4F17\u53F7\uFF1ASmartlnnoEngMf"
					)
				),
				React.createElement(
					"ul",
					{ className: "left ul_two" },
					React.createElement(
						"li",
						null,
						"\u652F\u6301"
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"a",
							{ href: "/" },
							"\u54A8\u8BE2\u53CD\u9988"
						)
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"a",
							{ href: "/application" },
							"\u83B7\u53D6TRU\u8F6F\u4EF6\u96C6"
						)
					)
				),
				React.createElement(
					"ul",
					{ className: "left ul_two" },
					React.createElement(
						"li",
						null,
						"\u66F4\u591A"
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"a",
							{ href: "http://tru.jwis.cn", target: "_Blank" },
							"TRU\u5B98\u7F51"
						)
					),
					React.createElement(
						"li",
						null,
						React.createElement(
							"a",
							{ href: "http://120.76.79.181:7001", target: "_Blank" },
							"\u5F00\u53D1\u8005\u793E\u533A"
						)
					)
				),
				React.createElement(
					"div",
					{ className: "right" },
					React.createElement(
						"figure",
						null,
						React.createElement(
							"figcaption",
							null,
							"\u4E0B\u8F7D\u79FB\u52A8\u7248"
						),
						React.createElement("img", { src: "/images/1477960940.png", alt: "", className: "orCode" })
					)
				),
				React.createElement(
					"div",
					{ className: "right1" },
					React.createElement(
						"figure",
						null,
						React.createElement(
							"figcaption",
							null,
							"\u5FAE\u4FE1\u516C\u4F17\u53F7"
						),
						React.createElement("img", { src: "/images/1472722615.png", alt: "" })
					)
				)
			);
		}
	}]);

	return Footer;
}(React.Component);

ReactDOM.render(React.createElement(Footer, null), document.getElementById('footer'));
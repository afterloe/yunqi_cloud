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

class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="footer">
			    <ul className="left ul_first">
					<li>服务热线：400-888-888</li>
					<li>交流群：8576848</li>
					<li>公众号：SmartlnnoEngMf</li>
				</ul>
				<ul className="left ul_two">
				    <li>支持</li>
					<li><a href="/">咨询反馈</a></li>
				    <li><a href="/application">获取TRU软件集</a></li>
				</ul>
				<ul className="left ul_two">
				    <li>更多</li>
				    <li><a href="http://tru.jwis.cn" target="_Blank">TRU官网</a></li>
					<li><a href="http://120.76.79.181:7001" target="_Blank">开发者社区</a></li>
				</ul>
				<div className="right">
				    <figure>
			           <figcaption>下载移动版</figcaption>
			           <img src="/images/1477960940.png" alt="" className="orCode"/>
			        </figure>
				</div>
				<div className="right1">
				    <figure>
				       <figcaption>微信公众号</figcaption>
				       <img src="/images/1472722615.png" alt="" />
					</figure>
				</div>
			</div>	
	    );
	}
}

ReactDOM.render(
  <Footer />,
  document.getElementById('footer')
)

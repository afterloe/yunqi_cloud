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

const data = localStorage['data']? JSON.parse(localStorage['data']): {};
console.log(data);

class ChoiceJeaketApp extends React.Component {

	constructor(props) {
		super(props);
	}

	renderStyles() {
		const items = this['props']['items'];
		return items.map((it,index) => (
			<div className='col-md-3 jacketStyle'>
				<img src={'/images/warehouse/' + it['thumbnails']} className='img-responsive center-block jacketImage'/>
				<p className='jacketInfo'>
					<span className='jacketName'><h3>{it['name']}</h3></span>
					<span className='jacketPic'><small>{it['pic']}</small></span>
					<span className='jacketColor'>{it['colors']}</span>
				</p>
			</div>
		));
	}

	render() {
		const styles = this.renderStyles();
		return (
			<div className='col-md-5 choiceJeaketApp_border'>
				<div className='chose_btn_right'>选择上衣款式</div>
				{styles}
			</div>
		);
	}

}

class ChoicePantsApp extends React.Component {
	
	constructor(props) {
		super(props);
	}

	renderStyles() {
		const items = this['props']['items'];
		return items.map((it, index) => (
			<div className='col-md-2 jacketStyle'>
				<img src={'/images/warehouse/' + it['thumbnails']} className='img-responsive center-block jacketImage'/>
				<p className='jacketInfo'>
					<span className='jacketName'><h3>{it['name']}</h3></span>
					<span className='jacketPic'><small>{it['pic']}</small></span>
					<span className='jacketColor'>{it['colors']}</span>
				</p>
			</div>			
		));
	}

	render() {
		const styles = this.renderStyles();
		return (
			<div className='col-md-5 choiceJeaketApp_border'>
				<div className='chose_btn_left'>选择裤子款式</div>
				{styles}
			</div>
		);
	}

}

class ShowApp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='col-md-2'>
				<img className='jacket' src={'/images/warehouse/' + this['props']['jacket']} />
				<img className='pants' src={'/images/warehouse/' + this['props']['pants']} />
				<img className='shadow' src='/images/warehouse/bottom-shadow.png' />
			</div>
		);
	}
}

ShowApp['defaultProps'] = {
	jacket: 'default-men-top.png',
	pants: 'default-men-bottom.png'
}

class SeletedApp extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row">
				<ChoiceJeaketApp items={data['jacketStyles']}/>
				<ShowApp />
				<ChoicePantsApp items={data['pantsStyles']}/>
			</div>
		);
	}
}

ReactDOM.render(
 <SeletedApp />,
 document.getElementById('body')
);

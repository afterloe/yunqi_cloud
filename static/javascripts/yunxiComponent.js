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

class ChoseApp extends React.Component {
	constructor(props) {
		super(props);
		this['chose'] = this['chose'].bind(this);
	}

	chose(event) {
		const choseStyleId  = event['currentTarget'].getAttribute('data-id');
		this['props'].onChose(choseStyleId);
	}

	renderStyles() {
		const items = this['props']['items'];
		return items.map((it, key) => (
			<div className='col-md-3 jacketStyle' onClick={this.chose} data-id={key}>
				<img src={'/images/warehouse/' + it['representative']} className='img-responsive center-block jacketImage'/>
				<p className='jacketInfo'>
					<span className='jacketName'><h3>{it['name']}</h3></span>
					<span className='jacketPic'>{it['interval']}</span>
					<span className='jacketColor'>{it['colors']}</span>
				</p>
			</div>
		));
	}

	render() {
		const {btn_text, text_align} = this['props'];
		const styles = this.renderStyles();
		return (
			<div className='col-md-5 choiceJeaketApp_border'>
				<div className={'chose_btn_' + text_align }>{btn_text}</div>
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

ChoseApp['defaultProps'] = {
	items: [],
	btn_text: '默认标题',
	text_align: 'left'
}

ShowApp['defaultProps'] = {
	jacket: 'default-men-top.png',
	pants: 'default-men-bottom.png'
}

export const choseApp =  ChoseApp;
export const showApp = ShowApp;

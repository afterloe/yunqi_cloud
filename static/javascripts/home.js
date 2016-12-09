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

// import {choseApp, showApp} from '/javascripts/yunxiComponent.js'

class ChoseApp_Info extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>i'm afterloe</div>);
	}
}

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
		const {btn_text, text_align, isInfo} = this['props'];
		console.log(isInfo);
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

const data = parseData();
console.log(data);

class ContrastBar extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='contrast_bar'>
					<div className='contrast_title'>方案对比</div>
					<div className='contrast_plan'>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div><span className='contrast_btn' >对比</span></div>
			</div>
		);
	}
}

class SeletedApp extends React.Component {

	constructor(props) {
		super(props);
		this['state'] = {
			jacketItems: this['props']['jacketItems'],
			pantsItems: this['props']['pantsItems']
		};
		this['choseJacket'] = this['choseJacket'].bind(this);
		this['chosePants'] = this['chosePants'].bind(this);
	}

	choseJacket(id) {
		const choseJacke = this['state']['jacketItems'][id];
		this.setState({
			choseJacket: choseJacke['representative'],
			goToJacketInfo: true
		});
	}

	chosePants(id, isInfo) {
		const chosePants = this['state']['pantsItems'][id];
		this.setState({
			chosePants: chosePants['representative'],
			goToPantsInfo: true
		});
	}

	render() {
		const {choseJacket, chosePants ,jacketItems, pantsItems, goToJacketInfo, goToPantsInfo} = this['state'] || {};
		return (
			<div className="row">
				<ChoseApp items={jacketItems} btn_text="选择上衣" text_align="right" onChose={this.choseJacket} isInfo={goToJacketInfo}/>
				<ShowApp jacket={choseJacket} pants={chosePants}/>
				<ChoseApp items={pantsItems} btn_text="选择裤子" text_align="left" onChose={this.chosePants} isInfo={goToPantsInfo}/>
				<ContrastBar />
			</div>
		);
	}
}

ReactDOM.render(
 <SeletedApp jacketItems={data['jacketStyles']} pantsItems={data['pantsStyles']} />,
 document.getElementById('body')
);

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

class ChoseApp extends React.Component {
	constructor(props) {
		super(props);
		this['chose'] = this['chose'].bind(this);
	}

	chose(event) {
		const choseStyleId  = event['currentTarget'].getAttribute('data-id');
		this['props'].onChose(choseStyleId, this['props']['isInfo']);
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

	renderStyleInfo() {
		const {btn_text, text_align, isInfo} = this['props'];
		return (
			<div className='col-md-5 choiceJeaketApp_border'>
				<div className='row'>
						<span className='pull-left backChoseStyle'><span className='backIcon'></span>返回选择上衣 </span>
						<span className='pull-right btn_customization'>没有喜欢的?<span className='pull-right customizationIcon'></span></span>
				</div>
				<div className='row'>
						<span className='styleFullName'>CARNES 上衣</span>
						<small className='styleInfo'>建议零售价: 10k~15K</small>
						<small className='styleInfo'>注意：最大体重不得超过80kg</small>
				</div>
				<div className='row'>
						<span className='styleChose'>选择颜色</span>
						<div className='col-md-3 infoItem'>
								<img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg' className='img-responsive center-block infoImage' />
								<p>NAVY</p>
						</div>
						<div className='col-md-3 infoItem'>
								<img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg' className='img-responsive center-block infoImage'  />
								<p>NAVY</p>
						</div>
						<div className='col-md-3 infoItem'>
								<img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg' className='img-responsive center-block infoImage'  />
								<p>NAVY</p>
						</div>
						<div className='col-md-3 infoItem'>
								<img src='/images/img-9a76980c0bc640b9bcb25f50fecef09b.jpg' className='img-responsive center-block infoImage' />
								<p>NAVY</p>
						</div>
				</div>
				<div className='btn_styleInfo'>
						查看详情
				</div>
			</div>
		);
	}

	render() {
		const {btn_text, text_align, isInfo} = this['props'];
		if (isInfo) return this.renderStyleInfo();
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

	renderSaveButton() {
		const flag = this['props']['showSave'];
		console.log(flag);
		if (!flag) return;
		return (
			<span className='btn_saveChose'>保存方案</span>
		);
	}

	render() {
		const saveButton = this.renderSaveButton();
		return (
			<div className='col-md-2'>
				<img className='jacket' src={'/images/warehouse/' + this['props']['jacket']} />
				<img className='pants' src={'/images/warehouse/' + this['props']['pants']} />
				<img className='shadow' src='/images/warehouse/bottom-shadow.png' />
				{saveButton}
			</div>
		);
	}
}

ChoseApp['defaultProps'] = {
	items: [],
	btn_text: '默认标题',
	isInfo: true,
	text_align: 'left'
}

ShowApp['defaultProps'] = {
	jacket: 'default-men-top.png',
	showSave: true,
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

	choseJacket(id,isInfo) {
		const choseJacke = this['state']['jacketItems'][id];
		if(!isInfo) isInfo = true;
		this.setState({
			choseJacket: choseJacke['representative'],
			goToJacketInfo: isInfo
		});
	}

	chosePants(id, isInfo) {
		const chosePants = this['state']['pantsItems'][id];
		if(!isInfo) isInfo = true;
		this.setState({
			chosePants: chosePants['representative'],
			goToPantsInfo: isInfo
		});
	}

	render() {
		const {choseJacket, chosePants ,jacketItems, pantsItems, goToJacketInfo, goToPantsInfo} = this['state'] || {};
		return (
			<div className="row">
				<ChoseApp items={jacketItems} btn_text="选择上衣" text_align="right" onChose={this.choseJacket} isInfo={goToJacketInfo}/>
				<ShowApp jacket={choseJacket} pants={chosePants} showSave={goToJacketInfo && goToPantsInfo}/>
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

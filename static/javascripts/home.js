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

function getStyleInfomation(id) {
	return new Promise((resolve,reject) => {
		let xhr = new XMLHttpRequest();
		xhr.timeout = 15 * 1000;
		xhr.ontimeout = event => reject(new Error('can\'t get style info from server, please try again'));
		xhr.open('get', `/json/style/styleInfo/${id}`);
		xhr.send();
		xhr.onreadystatechange = () => {
        if (4 === xhr['readyState']) {
            if (200 === xhr['status']) {
                const result = JSON.parse(xhr['responseText']);
								resolve(result['result']);
            } else
							reject(new Error('can\'t get style info from server, please try again'));
        }
    };
	});
}

class ChoseApp extends React.Component {
	constructor(props) {
		super(props);
		this['chose'] = this['chose'].bind(this);
		this['exitStyleInfo'] = this['exitStyleInfo'].bind(this);
	}

	exitStyleInfo(event) {
		this['props'].onExitStyleInfo();
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

	renderStyleInfoHeader() {
		const {btn_text, text_align} = this['props'];
		return 'left' === text_align ? (
			<div className='row'>
					<span className='pull-right backChoseStyle' onClick={this.exitStyleInfo}>返回{btn_text}<span className='backIcon_right'></span></span>
					<span className='pull-left btn_customization'><span className='pull-left customizationIcon_right'></span>没有喜欢的?</span>
			</div>
		): (
			<div className='row'>
					<span className='pull-left backChoseStyle' onClick={this.exitStyleInfo}><span className='backIcon'></span>返回{btn_text}</span>
					<span className='pull-right btn_customization'><span className='pull-right customizationIcon'></span>没有喜欢的?</span>
			</div>
		);
	}

	renderStyleInfoItem() {
		const {stylesheetItems} = this['props']['info'];
		return stylesheetItems.map((it,key) => (
			<div className='col-md-3 infoItem' onClick={this.chose} data-id={key}>
					<img src={'/images/warehouse/' + it['thumbnail']} className='img-responsive center-block infoImage' />
					<p>{it['name']}</p>
			</div>
		));
	}

	renderStyleInfo() {
		const {btn_text, text_align, info} = this['props'];
		const {stylesheetInfo, type} = info;
		return (
			<div className='col-md-5 choiceJeaketApp_border'>
				{this.renderStyleInfoHeader()}
				<div className='row'>
						<span className='styleFullName'>{stylesheetInfo['name']} {type}</span>
						<small className='styleInfo'>建议零售价: {stylesheetInfo['interval']}</small>
						<small className='styleInfo'>注意：{stylesheetInfo['warning']}</small>
				</div>
				<div className='row'>
						<span className='styleChose'>选择颜色</span>
						{this.renderStyleInfoItem()}
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
	isInfo: false,
	text_align: 'left'
}

ShowApp['defaultProps'] = {
	jacket: 'default-men-top.png',
	showSave: false,
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
		this['exitJacketInfo'] = this['exitJacketInfo'].bind(this);
		this['chosePants'] = this['chosePants'].bind(this);
		this['exitPantsInfo'] = this['exitPantsInfo'].bind(this);
	}

	choseJacket(id,isInfo) {
		const choseJacke = this['state']['jacketItems'][id];
		console.log(choseJacke);
		getStyleInfomation(choseJacke['id']).then(data => {
			if(!isInfo) isInfo = true;
			this.setState({
				choseJacket: choseJacke['representative'],
				jacketInfo: {
					stylesheetInfo:data['stylesheetInfo'],
					type: '上衣',
					stylesheetItems:data['stylesheetItems']
				},
				goToJacketInfo: isInfo
			});
		}).catch(error => console.log(error));
	}

	exitJacketInfo() {
		this.setState({goToJacketInfo: false});
	}

	chosePants(id, isInfo) {
		const chosePants = this['state']['pantsItems'][id];
		getStyleInfomation(chosePants['id']).then(data => {
			if(!isInfo) isInfo = true;
			this.setState({
				chosePants: chosePants['representative'],
				pantsInfo: {
					stylesheetInfo:data['stylesheetInfo'],
					type: '裤子',
					stylesheetItems:data['stylesheetItems'],
				},
				goToPantsInfo: isInfo
			});
		}).catch(error => console.log(error));
	}

	exitPantsInfo() {
		this.setState({goToPantsInfo: false});
	}

	render() {
		const {choseJacket, chosePants ,jacketItems, pantsItems, goToJacketInfo, goToPantsInfo, jacketInfo, pantsInfo} = this['state'] || {};
		return (
			<div className="row">
				<ChoseApp items={jacketItems} info={jacketInfo} btn_text="选择上衣" text_align="right" onChose={this.choseJacket} isInfo={goToJacketInfo} onExitStyleInfo={this.exitJacketInfo}/>
				<ShowApp jacket={choseJacket} pants={chosePants} showSave={goToJacketInfo && goToPantsInfo}/>
				<ChoseApp items={pantsItems} info={pantsInfo} btn_text="选择裤子" text_align="left" onChose={this.chosePants} isInfo={goToPantsInfo} onExitStyleInfo={this.exitPantsInfo}/>
				<ContrastBar />
			</div>
		);
	}
}

ReactDOM.render(
 <SeletedApp jacketItems={data['jacketStyles']} pantsItems={data['pantsStyles']} />,
 document.getElementById('body')
);

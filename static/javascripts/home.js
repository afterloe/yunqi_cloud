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

class AllocationApp extends React.Component {

	constructor(props) {
		super(props);
		this['openColorDisc'] = this['openColorDisc'].bind(this);
		this['changColor'] = this['changColor'].bind(this);
		this['changeOptions'] = this['changeOptions'].bind(this);
		this['openOptionList'] = this['openOptionList'].bind(this);
		this['addOption'] = this['addOption'].bind(this);
		this['deleteOption'] = this['deleteOption'].bind(this);
		this['state'] = {
			choseColor: 'purple',
			options_flag: '<',
			configText: '编辑'
		}
	}

	componentWillMount() {
		const {options} = this['props'];
		const [__options, ___options] = [[], []];
		options.map((opt, index) => index < 5 ? __options.push(opt): ___options.push(opt));
		this.setState({options: __options, props: ___options});
	}

	changColor(event) {
		const value = event['currentTarget']['value'];
		setTimeout(() => {
			this.setState({choseColor: value});
		}, 300);
	}

	openColorDisc(event) {
		const element = document.getElementById('colorDisc');
		element.click();
	}

	openOptionList(event) {
		const {options_flag} = this['state'];
		this.setState((prevState,props) => '<' === options_flag? ({options_flag: '>'}):({options_flag: '<'}));
	}

	changeOptions(event) {
		this.setState((prevState, props) => '编辑' === prevState['configText']? ({configText:'完成',isConfig:true}):({configText:'编辑',isConfig:false}));
	}

	deleteOption(event) {
		const index = event['currentTarget'].getAttribute('data-id');
		this.setState((prevState, __props) => {
			const {options, props} = prevState;
			if(options[index]) {
				props.push(options[index]);
				options.splice(index,1);
			}
			return {options, props};
		});
	}

	addOption(event) {
		const index = event['currentTarget'].getAttribute('data-id');
		this.setState((prevState, __props) => {
			const {options, props} = prevState;
			if(props[index]) {
				options.push(props[index]);
				props.splice(index, 1);
			}
			return {options_flag:'<', options, props};
		});
	}

	renderOptions() {
		const {options,isConfig} = this['state'];
		return options.map((opt, key) => (
			<div className='allocation-value'>
				{ isConfig? (<span className='allocation-delete' data-id={key} onClick={this.deleteOption}></span>) : ''}
				<span className='allocation-name'>{opt} ( CM ) </span>
				<input className='allocation-input' data-input-id={key} />
			</div>
		));
	}

	renderHiddenOptionsList() {
		const {options_flag, props} = this['state'];
		if ('<' === options_flag) return ;
		const options = props.map((opt,key) => (<div className='allocation-add-option' data-id={key} onClick={this.addOption}>{opt}</div>));
		return (
			<div className='allocation-add-optionList'>
				{options}
			</div>
		);
	}

	renderAddOptions() {
		const {isConfig, options_flag} = this['state'];
		if (!isConfig) return;
		return (
			<div className='allocation-value'>
				<span className='allocation-add' onClick={this.openOptionList}></span>
				<span className='allocation-name' onClick={this.openOptionList}>添加选项 {options_flag}</span>
				{this.renderHiddenOptionsList()}
			</div>
		);
	}

	render() {
		const {choseColor, configText} = this['state'];
		return (
			<div className='col-md-6 choiceJeaketApp_border' style={{'margin-left': '2.5rem', background: '#ffffff'}}>
				<div className='allocation-config' onClick={this.changeOptions}>{configText}</div>
				<div className='allocation-view' style={{'background-color': choseColor}} >
					<input type="color" id='colorDisc' onChange={this.changColor}/>
					<img src='/images/warehouse/default-men-mould.png'/>
				</div>
				<div className='row'>
					<span className='allocation-key'>COLOR</span>
					<div className='allocation-color-chose' style={{'background-color': choseColor}} onClick={this.openColorDisc}></div>
					<span className='allocation-color-selected'>{choseColor}</span>
				</div>
				<div className='row'>
					<span className='allocation-key'>SIZE</span>
					<div className='allocation-values'>
						{this.renderOptions()}
						{this.renderAddOptions()}
					</div>
				</div>
				<div className='row'>
					<span className='btn_saveChose'>提交定制方案</span>
				</div>
			</div>
		);
	}
}

class ChoseMouldApp extends React.Component {
	constructor(props) {
		super(props);
		this['exitChoseMould'] = this['exitChoseMould'].bind(this);
	}

	exitChoseMould() {
		this['props'].exitChoseMould();
	}

	renderMouldHeader() {
		const {btn_text, text_align} = this['props'];
		return 'left' === text_align ? (
			<div className='row'>
				<span className='pull-right backChoseStyle' onClick={this.exitChoseMould}>退出定制<span className='backIcon_right'></span></span>
			</div>
		):(
			<div className='row'>
				<span className='pull-left backChoseStyle' onClick={this.exitChoseMould}><span className='backIcon'></span>退出定制</span>
			</div>
		);
	}

	render(){
		const {btn_text, text_align} = this['props'];
		return (
			<div className='col-md-5 choiceJeaketApp_border'>
				{this.renderMouldHeader()}
				<div className='row'>
					<span className='styleFullName'>选择模版进行定制</span>
					<small className='styleInfo'>建议：选择模版之后点击右侧颜色进行筛选，或填入详细订制信息。</small>
					<small className='styleInfo'>注意：生成预览图不是正在产品，仅供参考</small>
				</div>
				<div className='row'>
					<span className='styleChose'>选择模板</span>
					<div className='col-md-3 infoItem'>
						<img src='/images/warehouse/OM198B.png' className='img-responsive center-block infoImage' />
						<p>CARNES</p>
					</div>
				</div>
				<div className='btn_styleInfo'> 厂家描述 </div>
				<div className='styleDescribe'>
					FIT: REGULAR
					100% MECHANICAL STRETCH NYLON
					WATER REPELLENT LAMINATED MEMBRANE
					OUTER DURABLE WATER REPELLENT TREATMENT
					INSULATION: PRIMALOFT SILVER (40 G BODY, 40 G SLEEVES)
					LINING: 100% POLYESTER MESH, 100% NYLON TAFFETA
					MULTIPURPOSE INTERIOR POCKET
					LIFT-PASS SLEEVE POCKET
					ADJUSTABLE BOTTOM HEM
					FLEECE POCKET LINING
					JACKET-PANT CONNECTORS
					AUDIO POCKET WITH TOUCH-FRIENDLY TRANSPARENT WINDOW
					ELASTIC SNOWSKIRT WITH NON-SLIP BAND
					ELASTIC INNER SLEEVE CUFFS
					ADJUSTABLE SLEEVE CUFFS WITH VELCRO CLOSURE
					CHINGUARD WITH BRUSHED FLEECE
					THREADS BY COATS
					ERGONOMIC INTERIOR MESH PANEL
					ONE HAND HOOD ADJUSTMENT
					YKK ZIPPERS
					VENTS WITH MESH BACKING
					FULLY TAPED SEAMS
				</div>
			</div>
		);
	}
}

class ChoseApp extends React.Component {
	constructor(props) {
		super(props);
		this['chose'] = this['chose'].bind(this);
		this['exitStyleInfo'] = this['exitStyleInfo'].bind(this);
		this['changeDescribeState'] = this['changeDescribeState'].bind(this);
		this['beginCustomization'] = this['beginCustomization'].bind(this);
	}

	changeDescribeState(event) {
		this.setState((prevState, props) => ({showDescribe: !prevState['showDescribe']}));
	}

	exitStyleInfo(event) {
		this['props'].onExitStyleInfo();
	}

	chose(event) {
		const choseStyleId  = event['currentTarget'].getAttribute('data-id');
		this['props'].onChose(choseStyleId, this['props']['isInfo']);
	}

	beginCustomization(event) {
		this['props'].beginCustomization();
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

	renderStyleInfoItem() {
		const {info, choseItem = 0} = this['props'];
		const {stylesheetItems} = info;
		return stylesheetItems.map((it,key) => (
			<div className={key == choseItem? 'col-md-3 infoItem chosed' : 'col-md-3 infoItem' } onClick={this.chose} data-id={key}>
					<img src={'/images/warehouse/' + it['thumbnail']} className='img-responsive center-block infoImage' />
					<p>{it['name']}</p>
			</div>
		));
	}

	renderStyleInfoHeader() {
		const {btn_text, text_align} = this['props'];
		return 'left' === text_align ? (
			<div className='row'>
					<span className='pull-right backChoseStyle' onClick={this.exitStyleInfo}>返回{btn_text}<span className='backIcon_right'></span></span>
					<span className='pull-left btn_customization' onClick={this.beginCustomization}><span className='pull-left customizationIcon_right'></span>没有喜欢的?</span>
			</div>
		): (
			<div className='row'>
					<span className='pull-left backChoseStyle' onClick={this.exitStyleInfo}><span className='backIcon'></span>返回{btn_text}</span>
					<span className='pull-right btn_customization' onClick={this.beginCustomization}><span className='pull-right customizationIcon'></span>没有喜欢的?</span>
			</div>
		);
	}

	renderStyleInfo() {
		const {info} = this['props'];
		const {stylesheetInfo, type} = info;
		const {showDescribe} = this['state'] || {};
		return (
			<div className='col-md-5 choiceJeaketApp_border'>
				{this.renderStyleInfoHeader()}
				<div className='row'>
						<span className='styleFullName'>{stylesheetInfo['name']} {type}</span>
						<small className='styleInfo'>建议零售价: {stylesheetInfo['interval']}</small>
						<small className='styleInfo'>注意：{stylesheetInfo['warning'] || "无"}</small>
				</div>
				<div className='row'>
						<span className='styleChose'>选择颜色</span>
						{this.renderStyleInfoItem()}
				</div>
				<div className='btn_styleInfo' onClick={this.changeDescribeState}>
						查看详情
				</div>
				<div className='styleDescribe'>{showDescribe? stylesheetInfo['describe']:''}</div>
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
		this['saveScheme'] = this['saveScheme'].bind(this);
	}

	saveScheme(event) {
		this['props'].onSaveScheme();
	}

	renderSaveButton() {
		const flag = this['props']['showSave'];
		if (!flag) return;
		return (
			<span className='btn_saveChose' onClick={this.saveScheme}>保存方案</span>
		);
	}

	render() {
		const saveButton = this.renderSaveButton();
		return (
			<div className='col-md-2'>
				<img className='jacket' src={'/images/warehouse/' + this['props']['jacket']['thumbnail']} />
				<img className='pants' src={'/images/warehouse/' + this['props']['pants']['thumbnail']} />
				<img className='shadow' src='/images/warehouse/bottom-shadow.png' />
				{saveButton}
			</div>
		);
	}
}

AllocationApp['defaultProps'] = {
	options : ['肩宽','胸围','腰围','臀围','袖长','背长','领围','手头','碗围','头围','袖孔','股上','总长']
}

ChoseApp['defaultProps'] = {
	items: [],
	btn_text: '默认标题',
	isInfo: false,
	text_align: 'left'
}

ShowApp['defaultProps'] = {
	jacket: {thumbnail : 'default-men-top.png'},
	showSave: false,
	pants: {thumbnail: 'default-men-bottom.png'}
}

const data = parseData();
console.log(data);

class ContrastBar extends React.Component {

	constructor(props) {
		super(props);
		this['changeActionBar'] = this['changeActionBar'].bind(this);
		this['choiceScheme'] = this['choiceScheme'].bind(this);
		this['addContrastItem'] = this['addContrastItem'].bind(this);
		this['confirmCompare'] = this['confirmCompare'].bind(this);
		this['state'] = {
			checkedItem: new Set(),
			hidden_barName : '方案对比',
			action_barName : '精品推荐'
		}
	}

	choiceScheme(event) {
		this.setState((prevState, props) => {
			const checkedItem = prevState['checkedItem'];
			checkedItem.clear();
			return {
				isEdit:!prevState['isEdit'],
				checkedItem
			};
		});
	}

	changeActionBar(event) {
		this.setState((prevState, props) => {
			let interim = prevState['hidden_barName'];
			return {
				hidden_barName: prevState['action_barName'],
				action_barName: interim
			};
		});
	}

	addContrastItem(event) {
		const {isEdit} = this['state'];
		const checkedId  = Number.parseInt(event['currentTarget'].getAttribute('data-id'));
		if (!isEdit) {
			this.setState((prevState, props) => {
					const checkedItem = prevState['checkedItem'];
					checkedItem.has(checkedId) ? checkedItem.delete(checkedId): checkedItem.add(checkedId);
					return checkedItem;
			});
		} else {
			this['props'].onDeleteContrastItem(checkedId);
		}
	}

	confirmCompare(event) {
			const {checkedItem} = this['state'];
			this['props'].onBeginCompare([...checkedItem]);
	}

	renderBtn() {
		const {action_barName, isEdit} = this['state'];
		return '精品推荐' === action_barName? (<span className='pull-right closeContrastBar' onClick={this.changeActionBar}></span>):
			(<span className='pull-right choiceScheme' onClick={this.choiceScheme}>{isEdit? '取消':'编辑'}</span>);
	}

	renderRecommendScheme(activityName) {
			if ('精品推荐' !== activityName) return ;
			return (
				<div>
					<span className='contrast_none'></span>
					<span className='contrast_none'></span>
					<span className='contrast_none'></span>
				</div>
			);
	}

	renderCustomScheme(activityName) {
			if ('方案对比' !== activityName) return this.renderRecommendScheme(activityName);
			const [{schemeItem = []}, {checkedItem, isEdit}, checked] = [this['props'], this['state'], (<span className='checkItem'></span>)];
			const deleteItem = isEdit? (<span className='deleteItem'></span>): '';
			const items = schemeItem.map((item, key) => (
				<span className='contrast' onClick={this.addContrastItem} data-id={key}>
					{checkedItem.has(key)? checked:''}
					{deleteItem}
					<img className='miniView-jacket' src={'/images/warehouse/' + item['choseJacket']['thumbnail']} />
					<img className='miniView-pants' src={'/images/warehouse/' + item['chosePants']['thumbnail']} />
				</span>
			));
			return (
				<div>
					{items}
				</div>
			);
	}

	renderScheme() {
			const {action_barName} = this['state'];
			return this.renderCustomScheme(action_barName);
	}

	renderBottomBtn() {
		const {checkedItem, action_barName} = this['state'];
		if ('方案对比' !== action_barName) return ;
		return checkedItem && checkedItem.size > 1 ? (
			<div className='contrast_plan_row'>
				<span className='contrast_btn_confirm' onClick={this.confirmCompare}></span>
			</div>
		):(
			<div className='contrast_plan_row'>
				<span className='contrast_btn_prohibit'></span>
			</div>
		);
	}

	renderSelectedContrastBar() {
		const {hidden_barName, action_barName} = this['state'];
		return (
			<div className='row contrast_position'>
				<div className='hidden_bar' onClick={this.changeActionBar} >{hidden_barName}</div>
				<div className='contrast_bar'>
						<div className='container contrast_title'>{action_barName} {this.renderBtn()}</div>
						{this.renderScheme()}
						{this.renderBottomBtn()}
				</div>
			</div>
		);
	}

	renderDefaultBar() {
		return (
			<div className='row contrast_position'>
				<div className='contrast_bar'>
						<div className='contrast_title'>{this['state']['hidden_barName']}</div>
						<div>
							<span className='contrast_none'></span>
							<span className='contrast_none'></span>
							<span className='contrast_none'></span>
							<span className='contrast_none'></span>
							<span className='contrast_none'></span>
						</div>
						<div className='contrast_plan_row'>
							<span className='contrast_btn_prohibit'></span>
						</div>
				</div>
			</div>
		);
	}

	render() {
		const schemeItem = this['props']['schemeItem'];
		if(schemeItem && schemeItem.length > 0) return this.renderSelectedContrastBar();
		return this.renderDefaultBar();
	}
}

class SeletedApp extends React.Component {

	constructor(props) {
		super(props);
		this['choseJacket'] = this['choseJacket'].bind(this);
		this['exitJacketInfo'] = this['exitJacketInfo'].bind(this);
		this['chosePants'] = this['chosePants'].bind(this);
		this['exitPantsInfo'] = this['exitPantsInfo'].bind(this);
		this['saveScheme'] = this['saveScheme'].bind(this);
		this['deleteContrastItem'] = this['deleteContrastItem'].bind(this);
		this['beginCompare'] = this['beginCompare'].bind(this);
		this['beginCustomization'] = this['beginCustomization'].bind(this);
		this['state'] = {
			jacketItems: this['props']['jacketItems'],
			pantsItems: this['props']['pantsItems'],
//			isCustomization: true
		};
	}

	choseJacket(id,isInfo) {
		if (!isInfo) {
			const choseJacke = this['state']['jacketItems'][id];
			getStyleInfomation(choseJacke['id']).then(data => {
				this.setState({
					choseJacket: data['stylesheetItems'][0],
					jacketInfo: {
						stylesheetInfo:data['stylesheetInfo'],
						type: '上衣',
						stylesheetItems: data['stylesheetItems']
					},
					goToJacketInfo: true
				});
			}).catch(error => console.log(error));
		} else {
			const choseJacke = this['state']['jacketInfo']['stylesheetItems'][id];
			this.setState({
				choseJacket: choseJacke,
				choseJacketItem: id
			});
		}
	}

	exitJacketInfo() {
		this.setState({goToJacketInfo: false});
	}

	chosePants(id, isInfo) {
		if (!isInfo) {
			const chosePants = this['state']['pantsItems'][id];
			getStyleInfomation(chosePants['id']).then(data => {
				this.setState({
					chosePants: data['stylesheetItems'][0],
					pantsInfo: {
						stylesheetInfo:data['stylesheetInfo'],
						type: '裤子',
						stylesheetItems:data['stylesheetItems'],
					},
					goToPantsInfo: true
				});
			}).catch(error => console.log(error));
		} else {
			const chosePants = this['state']['pantsInfo']['stylesheetItems'][id];
			this.setState({
				chosePants: chosePants,
				chosePantsItem: id
			});
		}
	}

	exitPantsInfo() {
		this.setState({goToPantsInfo: false});
	}

	addScheme(obj) {
		const {choseJacket, chosePants} = obj;
		const flag = this.find(item => item['choseJacket']['id'] === choseJacket['id'] && item['chosePants']['id'] === chosePants['id']);
		console.log(flag);
		if(flag || this.length> 5) return;
		this.push(obj);
	}

	generatorScheme(choseItem, styleInfo) {
		return Object.assign({
			styleName: styleInfo['stylesheetInfo']['name'],
			describe: styleInfo['stylesheetInfo']['describe'],
			styleId: styleInfo['stylesheetInfo']['id']
		}, choseItem);
	}

	saveScheme() {
		const [{choseJacket, chosePants, jacketInfo, pantsInfo}, __self] = [this['state'], this];
		const [jacket,pant] = [__self.generatorScheme(choseJacket, jacketInfo), __self.generatorScheme(chosePants, pantsInfo)];
		this.setState((prevState, props) => {
			let schemeItem = prevState['schemeItem'] || [];
			__self.addScheme.call(schemeItem, {choseJacket: jacket, chosePants: pant});
			return {schemeItem};
		});
	}

	deleteContrastItem(checkedId) {
		this.setState((prevState, props) => {
			let schemeItem = prevState['schemeItem'] || [];
			if(schemeItem[checkedId]) schemeItem.splice(checkedId,1);
			return {schemeItem};
		});
	}

	beginCompare(index) {
		const {schemeItem} = this['state'];
		const selectItems = index.map(i => schemeItem[i]);
		localStorage['compare'] = JSON.stringify(selectItems);
		window.open('/compare');
	}

	beginCustomization() {
		this.setState((prevState, props) => ({isCustomization: !prevState['isCustomization']}));
	}

	renderConvention() {
		const {choseJacket, chosePants ,jacketItems, pantsItems, goToJacketInfo, goToPantsInfo, jacketInfo, pantsInfo, choseJacketItem, chosePantsItem, schemeItem} = this['state'] || {};
		const flag = goToJacketInfo && goToPantsInfo;
		return (
			<div>
				<div className='container'>
					<div className='row'>
						<ChoseApp items={jacketItems} info={jacketInfo} choseItem={choseJacketItem} btn_text="选择上衣"  text_align="right" onChose={this.choseJacket} isInfo={goToJacketInfo} onExitStyleInfo={this.exitJacketInfo} beginCustomization={this.beginCustomization} />

						<ShowApp jacket={choseJacket} pants={chosePants} showSave={flag} onSaveScheme={this.saveScheme}/>
						<ChoseApp items={pantsItems} info={pantsInfo} choseItem={chosePantsItem} btn_text="选择裤子" text_align="left" onChose={this.chosePants} isInfo={goToPantsInfo} onExitStyleInfo={this.exitPantsInfo} beginCustomization={this.beginCustomization} />
					</div>
				</div>
				<ContrastBar schemeItem={schemeItem} onBeginCompare={this.beginCompare} onDeleteContrastItem={this.deleteContrastItem} />
			</div>
		);
	}

	renderCustomization() {
		const {jacketItems, jacketInfo, choseJacketItem, goToJacketInfo, schemeItem} = this['state'] || {};
		return (
			<div>
				<div className='container'>
					<ChoseMouldApp btn_text='退出定制' text_align='right' exitChoseMould={this.beginCustomization}/>
					<AllocationApp />
				</div>
				<ContrastBar schemeItem={schemeItem} onBeginCompare={this.beginCompare} onDeleteContrastItem={this.deleteContrastItem} />
			</div>
		);
	}

	render() {
		const {isCustomization} = this['state'];
		return isCustomization ? this.renderCustomization() : this.renderConvention();
	}
}

ReactDOM.render(
 <SeletedApp jacketItems={data['jacketStyles']} pantsItems={data['pantsStyles']} />,
 document.getElementById('body')
);

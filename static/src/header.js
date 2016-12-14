/**!
 * tru.jwis.cn - /static/javascript/header.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div className='navbar navbar-default nav'>
			<span className='nav_logo'></span>
			<span className='nav_title'></span>
		</div>);
	}
}

ReactDOM.render(
	<Header />,
	document.getElementById('header')
);

import React from 'react';

class SiteNav extends React.Component {

	constructor(props) {
		super(props);

		this.HOME_URL = 'index';
	}

	isActive(filename) {
		var activeLocation = location.pathname.split('/').pop(-1).split('.')[0];

		if (activeLocation == filename) {
			return true;
		} else if (filename == this.HOME_URL && activeLocation == '') {
			return true;
		}

		return false;
	}

	render() {

		let self = this;

		let items = this.props.items;

		let modal = (

			<nav className="site-nav">
				<ul className="site-nav-list">
					{
						items.map( item => {

							let classNames = ['nav-item'];
							self.isActive(item.section) ? classNames.push('active') : false;
							classNames = classNames.join(' ');

							return (
								<li key={item.id}
									className={classNames}>
									<a href={item.url}>
										{item.title}
									</a>
								</li>
							);

						})
					}
				</ul>
			</nav>

		);

		return modal;

	}

}

export default SiteNav;

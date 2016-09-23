import React from 'react';

class SiteHeader extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let site = {
			name: this.props.name,
			desc: this.props.desc
		};

		let modal = (

			<header className="site-header">
				<h1 className="site-logo">
					{site.name}
				</h1>
				<p className="site-slogan">{site.desc}</p>
			</header>

		);

		return modal;

	}

}

export default SiteHeader;

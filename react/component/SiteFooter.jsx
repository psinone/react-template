import React from 'react';

class SiteFooter extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let site = {
			name: this.props.name
		};

		let modal = (

			<footer className="site-footer">
				<p className="footer-copyright">
					&copy; {site.name}
				</p>
			</footer>

		);

		return modal;

	}

}

export default SiteFooter;

import React from 'react';

class DataListItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let item = this.props.item;

		let modal = (
			<li className="list-item">
				<h1 className="title">
					{item.title}
				</h1>
				<p className="body">
					{item.body}
				</p>
			</li>
		);

		return modal;
	}

}

export default DataListItem;

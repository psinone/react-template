import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Import components
import DataListItem from './DataListItem.jsx';

class DataList extends React.Component {

	constructor() {
		super();

		// Default states
		this.state = {
			items: [],
			isLoading: false
		};

		this.itemId = 0;

		// Event binding
		this.handleLoadMoreClicked = this.handleLoadMoreClicked.bind(this);
	}

	// React method, after first render
	componentDidMount() {
		this.reloadItems();
	}

	reloadItems() {
		this.requestData( items => {
			this.setState({ items: items })
		})
	}

	appendItems() {
		this.requestData( newItems => {
			let items = this.state.items;

			newItems.map( item => items.push(item));

			this.setState({
				items: items
			})
		})
	}

	// Click event
	handleLoadMoreClicked(event) {
		this.appendItems();
	}

	// AJAX request
	requestData(callback) {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });

		fetch(this.props.API_PATH)
			.then( response => response.json() )
			.then( json => {
				json.map( item => item.itemId = ++this.itemId );
				setTimeout( () => {
					this.setState({ isLoading: false });
					callback(json);
				}, 1000);
			})
			.catch( error => { console.log('Parsing failed', error) });
	}

	render() {

		let items = this.state.items;

		let classNames = {
			loadMore: 'load-more'
		};

		if (this.state.isLoading) classNames.loadMore += ' is-loading';

		let modal = (

			<div className="component-container">
				<ReactCSSTransitionGroup
					component="ul"
					transitionName="list-item"
					transitionEnter={true}
					transitionLeave={true}
					transitionEnterTimeout={0}
					transitionLeaveTimeout={0}
					className="data-list news-list">
					{ items.map( item =>
						<DataListItem key={item.itemId} item={item} />
					)}
				</ReactCSSTransitionGroup>

				<a className={classNames.loadMore}
					onClick={this.handleLoadMoreClicked}>
					Load more
				</a>
			</div>

		);

		return modal;

	}

}

export default DataList;

import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import SiteHeader from './component/SiteHeader.jsx';
import SiteFooter from './component/SiteFooter.jsx';
import SiteNav from './component/SiteNav.jsx';
import DataList from './component/DataList.jsx';

// --------------------
// Components render init
// --------------------

// Header
(function(){
	let elem = document.querySelector('.component-site-header');
	if (!elem) return;
	ReactDOM.render(
		<SiteHeader
			name="Product Store"
			desc="I am a store." />
	, elem);
})();

// Footer
(function(){
	let elem = document.querySelector('.component-site-footer');
	if (!elem) return;
	ReactDOM.render(
		<SiteFooter
		name="Product Store" />
		, elem);
})();

// Nav
(function(){
	const items = [
		{
			"id": 1,
			"title": "Home",
			"section": "index",
			"url": "index.html"
		},
		{
			"id": 2,
			"title": "News",
			"section": "news",
			"url": "news.html"
		}
	];

	let elem = document.querySelector('.component-site-nav');
	if (!elem) return;
	ReactDOM.render(
		<SiteNav items={items}/>
		, elem);
})();

// Item list
(function(){
	let elem =document.querySelector('.component-data-list');
	if (!elem) return;
	ReactDOM.render(
		<DataList API_PATH={API_PATH} />
	, elem);
})();

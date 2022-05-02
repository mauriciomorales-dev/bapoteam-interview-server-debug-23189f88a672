const config = require('../config/config');
const request = require('./request.service');
const generalService = require("./general.service");
const moment = require('moment');

let headers = {
	"X-Auth-Client": config.bc_client_id,
	"X-Auth-Token" : config.bc_token,
	"Accept": "application/json",
	"Content-Type": "application/json"
}

async function init(store) {
	let data;
	let store_cache = await request.get(`http://ribon588.mybigcommerce.com/content/interview/store_cache.json`, {}, {});
	store_cache = JSON.parse(store_cache);

	[data] = store_cache.filter(s => {
		return s.store == store && s.id == 'ribon_v1_stores';
	});

	config.bc_client_id = data.client_id;
	config.bc_client_secret = data.client_secret;
	config.bc_token = data.token;
	config.store = data.store;
	config.dav_path = data.dav_path;
	config.dav_username = data.dav_username;
	config.dav_password = data.dav_password;
	setHeaders();
}

function setHeaders() {
	headers = {
		"X-Auth-Client": config.bc_client_id,
		"X-Auth-Token" : config.bc_token,
		"Accept": "application/json",
		"Content-Type": "application/json"
	}
}

async function get(uri) {
	return await request.get(`https://api.bigcommerce.com/stores/${config.store}${uri}`, {}, headers, true);
}

async function post(uri, query) {
	return await request.post(`https://api.bigcommerce.com/stores/${config.store}${uri}`, query, headers, true);
}

async function put(uri, query) {
	return await request.put(`https://api.bigcommerce.com/stores/${config.store}${uri}`, query, headers, true);
}

async function del(uri, query) {
	return await request.delete(`https://api.bigcommerce.com/stores/${config.store}${uri}`, query, headers, true);
}

module.exports = {
	init,
	get,
	post,
	put,
	del
}
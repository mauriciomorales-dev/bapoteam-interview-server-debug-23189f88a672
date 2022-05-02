const http = require('https');
const request = require('request-promise');

function get(url, query, headers, json) {
	let options = {
		rejectUnauthorized: false, 
		url: url,
		method: 'GET',
		headers: headers,
		qs: query,
		json: json
	}
	return request(options);
}

function post(url, query, headers, json) {
	let options = {
		rejectUnauthorized: false, 
		url: url,
		method: 'POST',
		headers: headers,
		body: query,
		json: json
	}
	return request(options);
}

function put(url, query, headers, json) {
	let options = {
		rejectUnauthorized: false, 
		url: url,
		method: 'PUT',
		headers: headers,
		body: query,
		json: json
	}
	return request(options);
}

function deleteReq(url, query, headers, json) {
	let options = {
		rejectUnauthorized: false, 
		url: url,
		method: 'DELETE',
		headers: headers,
		qs: query,
		json: json
	}
	return request(options);
}
module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = deleteReq;
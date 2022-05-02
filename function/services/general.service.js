const fs = require('fs');

function writeTMPFile(name, raw) {
	return new Promise((resolve, reject) => {
		raw = raw.replace(/^data:image\/png;base64,/, "");
		fs.writeFile(`/var/www/${name}`, raw, 'base64', (err) => {
			resolve({
				path: `/var/www/${name}`,
				error: err
			})
		});
	});
}

function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', function(err, data) {
			if (err) throw err;
			resolve(data);
		});
	});
}

function processError(res, e) {
	console.log('fallback error', e);
	res.status(400);
	res.send({
		error: true,
		message: 'Error!'
	})
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function allPromises(promises) {
	return new Promise((resolve, reject) => {
		Promise.all(promises).then(result => {
			resolve(result);
		}, error => {
			reject(error);
		});
	})
}

function indexArray(array, col) {
	let index = {};
	for(let i in array) {
		let row = array[i];
		if (col.constructor === Array) {
			let idx = [];
			for(let c in col) {
				idx.push(row[col[c]]);
			}
			idx = idx.join('-');
			index[idx] = row;
		} else {
			index[row[col]] = row;
		}
	}

	return index;
}

function addZeros(num) {
	let s = "000000000" + num;
    return s.substr(s.length - 5);
}

function randomString(length) {
    if (!length)
        length = 16;

    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charlength = characters.length - 1;
    let randomString = '';

    for(let i = 0; i < length; i++) {
        randomString += characters[getRandomInt(0, charlength)];
    }

    return randomString;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * @param min - min number
 * @param max - max number
 *
 * @return number - random number between ranges
 *
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * @param min - min number
 * @param max - max number
 *
 * @return number - random int between ranges
 *
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	processError: processError,
	timeout: timeout,
	allPromises: allPromises,
	indexArray: indexArray,
	addZeros: addZeros,
	randomString,
	getRandomArbitrary,
	getRandomInt,
	writeTMPFile,
	readFile
}
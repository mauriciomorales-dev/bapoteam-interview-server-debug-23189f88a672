const request = require('../services/request.service');
const generalService = require('../services/general.service');
const bcService = require('../services/bc.service');

/**
 * Create a Category Tree
 * 
 * Let's get a list of products from the api and modify the output to matcha different format
 *
 * @param      {<type>}   req     The request
 * @param      {<type>}   res     The resource
 * @return     {Promise}  return a tree structure back
 */
async function testFunction(req, res) {
	try {
		// first let's get the product data
		await bcService.init(req.params.store);
		let categories = await bcService.get(`/v3/catalog/categories`);
		
		let tree = [];
		// write some code here to make a tree structure
		
		res.send({
			sucess: true,
			categories
		})
	}

	catch(e) {
		generalService.processError(res, e);
	}
}

module.exports = {
	testFunction
}
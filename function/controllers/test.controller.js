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

		const categoriesData = categories.data;
		const idMapping = categoriesData.reduce((acc, el, i) => {
			acc[el.id] = i;
			return acc;
		  }, {});
		  
		  categoriesData.forEach(function (el) {
			console.log(el.name);
			// Handle the tree root element
			if (el.parent_id === 0) {
			  tree.push(el);
			  return;
			}
			// Use our mapping to locate the parent element in our data array
			const parentEl = categoriesData[idMapping[el.parent_id]];
			// Add our current el to its parent's `children` array
			parentEl.children = [...(parentEl.children || []), el];
		  });

		res.send({
			sucess: true,
			tree
		})
		
	}

	catch(e) {
		generalService.processError(res, e);
	}

}

module.exports = {
	testFunction
}
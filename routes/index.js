var express = require('express');
var router = express.Router();
var api = require('../lib/api');
var dataUtils = require('../utils/dataUtils');
var constant = require('../const/constant');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*
* Task 1:
* Make models alphabetically sortable (ascending, descending, default)
*/
router.get('/models', function(req, res, next) {
	// use api to get models and render output
	var promise = api.fetchModels();
	var orderBy = req.query.orderBy; //QueryString param to get order/sort value.
	promise.then(function (models) {
		if (constant.ASCENDING === orderBy) {
			models = dataUtils.orderArrayBy(models, constant.ASCENDING);
		}
		else if (constant.DESCENDING === orderBy) {
			models = dataUtils.orderArrayBy(models, constant.DESCENDING);
		}
		res.render('models', {models: models});
	});
});

/*
* Task 2:
* Make services filterable by type (repair, maintenance, cosmetic)
*/
router.get('/services', function(req, res, next) {
	// use api to get services and render output
	var promise = api.fetchServices();
	var filterBy = req.query.filterBy; //QueryString param to get filter value.
	promise.then (function(services){
		res.render('services', {services: dataUtils.filterArrayBy(services, filterBy), filterBy: filterBy});
	});
});

/*
* Task 3:
* Bugfix: Something prevents reviews from being rendered
* Make reviews searchable (content and source)
*/
router.get('/reviews', function(req, res, next) {
	var searchBy = req.query.searchBy; //QueryString param to get search value.
	return Promise.all([api.fetchCustomerReviews(), api.fetchCorporateReviews()])
		.then(function(reviews) {
			res.render('reviews', {reviews: dataUtils.searchArrayBy(reviews, searchBy), searchBy: searchBy || ""});
	});
});

module.exports = router;

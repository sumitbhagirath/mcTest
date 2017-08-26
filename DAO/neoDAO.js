var DaoManager = require('./DaoManager');
var models = require('../Models');

var getNeo = function (conditions, projection, options, callback) {
    DaoManager.getData(models.neos, conditions, projection, options, callback);
};

var neoInsertMany = function (data, callback) {
    DaoManager.insertMany(models.neos, data, callback);
};

var neoAggregate = function (group, callback) {
    DaoManager.aggregateData(models.neos, group, callback);
};

module.exports = {
    getNeo: getNeo,
    neoInsertMany: neoInsertMany,
    neoAggregate:neoAggregate
};
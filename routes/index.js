var express = require('express');
var app = express.Router();
var models = require('../Models');
var DAO = require('../DAO');


// Default Rtoute 
app.get('/',function(req,res){
	res.json({"hello":"world!"});
	return false;
});

//insert last 3 days neos data
app.get('/getneos',function(req,res){
	try{
		var dateFormat = require('dateformat');
		var today = new Date();
		var todayDate = dateFormat(today, "yyyy-mm-dd");

		var dd = today.getDate()-2;
		var ddTwo = today.getDate()-1;
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();	
		var lastThridDate = dateFormat(yyyy+'-'+mm+'-'+dd, "yyyy-mm-dd");
		var lastSecondDate = dateFormat(yyyy+'-'+mm+'-'+ddTwo, "yyyy-mm-dd");

		var request = require('request');
 		request('https://api.nasa.gov/neo/rest/v1/feed?start_date='+lastThridDate+'&end_date='+todayDate+'&detailed=true&api_key=N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD', function (error, response, body) {
 			var data = JSON.parse(body);
 			if(error){
 				res.json(error);
				return false;
 			}		  	  
		  	else if(data.element_count >=1){
		  		//console.log('statusCode:', response && response.statusCode); 
		  		//console.log('body:', data.near_earth_objects[lastThridDate].length);
		  		var records = [];
		  		var j = 0;
		  		//console.log(data.near_earth_objects);
		  		var recordsInner = data.near_earth_objects;
		  		// i used simple for loop in that place we also able to use async.parallel
		  		for (var key in recordsInner) {
				   //console.log(key);
				   for(innerKey in recordsInner[key]){
					   	records[j] = {
			  				date:new Date(key),
	    					reference:recordsInner[key][innerKey]['neo_reference_id'],
	    					name:recordsInner[key][innerKey]['name'],
	    					speed:recordsInner[key][innerKey]['close_approach_data'][0]['relative_velocity']['kilometers_per_hour'],
	    					isHazardous:recordsInner[key][innerKey]['is_potentially_hazardous_asteroid']
			  			}; 		  			
			  			j = j+1;
				   }
				}
				//res.json(records);
				if(records.length >= 1){
					DAO.neoDAO.neoInsertMany(records, function(err,result){
						res.json(result);
						return false;
					});
				}
		  		
		  	}else{
		  		res.json({data:"No records found"});
		  	}
		  	
		});		

	}catch(error){
		res.json(error);
		return false;
	}

});


// Show all records which have true hazardous value
app.get('/neo/hazardous',function(req,res){
	try{
		DAO.neoDAO.getNeo({isHazardous:true}, {}, {}, function(err,result){
			res.json(result);
			return false;
		});
		
	}catch(error){
		res.json(error);
		return false;
	}
});

// Show fastest ateroid which have true|false hazardous value by defaule false value
app.get('/neo/fastest',function(req,res){
	try{
		var isHazardous = false;
		if(typeof req.query.hazardous !== 'undefined'){
			isHazardous = req.query.hazardous;
		}
		var options = {lean: true};
        options.limit = typeof req.query.limit === 'undefined' ? 1 : queryParams.limit;
        options.orderby = {speed: 1};
            
		DAO.neoDAO.getNeo({isHazardous:isHazardous}, {}, options, function(err,result){
			res.json(result);
			return false;
		});		
	}catch(error){
		res.json(error);
		return false;
	}
});

//Show year with most ateroids which have true|false hazardous value by defaule false value
app.get('/neo/best-year',function(req,res){
	try{
		var isHazardous = false;
		if(typeof req.query.hazardous !== 'undefined'){
			isHazardous = req.query.hazardous;
		}
		var group = [
			    {
			    	 "$match": { "isHazardous": JSON.parse(isHazardous)}
			    },
			    {
			    	$sort: {"_id":1}
			    },			    
			    {
			    	"$group":{
			    		"_id": {
				            year:{$year:"$date"}
				        },	
			    		"count": { "$sum": 1 }
			    	}
			    },
			    {
			    	$limit:1
			    }
		];
		DAO.neoDAO.neoAggregate(group, function(err,result){
			res.json(result);
			return false;
		});		
	}catch(error){
		res.json(error);
		return false;
	}
});

//Show year with most ateroids which have true|false hazardous value by defaule false value
app.get('/neo/best-month',function(req,res){
	try{
		var isHazardous = false;
		if(typeof req.query.hazardous !== 'undefined'){
			isHazardous = req.query.hazardous;
		}
		var group = [
			    {
			    	 "$match": { "isHazardous": JSON.parse(isHazardous)}
			    },
			    {
			    	$sort: {"_id":1}
			    },			    
			    {
			    	"$group":{
			    		"_id": {
				            month:{$month:"$date"}
				        },	
			    		"count": { "$sum": 1 }
			    	}
			    },
			    {
			    	$limit:1
			    }
		];
		DAO.neoDAO.neoAggregate(group, function(err,result){
			res.json(result);
			return false;
		});		
	}catch(error){
		res.json(error);
		return false;
	}
});

module.exports = app;

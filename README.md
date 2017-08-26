Build with Node
Freamwork Express
Database Mongodb

npm:
express -- for freamwork
mongoose -- for database
request -- for get values from api
dateformate -- for formate the date as per requirement

Main file index.js
run this application by node index

port 7019 (change as per your requirement in index.js and also mongodb crediential)

for localhost run in browser http://localhost:7019

Folder structure

--DAO
	--DaoManager.js -- all mongodb queries
	-- index.js -- export DAO files
	-- neoDAO.js -- call mongodb queries for neo
--Models
	--index.js -- export Models
	-- neos.js -- Scheme for neo 
--node_modules -- all installed node modules
--routes 
	-- index.js -- all routes in it
index.js -- main file to run the application by node index in command promte
package.json -- basic file of node.js to show all node modules, autor, version etc.


Routes in route/index.js as:

-- / -- default route
-- /getneos -- to request the data from the last 3 days from nasa api and store in database
-- /neo/hazardous -- display all DB entries which contain potentially hazardous asteroids
-- /neo/fastest -- Show fastest ateroid which have true|false hazardous value by defaule false value
-- /neo/best-year -- Show year with most ateroids which have true|false hazardous value by defaule false value
-- /neo/best-month -- Show year with most ateroids which have true|false hazardous value by defaule false value


Scheme for neo as:

var neoSchema = new Schema({
    date:{type: Date, required: true},
    reference:{type:String, unique:true},
    name:{type:String, required:true},
    speed:{type:Number, required:true},
    isHazardous:{type:Boolean, required:true}
});

I am used Sublime editor.
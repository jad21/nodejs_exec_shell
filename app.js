#!/usr/bin/env node

var user = {
    "name": "Jose Angel Delgado",
    "user": "jad21",
    "email": "esojangel@gmail.com",
};
/**
 * 	 Import dependencies
 */
var mysql = require('mysql');
var program = require('commander');
var fs = require('fs');

/**
 * 	 init conn db
 */
var connection = null;

var createConnection = function(no_database){
	if (!connection) {
		var details_db = {
			multipleStatements: true,
		    host: 'localhost',
		    user: 'root',
		    password: 'root',
		};
		if (!no_database) {
			details_db.database = 'test_shell_cli_nodejs';
		}
		connection = mysql.createConnection(details_db);
	}
	return connection;
}
program
	.option('-o, --output <output>', 'type output [text|json]')
	.version('0.0.1')

/**
 * 	 List langs
 */
program
	.command('list ')
	.description('list all langs')
	.option("-l, --like [like]", "Coincidence as in MySQL")
	.action(function(options) {
	    sql = 'SELECT * FROM langs';
	    if (options.like) {
	        sql += ' WHERE name like ?';
	        sql = mysql.format(sql, [options.like]);
	        console.log(sql)
	    }
	    createConnection()
	    connection.connect();
	    connection.query(sql, function(error, results, fields) {
	        if (error) throw error;
	        console.log('List langs' + (options.like ? " like " + options.like : "") + ":");
	        
	        output = [];
	        for (var i in results) {
	        	if (options.parent.output=="json") {
	        		output.push({"name": results[i].name, "created": results[i].date_created});
	        	}else{
	        		output.push("name:%name%, created: %created%".replace("%name%", results[i].name).replace("%created%", results[i].date_created))
	        	}
	        }
	        if (options.parent.output=="json") {
	        	console.log(JSON.stringify(output, null, 4));
	        }
	        else{
	        	console.log(output.join("\n"));
	        }
	    });
	    connection.end();
	});
/**
 * 	 create lang
 */
program
	.command('create <name>')
	.description('create langs')
	.action(function(name, options) {
	    createConnection()
	    connection.connect();
	    connection.query('INSERT IGNORE INTO langs (name) values(?)', [name], function(error, results, fields) {
	        if (error) throw error;
	        if (options.parent.output=="json") {
	        	msg = "create lang %s succesfull".replace("%s", name)
	        	console.log(JSON.stringify({msg: msg}, null, 4));
	        }else{
	        	console.log("create lang %s succesfull", name);
	        }
	    });
	    connection.end();
	});

/**
 * 	 For init database
 */
program
	.command('create_database')
	.description('create langs')
	.action(function(options) {
	    fs.readFile("database.sql", "utf8", function(err, data){
	    	if (err) throw err;
	    	// console.log(data)
	    	createConnection(true)
		    connection.connect();
		    connection.query(data, function(error, results, fields) {
		        if (error) throw error;
		        console.log("create database succesfull");
		        msg = "create database succesfull"
		        if (options.parent.output=="json") {
		        	console.log(JSON.stringify({msg: msg}, null, 4));
		        }else{
		        	console.log(msg, name);
		        }
		    });
		    connection.end();
	    })
	});

/**
 * 	 run
 */
program
	.parse(process.argv);
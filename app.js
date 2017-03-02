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
var connection = mysql.createConnection({
	multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test_shell_cli_nodejs'
});
program.version('0.0.1')

/**
 * 	 List langs
 */
program.command('list ').description('list all langs').option("-l, --like [like]", "Coincidence as in MySQL").action(function(options) {
    sql = 'SELECT * FROM langs';
    if (options.like) {
        sql += ' WHERE name like ?';
        sql = mysql.format(sql, [options.like]);
        console.log(sql)
    }
    connection.connect();
    connection.query(sql, function(error, results, fields) {
        if (error) throw error;
        console.log('List langs ' + (options.like ? "like " + options.like : "") + ":");
        for (var i in results) {
            console.log("name: %s create: %s", results[i].name, results[i].date_created);
        }
    });
    connection.end();
});
/**
 * 	 create lang
 */
program.command('create <name>').description('create langs').action(function(name, options) {
    connection.connect();
    connection.query('INSERT INTO langs (name) values(?)', [name], function(error, results, fields) {
        if (error) throw error;
        console.log("create lang %s succesfull", name);
    });
    connection.end();
});

/**
 * 	 For init database
 */
program.command('create_database').description('create langs').action(function(name, options) {
    fs.readFile("database.sql", "utf8", function(err, data){
    	if (err) throw err;
    	// console.log(data)
	    connection.connect();
	    connection.query(data, function(error, results, fields) {
	        if (error) throw error;
	        console.log("create database succesfull");
	    });
	    connection.end();
    })
});

/**
 * 	 dispachet
 */
program.parse(process.argv);
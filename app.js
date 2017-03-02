#!/usr/bin/env node

var data = {
	"good morning": "buenos dias"
};
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test_shell_cli_nodejs'
});

var program = require('commander');

program
  .version('0.0.1')

program
  .command('list ')
  .description('list all langs')
  .option("-l, --like [like]", "coincidencia como en mysql")
  .action(function(options){
    sql = 'SELECT * FROM langs';
    if (options.like) {
    	sql += ' WHERE name like ?';
		sql = mysql.format(sql, [options.like]);
		console.log(sql)
    }
    connection.connect();
    connection.query(sql, function (error, results, fields) {
    	if (error) throw error;
    	console.log('List langs ' + (options.like?"like "+options.like:"") + ":");
    	for (var i in results) {
    		console.log("name: %s create: %s", results[i].name, results[i].date_created);
    	}
	});
	connection.end();
  });

program
  .command('create <name>')
  .description('create langs')
  .action(function(name, options){
    connection.connect();
    connection.query('INSERT INTO langs (name) values(?)',[name], function (error, results, fields) {
    	if (error) throw error;
    	console.log("create lang %s succesfull", name);
	});
	connection.end();
  });

program
  .command('*')
  .action(function(env){
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);
'use strict';

let mysql = require('mysql')

let connexion = mysql.createConnection
({
	host:'localhost',
	user:'root',
	password:'root',
	database:'my_db'
});

connexion.connect();

module.exports = connexion
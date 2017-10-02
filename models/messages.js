'use strict';

let connexion = require('../config/connexion')
let moment = require('moment')


class Message
{
	constructor(row)
	{
		this.row = row
	}

	get content()
	{
		return this.row.content
	}

	get created_at()
	{
		return moment(this.row.created_at)
	}


	static create (content, callback)
	{
		connexion.query('INSERT INTO Messages SET content = ?, creata_at = ?', [content, new Date()], (error, resultat) =>
		{
			if (error) throw error
			callback(resultat)
		})
	}

	static all(database)
	{
		connexion.query('SELECT * FROM messages', (error, rows) =>
		{
			if (error) throw error
			callback(rows.map((row) => new Message(row)))
		}
	}
}


module.exports = Message
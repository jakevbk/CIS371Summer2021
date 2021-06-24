var express = require('express);

var router = express.Router();

const database = require('./database.js');
let db = database.getDB();

router.get('/mod/:userid', function (req, res){
	console.log('got a request for user id #' + req.params.userid);
	let sql = 'SELECT * FROM user WHERE id = (?)';
	db.get(sql, [req.params.userid], function (err, rows){
		if(err){
			console.log(err.message);
		}{
			if(!rows){
				res.sendStatus(404);
			} else {
				res.set(rows);
			}
		}
	});
});

module.exports = router;

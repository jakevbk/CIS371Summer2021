var express = require('express');

var router = express.Router();

const database = require('./database.js');
let db = database.getDB();

//get all users(not listed on module)
router.get('/users', function(req,res){
	console.log("got request for users");
	let sql = 'SELECT * FROM user';
	db.all(sql,[],function(err,rows){
		if(err){
			console.log(err.message);
		}
		else{
			console.log(rows);
			res.json(rows);
		}
	});
});

///get info about user users/{id}
router.get('/users/:userid', function (req, res){
	console.log('Got a request for user id #' + req.params.userid);
        let sql = 'SELECT * FROM user WHERE id = (?)';
	db.get(sql, [ req.params.userid ], function (err, rows){
		if(err){
			console.log(err.message);
		}{
			if(!rows){													                          
				res.sendStatus(404);
		        } else {
				res.json(rows);
			}						               
		}
	});
});



//put info about user (upadate) users/{id}
router.post('/users/:userid', function (req, res){
	console.log('got a request to update user id # ' + req.params.userid);
        let sql = 'UPDATE user SET firstName= (?), lastName= (?), email= (?), password= (?), joinedDate=(?) WHERE id = (?)';
	db.all(sql, [req.body.firstName, req.body.lastName, req.body.email, req.body.password, Date.now(), req.params.userid],function(err,rows){
                if(err){
			console.log(err.message);
		}{
			if(!rows){
				res.sendStatus(404);
			} else {
				console.log('updated user ');
				res.json(rows)
			}
		}
	});
});

//delete info about user users/{id}
router.delete('/users/:userid', function(req, res){
	console.log("attempt to delete user id " + req.params.userid);
	let sql = 'DELETE FROM user WHERE id = (?)';
	db.run(sql,[req.params.userid], function(err, rows){
		if(err){
			console.log(err.message);
		}else{
			res.sendStatus(200);
		}
	});
});


//create a new user
router.post('/users', function (req, res){
	let sql = 'INSERT INTO user (firstName, lastName, email, password, joinedDate) VALUES ( (?), (?), (?), (?), (?) )';  
	db.run(sql, [ req.body.firstName, req.body.lastName, req.body.email, req.body.password, Date.now() ], function (err){
               if(err){
                  console.log(err.message);
	       } else {
		       console.log('Added user #' + this.lastID);  
		       res.json( {
			       "newId" : this.lastID

			});
		}
	});
});

//returns all posts for a user
router.get('/users/:userid/posts', function(req, res){
	console.log('Got a request to get post for user id #' + req.params.userid);
        let sql = 'SELECT * FROM post WHERE userId = (?)';
	db.all(sql, [ req.params.userid ], function (err, rows){
		if(err){
			console.log(err.message);
		}{
			if(!rows){
				res.sendStatus(404);
			} else {
				res.json(rows);
			}
		}
	});
});





module.exports = router;

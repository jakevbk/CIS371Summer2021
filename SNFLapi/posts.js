var express = require('express');

var router = express.Router();

const database = require('./database.js');
let db = database.getDB();

//get all posts
router.get('/posts', function(req,res){
	console.log("got request for posts");
	let sql = 'SELECT * FROM post order by timestamp';
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

///get info about a specific posts/{id}
router.get('/posts/:postId', function (req, res){
	console.log('Got a request for post id #' + req.params.postId);
        let sql = 'SELECT * FROM post WHERE postId = (?)';
	db.get(sql, [ req.params.postId ], function (err, rows){
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



//put info about post posts/{id}
router.post('/posts/:postId', function (req, res){
        console.log('got a request to update post id # ' + req.params.postId);
	let sql = 'UPDATE post SET text= (?), timestamp= (?) WHERE postId = (?)';
	db.all(sql, [ req.body.text, Date.now(), req.params.postId ], function (err, rows){
                if(err){
			console.log(err.message);
		}{
			if(!rows){
				res.sendStatus(404);
			} else {
				console.log('updated posts');
				res.json(rows)
			}
		}
	});
});

//delete info about post posts/{id}
router.delete('/posts/:postId', function(req, res){
	console.log("attempt to delete post id " + req.params.postId);
	let sql = 'DELETE FROM post WHERE postId = (?)';
	db.run(sql,[req.params.postId], function(err, rows){
		if(err){
			console.log(err.message);
		}else{
			res.sendStatus(200);
		}
	});
});


//create a new post
router.post('/posts', function (req, res){
	let sql = 'INSERT INTO post (text, timestamp, userId) VALUES ( (?), (?), (?))';  
	db.run(sql, [ req.body.text, Date.now(), req.body.userId ], function (err){
               if(err){
                  console.log(err.message);
	       } else {
		       console.log('Added post #' + this.lastID);  
		       res.json( {
			       "new postId" : this.lastID

			});
		}
	});
});


module.exports = router;

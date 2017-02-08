const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const env = require('node-env-file');

const users = require('./model.js')

exports.newUser = (req, res) => {

	users.findOne({ username: req.body.username }, (err, user) => {

		if (err){
			res.json({ message: "Erroring while creating user." });
		}

		if(!user){

			if(!req.body.username || !req.body.password ){

				res.json({ authenticated: false, message: "Please send a username and password." });

			}
			else{

				const newUser = new users({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					created: new Date().getTime()
				});

				newUser.save((err) => {

					if(err){ 
						console.log("Erroring finding user while trying to autheticate: " + err); 
						res.json({ message: "Error creating user." });
					}

					console.log("New user created.");
					res.json({ authenticated: true, message: "User successfully created" });

				})
			}

		}
		else{

			res.json({ authenticated: false, message: "This username is already taken, please pick another." });

		}

	})

}


exports.authenticate = (req, res) => {

	users.findOne({ username: req.body.username }, (err, user) => {

		if(err){ 
			console.log("Erroring finding user while trying to autheticate: " + err);
			res.json({ message: "Erroring finding user while trying to autheticate." }); 
		}

		if(!user){
			
			res.json({ authenticated: false, message: "Failed to find requested user" });

		}
		else if(user){

			
			user.checkPassword(req.body.password, function(err, isMatch){

				if(isMatch && !err){

					const token = jwt.sign({ username: user.username }, process.env.SALT, {});

					res.cookie('session', token, { 
						httpOnly: true, 
						expires: new Date(Date.now() + 1000 * 60 * 60)
					}).send({ loggedIn: true });

				}
				else{

					res.json({ authenticated: false, message: "Password incorrect" });

				}

			});

		}

	});

}

exports.verify = (req, res, next) => {

	const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.session;

	if(token){

		jwt.verify(token, process.env.SALT, (err, decoded) => {

			if(err){ 

				return res.json({ 
					authenticated: false, 
					message: "Invalid token, please try again." 
				});

			}
			else{

				console.log(decoded);

				req.decoded = decoded;
				next();

			}

		});

	}
	else{

		return res.status(403).send({
			authenticated: false,
			message: "No token, please provide one."
		});

	}

}

exports.checkLogin = (req, res) => {

	res.json({ authenticated: true });

}


exports.logOut = (req, res) => {

	res.clearCookie('session');
	res.json({ authenticated: false });

}

exports.findUser = (req, res) => {

	console.log(req.decoded);

	users.findOne({ username: req.decoded.username }, (err, user) => {

		if(err){ 
			console.log("Erroring finding user after authetication: " + err);
			res.json({ message: "Error while trying to find user." });
		}

		res.json(user);

	});

}



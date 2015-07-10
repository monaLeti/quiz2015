var models = require('../models/models.js');

//GET /quiz/questions

exports.question = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})

};

//GET /quiz/answers

exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: 'Correcta'});
		}else{
			res.render('quizes/answer', {respuesta: 'Incorrecta'});
		}
	})
	

};

//GET /quiz/author

exports.author = function(req, res){
	res.render('quizes/author', {author: 'Leticia Trinidad'});
};

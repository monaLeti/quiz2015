var models = require('../models/models.js');

//Autoload -  factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			}else{
				next(new Error('No existe quizId=' + quizId));
			}
		}
		
	).catch(function(error){next(error);});
};

//GET /quiz/:id

exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: req.quiz});
	})
};

//GET /quiz/:id/answers

exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === req.quiz.respuesta){
			res.render('quizes/answer', {quiz: req.quiz, respuesta: "Correcto"});
		}else{
			res.render('quizes/answer', {quiz: req.quiz, respuesta: "Incorrecto"});
		}
	})
	

};

//GET /quizes

exports.index= function(req, res){
	var busq1 = req.query.search;
	var busq2 = ('%'+busq1+'%').replace(/ /g, '%');

	if(busq1){
		models.Quiz.findAll({ where: ["pregunta like ?", busq2]}).then(function(quizes){
			res.render('quizes/index.ejs',{quizes: quizes});
		}).catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(function(quizes){res.render('quizes/index.ejs', {quizes: quizes});}
		).catch(function(error){next(error);})
	}

};

//GET /quizes/new

exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new', {quiz: quiz});
};

//POST /quizes/create

exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes');
	})
};

//GET /quiz/author

exports.author = function(req, res){
	res.render('quizes/author', {author: 'Leticia Trinidad'});
};

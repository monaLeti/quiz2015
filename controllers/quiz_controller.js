var models = require('../models/models.js');

//Autoload -  factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find({
			where: { id: Number(quizId)},
			include: [{model: models.Comment}]
		}).then(function(quiz){
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
		res.render('quizes/show',{quiz: req.quiz, errors: []});
	})
};

//GET /quiz/:id/answers

exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === req.quiz.respuesta){
			res.render('quizes/answer', {quiz: req.quiz, respuesta: "Correcto", errors: []});
		}else{
			res.render('quizes/answer', {quiz: req.quiz, respuesta: "Incorrecto", errors: []});
		}
	})
	

};

//GET /quizes

exports.index= function(req, res){
	var busq1 = req.query.search;
	var busq2 = ('%'+busq1+'%').replace(/ /g, '%');

	if(busq1){
		models.Quiz.findAll({ where: ["pregunta like ?", busq2]}).then(function(quizes){
			res.render('quizes/index.ejs',{quizes: quizes, errors: []});
		}).catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(function(quizes){res.render('quizes/index.ejs', {quizes: quizes, errors: []});}
		).catch(function(error){next(error);})
	}

};

//GET /quizes/new

exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create

exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', { quiz:quiz, errors: err.errors });
      } else {
        // guarda en DB los campos pregunta y respuesta de quiz
          quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
            res.redirect('/quizes');
          })   // res.redirect: Redirección HTTP a lista de preguntas
      }
    }
  );

};

//GET QUIZES/:ID/EDIT

exports.edit = function (req, res){
	var quiz = req.quiz; //autoload de instancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

//PUT /quizes/:id

exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta =req.body.quiz.respuesta;
	req.quiz.tema =req.body.quiz.tema;

	req.quiz
	.validate()
	.then(
		function(err){
			if (err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			}else{
				req.quiz
				.save( {fields: ["pregunta", "respuesta", "tema"]})
				.then ( function(){ res.redirect('/quizes')});
			}
		}
	);
};

//DELETE /quizes/:id

exports.destroy = function(req, res){
	req.quiz.destroy().then(function() {
		res.redirect('/quizes');
	}).catch(function (error){next(error)});
};



//GET /quiz/author

exports.author = function(req, res){

	res.render('quizes/author', {author: 'Leticia Trinidad', errors: []});
};

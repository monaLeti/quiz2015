//GET /quiz/questions

exports.question = function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});

};

//GET /quiz/answers

exports.answer = function(req, res){
	if(req.query.respuesta == 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcta'});
	}else{
		res.render('quizes/answer', {respuesta: 'Incorrecta'});
	}
	

};

//GET /quiz/author

exports.author = function(req, res){
	res.render('quizes/author', {author: 'Leticia Trinidad'});
};

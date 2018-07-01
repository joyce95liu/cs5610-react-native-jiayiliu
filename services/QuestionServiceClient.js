let _singleton = Symbol();

const TrueOrFalseQuestion_API_URL = 'http://localhost:8080/api/inheritance/joined/true';

class QuestionServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    findAllQuestionForExam(examId){
        return fetch("http://localhost:8080/api/exam/"+examId+"/question")
            .then(function(response) {
                return response.json();
            })
    }

    createTrueOrFalseQuestion(examId,question) {
        return fetch('http://localhost:8080/api/exam/'+examId+'/inheritance/joined/true', {
             body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}



    saveTrueOrFalseQuestion(questionId,question){
        return fetch(TrueOrFalseQuestion_API_URL+'/'+questionId, {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })
    }


static get instance() {
    if(!this[_singleton])
        this[_singleton] = new QuestionServiceClient(_singleton);
    return this[_singleton]
}
}
export default QuestionServiceClient;
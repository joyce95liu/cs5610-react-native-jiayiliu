let _singleton = Symbol();

const TrueOrFalseQuestion_API_URL = 'https://salty-spire-76406.herokuapp.com/api/inheritance/joined/true';

class QuestionServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    findAllQuestionForExam(examId){
        return fetch("https://salty-spire-76406.herokuapp.com/api/exam/"+examId+"/question")
            .then(function(response) {
                return response.json();
            })
    }

    createTrueOrFalseQuestion(examId,question) {
        return fetch('https://salty-spire-76406.herokuapp.com/api/exam/'+examId+'/inheritance/joined/true', {
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

    createMultipleChoiceQuestion(examId,question) {
        return fetch('https://salty-spire-76406.herokuapp.com/api/exam/'+examId+'/inheritance/joined/multi', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}



    saveMultipleChoiceQuestion(questionId,question){
        return fetch('https://salty-spire-76406.herokuapp.com/api/inheritance/joined/multi'+'/'+questionId, {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })
    }

    createEssayQuestion(examId,question) {
        return fetch('https://salty-spire-76406.herokuapp.com/api/exam/'+examId+'/inheritance/joined/essay', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

    saveEssayQuestion(questionId,question){
        return fetch('https://salty-spire-76406.herokuapp.com/api/inheritance/joined/essay'+'/'+questionId, {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })
    }

    createFillInBlankQuestion(examId,question) {
        return fetch('https://salty-spire-76406.herokuapp.com/api/exam/'+examId+'/inheritance/joined/fill', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

    saveFillInBlankQuestion(questionId,question){
        return fetch('https://salty-spire-76406.herokuapp.com/api/inheritance/joined/fill'+'/'+questionId, {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })
    }

    deletequestion(questionId){
        return fetch('https://salty-spire-76406.herokuapp.com/api/question/'+questionId, {
            method: 'DELETE'
           }).then(function (response) {
            return response;
         })

    }

    // deletechoice(choiceId){
    //     return fetch('http://localhost:8080/api/choice/'+choiceId, {
    //         method: 'DELETE'
    //     }).then(function (response) {
    //         return response;
    //     })
    //
    // }
    //
    // findAllChoiceForQuestion(questionId){
    //     return fetch("http://localhost:8080/api/question/"+questionId+"/choices")
    //         .then(function(response) {
    //             return response.json();
    //         })
    // }
    //
    // createChoiceForQuestion(questionId,choice){
    //     return fetch('http://localhost:8080/api/question/'+questionId+'/choice', {
    //         body: JSON.stringify(choice),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'POST'
    //     }).then(function (response) {
    //         return response.json();
    //     })}





static get instance() {
    if(!this[_singleton])
        this[_singleton] = new QuestionServiceClient(_singleton);
    return this[_singleton]
}
}
export default QuestionServiceClient;
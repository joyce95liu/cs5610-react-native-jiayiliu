let _singleton = Symbol();

const TrueOrFalseQuestion_API_URL = 'https://webdev-summer-assignment.herokuapp.com/api/inheritance/joined/true';

class ExamServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }



    createExam(lessonId,exam) {
        return fetch('https://webdev-summer-assignment.herokuapp.com/api/lesson/'+lessonId, {
            body: JSON.stringify(exam),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

    saveExam(examId,exam){
        return fetch('https://webdev-summer-assignment.herokuapp.com/api/exam/'+examId, {
            body: JSON.stringify(exam),
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
            this[_singleton] = new ExamServiceClient(_singleton);
        return this[_singleton]
    }
}
export default ExamServiceClient;
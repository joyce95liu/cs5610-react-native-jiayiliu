import AssignmentServiceClient from "./AssignmentServiceClient";

let _singleton = Symbol();


class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    findAllWidgetForLesson(lessonId){
        return fetch("https://webdev-summer-assignment.herokuapp.com/api/lesson/"+lessonId+"/widgets")
            .then(function(response) {
                return response.json();
            })
    }

    deletewidget(widgetId){
        return fetch('https://webdev-summer-assignment.herokuapp.com/api/widget/'+widgetId, {
            method: 'DELETE'
        }).then(function (response) {
            return response;
        })

    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }
}
export default LessonServiceClient;
let _singleton = Symbol();



class AssignmentServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }



    createAssignment(lessonId,assignment) {
        return fetch('https://salty-spire-76406.herokuapp.com/api/lesson/'+lessonId+'/assignment', {
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

    saveAssignment(assignmentId,assignment){
    return fetch('https://salty-spire-76406.herokuapp.com/api/assignment/'+assignmentId, {
    body: JSON.stringify(assignment),
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'PUT'
     }).then(function (response) {
    return response.json();
   })
    }

    //
    // findAllAssignmentsForLesson(lessonId){
    //     return fetch("http://localhost:8080/api/lesson/"+lessonId+"/assignment")
    //         .then(function(response) {
    //             return response.json();
    //         })
    // }





    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentServiceClient(_singleton);
        return this[_singleton]
    }
}
export default AssignmentServiceClient;
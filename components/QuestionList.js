import React, {Component} from 'react'
import {ScrollView,View, Alert,Picker} from 'react-native'
import {Button,Text, ListItem,Icon,FormLabel,FormInput} from 'react-native-elements'
import QuestionTypePicker from '../elements/QuestionTypePicker'
import QuestionServiceClient from "../services/QuestionServiceClient";
import ExamServiceClient from '../services/ExamServiceClient'

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}
    constructor(props) {
        super(props)

        this.QuestionServiceClient = QuestionServiceClient.instance;
        this.ExamServiceClient= ExamServiceClient.instance;

        this.state = {
            questions: [],
            examId: 1,
            questionType:'MC',
            exam:'',
            description:'',
            title:'',
            lessonId:0
        }
        this.refresh=this.refresh.bind(this)

    }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        const exam = navigation.getParam("exam")
        const lessonId = navigation.getParam("lessonId")

        this.setState({examId:examId})
        this.setState({exam:exam})
        this.setState({title:exam.title})
        this.setState({description:exam.description})
        this.findAllQuestionForExam(examId)
        this.setState({lessonId:lessonId})
    }

    componentWillReceiveProps(newProps) {
        this.setState({examId: newProps.examId});
        this.setState({questions: newProps.questions});
    }

    refresh=(data)=> {
      return this.findAllQuestionForExam(data)
    }


    findAllQuestionForExam(examId){
        this.QuestionServiceClient.findAllQuestionForExam(examId)
            .then((questions) => {this.setState({questions:questions});
            });
    }


    createquestion(){
        if (this.state.questionType==="TF"){

            let question={'type':'TrueOrFalse',
                'title':'New TrueOrFalse Question',
                'icon':'check',
                'isTrue':true
            }
            this.QuestionServiceClient.createTrueOrFalseQuestion(this.state.examId,question)
                .then(() => { this.findAllQuestionForExam(this.state.examId); });
        }

        if (this.state.questionType==="MC"){

            let question={'type':'MultipleChoice',
                'title':'New MultipleChoice Question',
                'icon':'list',
                'options':'list',
                'correctOption':''
            }
            this.QuestionServiceClient.createMultipleChoiceQuestion(this.state.examId,question)
                .then(() => { this.findAllQuestionForExam(this.state.examId); });
        }

        if (this.state.questionType==="ES"){

            let question={'type':'Essay',
                'title':'New Essay Question',
                'icon':'subject',
                'text':''
            }
            this.QuestionServiceClient.createEssayQuestion(this.state.examId,question)
                .then(() => { this.findAllQuestionForExam(this.state.examId); });
        }

        if (this.state.questionType==="FB"){

            let question={'type':'FillInBlank',
                'title':'New FillInBlank Question',
                'icon':'code',
                'variables':''
            }
            this.QuestionServiceClient.createFillInBlankQuestion(this.state.examId,question)
                .then(() => { this.findAllQuestionForExam(this.state.examId); });
        }
    }

    deletequestion(questionId){

        // window.confirm('Confirm that you want to delete the question');
        this.QuestionServiceClient
            .deletequestion(questionId)
            .then(() => { this.findAllQuestionForExam(this.state.examId);
            });
    }

    saveExam(){
        let exam={
            'title':this.state.title,
            'description':this.state.description,
            'questions':this.state.questions
        }
        this.ExamServiceClient.saveExam(this.state.examId,exam)
            .then(()=>this.props.navigation.state.params.refreshit(this.state.lessonId))
            .then(()=>this.props.navigation.goBack())
    }

    updateForm(newState){
        this.setState(newState)
    }

    render() {


        return(
            <ScrollView style={{padding: 15}}>
                <FormLabel>Title</FormLabel>
                <FormInput
                    onChangeText={
                        text => this.updateForm({title: text}) }>
                    {this.state.title}
                </FormInput>
                <FormLabel>Description</FormLabel>
                <FormInput
                    onChangeText={
                        text => this.updateForm({description: text}) }>
                    {this.state.description}
                </FormInput>

                <Button    backgroundColor="green"
                           color="white"
                           title="Save"
                           buttonStyle={{height:50}}
                           onPress={()=>this.saveExam()}
                />
                
                <Button    backgroundColor="blue"
                           color="white"
                           title="create"
                           buttonStyle={{height:50}}
                           onPress={()=>this.createquestion()}/>

                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="MC" label="Multiple choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or false" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>

                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            leftIcon={{name: question.icon}}
                            onPress={() => {
                                if(question.type === "TrueOrFalse")
                                    this.props.navigation
                                        .navigate("TrueFalseQuestionEditor",
                                            {questionId: question.id,
                                                question:question,
                                                examId:this.state.examId,
                                                refresh:this.refresh
                                            })

                                if(question.type === "MultipleChoice")
                                    this.props.navigation
                                        .navigate("MultipleChoiceQuestionWidget",
                                            {questionId: question.id,
                                                question:question,
                                                examId:this.state.examId,
                                                refresh:this.refresh
                                            })

                                if(question.type === "Essay")
                                    this.props.navigation
                                        .navigate("EssayQuestionWidget",
                                            {questionId: question.id,
                                                examId:this.state.examId,
                                                question:question,
                                                refresh:this.refresh
                                            })

                                if(question.type === "FillInBlank")
                                    this.props.navigation
                                        .navigate("FillInBlankQuestionWidget",
                                            {questionId: question.id,
                                                question:question,
                                                examId:this.state.examId,
                                                refresh:this.refresh
                                            })

                            }}


                            key={index}
                            rightIcon={<Icon
                                color="#f50"
                                name="delete"
                                onPress={()=>this.deletequestion(question.id)}
                            />}

                            subtitle={question.description}
                            title={question.title}/>))}





            </ScrollView>
        )
    }
}
export default QuestionList


import React, {Component} from 'react'
import {ScrollView,View, Alert,Picker} from 'react-native'
import {Button,Text, ListItem} from 'react-native-elements'
import QuestionTypePicker from '../elements/QuestionTypePicker'
import QuestionServiceClient from "../services/QuestionServiceClient";

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)

      this.QuestionServiceClient = QuestionServiceClient.instance;

    this.state = {
      questions: [],
      examId: 1,
        questionType:0
    }

  }
  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
      this.setState({examId:examId})
    this.findAllQuestionForExam(examId)
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
                      'isTrue':true}
        this.QuestionServiceClient.createTrueOrFalseQuestion(this.state.examId,question)
            .then(() => { this.findAllQuestionForExam(this.state.examId); });

    }
    }


  render() {
    return(
      <ScrollView style={{padding: 15}}>

      {this.state.questions.map(
        (question, index) => (
          <ListItem
              leftIcon={{name: question.icon}}
            onPress={() => {
              if(question.type === "TrueOrFalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionEditor",
                      {questionId: question.id,
                      description:question.description,
                      title:question.title,
                      instructions:question.instructions,
                      points:question.points,
                      isTrue:question.isTrue})
              if(question.type === "MultipleChoice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
            }}
            key={index}

            subtitle={question.description}
            title={question.title}/>))}

          <Picker
              onValueChange={(itemValue, itemIndex) =>
                  this.setState({questionType: itemValue})}
              selectedValue={this.state.questionType}>
              <Picker.Item value="MC" label="Multiple choice" />
              <Picker.Item value="ES" label="Essay" />
              <Picker.Item value="TF" label="True or false" />
              <Picker.Item value="FB" label="Fill in the blanks" />
          </Picker>

          <Button    backgroundColor="blue"
                     color="white"
                     title="create"
                     onPress={()=>this.createquestion()}/>

      </ScrollView>
    )
  }
}
export default QuestionList
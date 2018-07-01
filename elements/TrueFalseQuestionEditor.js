import React from 'react'
import { View } from 'react-native'
import { Button,Text,FormLabel,FormValidationMessage,FormInput,CheckBox} from 'react-native-elements'
import QuestionServiceClient from "../services/QuestionServiceClient";

class TrueFalseQuestionEditor extends React.Component{
    static navigationOptions = {title: 'TrueFaleEditor'}
    constructor(props){
        super(props)

        this.QuestionServiceClient = QuestionServiceClient.instance;

        this.state={
            title:'',
            description:'',
            instructions:'',
            points:0,
            isTrue:true,
            question:'',
            questionId:0
        }

        // this.updateForm = this.updateForm.bind(this);
        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        const title=navigation.getParam("title")
        const instructions = navigation.getParam("instructions")
        const isTrue=navigation.getParam("isTrue")
        const description = navigation.getParam("description")
        // fetch("http://localhost:8080/api/truefalse/"+questionId)
        //     .then(response => (response.json()))
        //     .then(question => this.setState({question}))
        this.setState({title:title})
        this.setState({instructions:instructions})
        this.setState({description:description})
        this.setState({isTrue:isTrue})
        this.setState({questionId:questionId})
    }


    updateForm(newState){
        this.setState(newState)
    }

    saveForm(){
        let question={
            'title':this.state.title,
            'description':this.state.description,
            'instructions':this.state.instructions,
            'points':this.state.points,
            'isTrue':this.state.isTrue,
        }
        this.QuestionServiceClient.saveTrueOrFalseQuestion(this.state.questionId,question)
    }

    render(){
          // const questionId = this.props.navigation.getParam("questionId")
          // const question = this.props.navigation.getParam("question")
        return(

            <View>

            <Text h3>Eidtor</Text>
                <FormLabel>Title</FormLabel>

                <FormInput
                     onChangeText={
                     text => this.updateForm({title: text}) }>
                     {this.state.title}
                     {this.state.questionId}
                </FormInput>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                onChangeText={
                text => this.updateForm({description: text}) }>
                         {this.state.description}
                </FormInput>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Instruction</FormLabel>
                <FormInput
                    onChangeText={
                        text => this.updateForm({instructions: text}) }>
                    {this.state.instructions}
                </FormInput>
                <FormValidationMessage>
                    Instruction is required
                </FormValidationMessage>

                <CheckBox onPress={()=>this.updateForm({isTrue:!this.state.isTrue})}
                          checked={this.state.isTrue} title='The answer is true'/>

                <Button    backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={()=>this.saveForm()}/>

                <Button    backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <Text h3>{this.state.title}</Text>
                <Text h3>{this.state.description}</Text>
            </View>
        )
    }
}
export default TrueFalseQuestionEditor
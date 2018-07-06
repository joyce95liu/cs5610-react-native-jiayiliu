import React from 'react'
import {View,TextInput, ScrollView, StyleSheet} from 'react-native'
import { Button,Text,FormLabel,FormValidationMessage,FormInput,CheckBox,ListItem} from 'react-native-elements'
import QuestionServiceClient from "../services/QuestionServiceClient";

class EssayQuestionWidget extends React.Component{
    static navigationOptions = {title: 'EssayQuestionEditor'}
    constructor(props){
        super(props)

        this.QuestionServiceClient = QuestionServiceClient.instance;

        this.state={
            title:'',
            description:'',
            instructions:'',
            points:0,
            text:'',
            question:'',
            questionId:0,
            previewMode:true,
            examId:0
        }

        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        const question=navigation.getParam("question")
        const examId=navigation.getParam("examId")

        this.setState({title:question.title})
        this.setState({instructions:question.instructions})
        this.setState({description:question.description})
        this.setState({text:question.text})
        this.setState({questionId:questionId})
        this.setState({examId:examId})
        this.setState({points:question.points})
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
            'text':this.state.text
        }
        this.QuestionServiceClient.saveEssayQuestion(this.state.questionId,question)
            .then(()=>this.props.navigation.state.params.refresh(this.state.examId))
            .then(()=>this.props.navigation.goBack())
    }

    preview(){
        this.setState({previewMode:!this.state.previewMode})
    }


    render(){

        return(

            <ScrollView>

                <Text h3>Eidtor</Text>

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

                <FormLabel>Instruction</FormLabel>
                <FormInput
                    onChangeText={
                        text => this.updateForm({instructions: text}) }>
                    {this.state.instructions}
                </FormInput>

                <FormLabel>Points</FormLabel>
                <FormInput
                    onChangeText={
                        text => this.updateForm({points: text}) }>
                    {this.state.points}
                </FormInput>

                <Button onPress={()=>this.preview()}
                        title="preiew"
                        buttonStyle={{width:100,height:40}}/>

                {this.state.previewMode&&
                <ScrollView style={styles. textContainerarea}>
                    <Text h4>Preview</Text>

                    <View style={styles. scorearea}>
                        <Text h5>{this.state.title}</Text>
                        <Text h5>{this.state.points} points</Text>
                    </View>
                    <Text h5>{this.state.description}</Text>
                    <Text h5>{this.state.instructions}</Text>
                    <View style={styles.textContainer}>
                    <TextInput
                               onChangeText={
                                   text => this.updateForm({text: text}) }>
                        {this.state.text}
                    </TextInput>
                    </View>

                    <Button    backgroundColor="green"
                               color="white"
                               title="Save"
                               onPress={()=>this.saveForm()}
                    />

                    <Button    backgroundColor="red"
                               color="white"
                               title="Cancel"
                               onPress={() =>this.props.navigation.navigate('QuestionList')}/>

                </ScrollView>}

            </ScrollView>
        )
    }
}
export default EssayQuestionWidget

const styles=StyleSheet.create({
    textContainerarea:{
        width:window.width,
        margin: 10,
        padding:5,
    },
    scorearea:{
        flexDirection : 'row',
        width: window.width,
        justifyContent: 'space-between',
    },

    textContainer:{
        height : 200,
        borderWidth:1,
        justifyContent: 'flex-start',

    }
})
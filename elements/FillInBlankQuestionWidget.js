import React from 'react'
import {StyleSheet, View,ScrollView,TextInput} from 'react-native'
import { Button,Text,FormLabel,FormValidationMessage,FormInput,CheckBox,ListItem} from 'react-native-elements'
import QuestionServiceClient from "../services/QuestionServiceClient";

class FillInBlankQuestionWidget extends React.Component{
    static navigationOptions = {title: 'FillInBlankQuestionEditor'}
    constructor(props){
        super(props)

        this.QuestionServiceClient = QuestionServiceClient.instance;

        this.state={
            title:'',
            description:'',
            instructions:'',
            points:'',
            variables:'',
            question:'',
            questionId:0,
            previewMode:true,
            examId:0,
            show:[]
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
        this.setState({questionId:questionId})
        this.setState({variables:question.variables})
        this.setState({points:question.points})
        this.setState({examId:examId})
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
            'variables':this.state.variables
        }
        this.QuestionServiceClient.saveFillInBlankQuestion(this.state.questionId,question)
              .then(()=>this.props.navigation.state.params.refresh(this.state.examId))
            .then(()=>this.props.navigation.goBack())
    }

    preview(){
        this.setState({previewMode:!this.state.previewMode})
    }


        parseData = (text) => {
            let show = [];
            let push = true;
            for (let i = 0; i < text.length; i++) {
                if (text.charAt(i) === '[') {
                    show.push('[]');
                    push = false;
                }
                if (text.charAt(i) === ']') {
                    push = true;
                }
                if (push && text.charAt(i) !== '[' && text.charAt(i) !== ']') {
                    show.push(text.charAt(i));
                }
            }
            this.setState({show:show});
    };



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
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

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

                <FormLabel>FillInBlank</FormLabel>
                <FormInput
                    multiline={true}
                    onChangeText={
                        text => this.updateForm({variables: text}) }>
                    {this.state.variables}
                </FormInput>
                <Button    backgroundColor="orange"
                           color="white"
                           title="parse"
                           // buttonStyle={{width:100,height:40}}
                           onPress={()=>this.parseData(this.state.variables)}
                />

                <Button    backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={()=>this.saveForm()}
                />

                <Button    backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() =>this.props.navigation.navigate('QuestionList')}/>


                <Button onPress={()=>this.preview()}
                        title="preiew"
                        buttonStyle={{width:100,height:50}}/>

                {this.state.previewMode&&
                <ScrollView style={styles. textContainerarea}>
                    <Text h4>Preview</Text>

                    <View style={styles. scorearea}>
                        <Text h5>{this.state.title}</Text>
                        <Text h5>{this.state.points} points</Text>
                    </View>
                    <Text h5>{this.state.description}</Text>
                    <Text h5>{this.state.instructions}</Text>
                    <View style={{ flexDirection: 'row'}}>
                        {this.state.show.map((show, index) => {
                            if (show === '[]') {
                                return <TextInput
                                    backgroundColor="white"
                                    height={30}
                                    width={70}
                                    key={index}/>
                            }
                            else {
                                return <Text style={{fontSize: 20}} key={index}>{show}</Text>
                            }
                        })
                        }
                    </View>

                    <Button    backgroundColor="green"
                               color="white"
                               title="Save"
                    />

                    <Button    backgroundColor="red"
                               color="white"
                               title="Cancel"/>

                </ScrollView>}
            </ScrollView>
        )
    }
}
export default FillInBlankQuestionWidget


const styles=StyleSheet.create({
    textContainerarea:{
        width:window.width,
        margin: 10,
        padding:5,
        borderWidth:1

    },
    scorearea:{
        flexDirection : 'row',
        width: window.width,
        justifyContent: 'space-between',
    }
})
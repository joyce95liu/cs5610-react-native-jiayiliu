import React from 'react'
import { View,ScrollView,StyleSheet} from 'react-native'
import { Button,Text,FormLabel,FormValidationMessage,FormInput,CheckBox,ListItem} from 'react-native-elements'
import QuestionServiceClient from "../services/QuestionServiceClient";
import QuestionList from '../components/QuestionList'

class MultipleChoiceQuestionWidget extends React.Component{
    static navigationOptions = {title: 'MultipleChoiceQuestionEditor'}
    constructor(props){
        super(props)

        this.QuestionServiceClient = QuestionServiceClient.instance;

        this.state={
            title:'',
            description:'',
            instructions:'',
            points:'',
            options:'',
            correctoption:'',
            questionId:0,
            previewMode:true,
            examId:0,
            chooseoption:''
        }

        this.saveForm = this.saveForm.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const questionId = navigation.getParam("questionId")
        const question=navigation.getParam("question")
        const examId=navigation.getParam("examId")

        this.setState({title:question.title})
        this.setState({points:question.points})
        this.setState({instructions:question.instructions})
        this.setState({description:question.description})
        this.setState({correctoption:question.correctOption})
        this.setState({options:question.options})
        this.setState({questionId:questionId})
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
            'options':this.state.options,
            'correctOption':this.state.correctoption,
            'currentoption':'',
        }
        this.QuestionServiceClient.saveMultipleChoiceQuestion(this.state.questionId,question)
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

                <FormLabel>Options</FormLabel>
                <FormInput
                    multiline={true}
                    onChangeText={
                        text => this.updateForm({options: text}) }>
                    {this.state.options}
                </FormInput>
                {/*<Button backgroundColor="blue"*/}
                {/*color="white"*/}
                {/*title="Add option"*/}
                {/*onPress={()=>this.addoption()}/>*/}
                <Button    backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={()=>this.saveForm()}
                />

                <Button    backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() =>this.props.navigation.navigate('QuestionList')}/>

                {this.state.options.split('\n').map(
                    (item,index)=>(<CheckBox title={item} key={index}
                                             checked = {index==this.state.correctoption}
                                             onPress={()=>this.setState({correctoption:index})}/>))}

                <Text>  </Text>
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

                    {this.state.options.split('\n').map(
                        (item,index)=>(<CheckBox title={item} key={index}
                                                 checked = {index==this.state.chooseoption}
                                                 onPress={()=>this.setState({chooseoption:index})}
                                                 />))}

                    <Button    backgroundColor="green"
                               color="white"
                               title="Save"

                    />

                    <Button    backgroundColor="red"
                               color="white"
                               title="Cancel"
                              />

                </ScrollView>}

            </ScrollView >
        )
    }
}
export default MultipleChoiceQuestionWidget

const styles=StyleSheet.create({
    textContainerarea:{
        // flexDirection : 'row',
        width: window.width,
        margin: 10,
        padding:5,
        borderWidth:1

    },
    scorearea:{
        flexDirection : 'row',
        //width: window.width,
        // margin: 10,
        // padding:5,
        justifyContent: 'space-between',
        //borderWidth:1
    }
})



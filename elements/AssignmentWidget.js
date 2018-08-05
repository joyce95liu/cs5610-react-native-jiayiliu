import React, {Component} from 'react'
import {ScrollView, View, Alert, Picker, StyleSheet,TextInput} from 'react-native'
import {Button,Text, ListItem,FormLabel,FormInput,FormValidationMessage} from 'react-native-elements'
import QuestionTypePicker from '../elements/QuestionTypePicker'
import QuestionServiceClient from "../services/QuestionServiceClient";
import AssignmentServiceClient from "../services/AssignmentServiceClient"

class AssignmentWidget extends Component {
    static navigationOptions = {title: 'Assignment'}

    constructor(props) {
        super(props)
        this.AssignmentServiceClient=AssignmentServiceClient.instance;

        this.state = {
            assignmentId: 1,
            title:'',
            description:'',
            essay:'',
            file:'',
            link:'',
            previewMode:true,
            lessonId:0,
            points:''

        }
        this.saveAssignment = this.saveAssignment.bind(this);

    }

    updateForm(newState){
        this.setState(newState)
    }

    componentDidMount() {

        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId")
        const assignment=navigation.getParam("widget")
        const lessonId = navigation.getParam("lessonId")

        this.setState({title:assignment.title})
        this.setState({essay:assignment.essay})
        this.setState({description:assignment.description})
        this.setState({link:assignment.link})
        this.setState({assignmentId:assignmentId})
        this.setState({lessonId:lessonId})
        this.setState({file:assignment.file}),
            this.setState({points:assignment.points})
    }


    saveAssignment(){
        let assignment={
            'title':this.state.title,
            'description':this.state.description,
            'file':this.state.file,
            'link':this.state.link,
            'essay':this.state.essay,
            'points':this.state.points,
        }
        this.AssignmentServiceClient.saveAssignment(this.state.assignmentId,assignment)
            .then(()=>this.props.navigation.state.params.refreshit(this.state.lessonId))
            .then(()=>this.props.navigation.goBack())
    }

    preview(){
        this.setState({previewMode:!this.state.previewMode})
    }

    render() {
        return (
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

                <FormLabel>Points</FormLabel>
                <FormInput
                    onChangeText={
                        text => this.updateForm({points: text}) }>
                    {this.state.points}
                </FormInput>

                <Button    backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={()=>this.saveAssignment()}
                />

                <Button    backgroundColor="red"
                           color="white"
                           title="Cancel"
                           onPress={() =>this.props.navigation.navigate('WidgetList')}/>

                {/*<FormLabel>Essay</FormLabel>*/}
                {/*<FormInput*/}
                    {/*onChangeText={*/}
                        {/*text => this.updateForm({essay: text}) }>*/}
                    {/*{this.state.essay}*/}
                {/*</FormInput>*/}

                {/*<FormLabel>file</FormLabel>*/}
                {/*<FormInput*/}
                    {/*onChangeText={*/}
                        {/*text => this.updateForm({file: text}) }>*/}
                    {/*{this.state.file}*/}
                {/*</FormInput>*/}

                {/*<FormLabel>link</FormLabel>*/}
                {/*<FormInput*/}
                    {/*onChangeText={*/}
                        {/*text => this.updateForm({link: text}) }>*/}
                    {/*{this.state.link}*/}
                {/*</FormInput>*/}

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
                    <Text h5>Essay answer</Text>

                    <TextInput style={styles. essayarea}
                        onChangeText={
                            (text) => this.updateForm({essay: text}) }>
                               {this.state.essay}
                    </TextInput>


                    <Text h5>Upload a file</Text>
                    <View style={styles. filearea}>
                        <Button title="choose file"
                                buttonStyle={{
                                 width:110,
                                  height:45,

                                    }}/>
                        {this.state.file}
                    </View>

                    <Text h5>Submit a link</Text>
                    <TextInput style={styles. textarea}
                               onChangeText={
                                   text => this.updateForm({link: text}) }>
                        {this.state.link}
                    </TextInput>




                    <Button    backgroundColor="green"
                               color="white"
                               title="Save"/>

                    <Button    backgroundColor="red"
                               color="white"
                               title="Cancel"/>

                </ScrollView>}
            </ScrollView>
        )
    }
}
    export default AssignmentWidget


const styles=StyleSheet.create({
    textContainerarea:{
        width: window.width,
        height:600,
        margin: 10,
        padding:5,
        borderWidth:1,
    },

    textarea:{
        height: 50,
        borderWidth:1,
    },
    filearea:{
        height: 48,
        borderWidth:1
    },
    essayarea:{
        height: 200,
        borderWidth:1,
    },
    scorearea:{
        flexDirection : 'row',
        width: window.width,
        justifyContent: 'space-between',
    },
})

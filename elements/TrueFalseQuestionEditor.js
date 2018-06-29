import React from 'react'
import { View } from 'react-native'
import { Button,Text,FormLabel,FormValidationMessage,FormInput,CheckBox} from 'react-native-elements'

class TrueFalseQuestionEditor extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            description:'',
            points:0,
            isTrue:true
        }
    }
    updateForm(newState){
        this.setState(newState)
    }
    render(){
        return(

            <View>
            <Text h3>Eidtor</Text>
                <FormLabel>Title</FormLabel>
                <FormInput
                     onChangeText={
                     text => this.updateForm({title: text}) }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                onChangeText={
                text => this.updateForm({descriptionn: text}) }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <CheckBox onPress={()=>this.updateForm({isTrue:!this.state.isTrue})}
                          checked={this.state.isTrue} title='The answer is true'/>
                          {/*// onPress={() => this.formUpdate*/}
                          {/*// ({isTrue: !this.state.isTrue})}*/}
                          {/*// checked={this.state.isTrue}/>*/}

                <Button    backgroundColor="green"
                           color="white"
                           title="Save"/>
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
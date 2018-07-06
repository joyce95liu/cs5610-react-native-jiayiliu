import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Button,Text, ListItem,ButtonGroup,Icon} from 'react-native-elements'
import QuestionServiceClient from "../services/QuestionServiceClient";
import ExamServiceClient from '../services/ExamServiceClient'
import AssignmentServiceClient from '../services/AssignmentServiceClient'
import AssignmentWidget from '../elements/AssignmentWidget'
import LessonServiceClient from '../services/LessonServiceClient'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)

      this.ExamServiceClient = ExamServiceClient.instance;
      this.AssignmentServiceClient=AssignmentServiceClient.instance;
      this.LessonServiceClient = LessonServiceClient.instance;
      this.refreshit=this.refreshit.bind(this)
     this.state = {
      widgets: [],
      courseId: 1,
       moduleId: 1,
        selectedWidgetTypeIndex:0,
        lessonId:0
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
      this.setState({lessonId:lessonId})
      this.LessonServiceClient. findAllWidgetForLesson(lessonId)
      .then(widgets => this.setState({widgets}))
  }

    componentWillReceiveProps(newProps) {
        this.setState({lessonId: newProps.lessonId});
        this.setState({widgets: newProps.widgets});
    }

    refreshit=(data)=> {
        return this.LessonServiceClient.findAllWidgetForLesson(data)
            .then(widgets => this.setState({widgets}))
    }

    createwidget(){
            if(this.state.selectedWidgetTypeIndex===0){
                let exam={'widgetType':'Exam',
                    'title':'New Exam',
                    'description':''}
                this.ExamServiceClient.createExam(this.state.lessonId,exam)
                    .then(() => { this.LessonServiceClient. findAllWidgetForLesson(this.state.lessonId)
                        .then(widgets => this.setState({widgets})); });
            }

        if(this.state.selectedWidgetTypeIndex===1){
            let assignment={'widgetType':'Assignment',
                'title':'New Assignment',
                'description':''}
            this.AssignmentServiceClient.createAssignment(this.state.lessonId,assignment)
                .then(() => { this.LessonServiceClient. findAllWidgetForLesson(this.state.lessonId)
                    .then(widgets => this.setState({widgets})); });
        }
    }

    selectWidgetType=(newWidgetTypeIndex)=> {
        this.setState({
            selectedWidgetTypeIndex: newWidgetTypeIndex
        })
    }

    deletewidget(widgetId){
        // window.confirm('Confirm that you want to delete the question');
        this.LessonServiceClient
            .deletewidget(widgetId)
            .then(() => { this.LessonServiceClient. findAllWidgetForLesson(this.state.lessonId)
                .then(widgets => this.setState({widgets})); });
    }

  render() {

      const widegtTypes = ['Exam', 'Assignment']
    return(
      <View style={{padding: 15}}>
      {this.state.widgets.map(
        (widget, index) => (
          <ListItem
            onPress={() =>{
              if (widget.widgetType==='Exam')
              this.props.navigation
              .navigate("QuestionList", {examId: widget.id,
                  exam:widget,
                  refreshit:this.refreshit,
                  lessonId:this.state.lessonId
              })

                if (widget.widgetType==='Assignment')
                    this.props.navigation
                        .navigate("AssignmentWidget", {assignmentId: widget.id,
                                                        widget:widget,
                                                        refreshit:this.refreshit,
                                                        lessonId:this.state.lessonId
                                                         })
            }}
            key={index}
            rightIcon={<Icon
                color="#f50"
                name="delete"
                onPress={()=>this.deletewidget(widget.id)}/>}
            subtitle={widget.description}
            title={widget.title}
            />))}

          <ButtonGroup
              onPress={this.selectWidgetType}
              selectedIndex={this.state.selectedWidgetTypeIndex}
              buttons={widegtTypes}
              containerStyle={{height: 75}}/>
          )

          <Button    backgroundColor="blue"
                     color="white"
                     title="create"
                     onPress={()=>this.createwidget()}/>
      </View>
    )
  }
}
export default WidgetList
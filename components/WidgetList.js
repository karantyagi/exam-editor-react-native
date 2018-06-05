import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Icon, ButtonGroup, Divider } from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
        topicId: 0,
        typeWidget: 'Assignment',
        selectedWidgetTypeIndex: 0,
        widgets: [],
        lessonId: 1,
        courseId: 1,
        moduleId: 1
    }

      this.selectWidgetType = this.selectWidgetType.bind(this);
      this.deleteExam = this.deleteExam.bind(this);
      this.deleteAssignment = this.deleteAssignment.bind(this);
  }


  deleteAssignment = (aId) => {

      alert("Deleted Assignment ID " + aId);

      fetch("https://kt-course-manager-server.herokuapp.com/api/assignment/"+aId,
          {
              method: 'DELETE'
          })
          .then(response => (response))
          .catch((error)=>{
              alert(error.message);
          });

      this.props.navigation
          .navigate("WidgetList", {topicId: this.state.topicId, typeWidget: 'Assignment'})

  }

    deleteExam = (examId) => {

        alert(" Deleted Exam ID:" + examId);

        fetch("https://kt-course-manager-server.herokuapp.com/api/exam/"+examId,
            {
                method: 'DELETE'
            })
            .then(response => (response))
            .catch((error)=>{
                alert(error.message);
            });

        this.props.navigation
            .navigate("WidgetList", {topicId: this.state.topicId, typeWidget: 'Exam'})

    }


    selectWidgetType = (newWidgetTypeIndex) => {
      if(newWidgetTypeIndex == 0){
          fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+this.state.topicId+"/assignment")
              .then(response => (response.json()))
              .then(widgets => this.setState({widgets}))
              .catch((error)=>{
                  alert(error.message);
              });
      }
      else{
          fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+this.state.topicId+"/exam")
              .then(response => (response.json()))
              .then(widgets => this.setState({widgets}))
              .catch((error)=>{
                  alert(error.message);
              });
      }

        this.setState({
            selectedWidgetTypeIndex: newWidgetTypeIndex
        })
    }


  componentDidMount() {
    const {navigation} = this.props;
    const topicId = navigation.getParam("topicId");
      const typeWidget = navigation.getParam("typeWidget");
      this.setState({
          topicId: topicId,
          typeWidget: typeWidget
      })

      if(typeWidget === 'Assignment'){
    fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+topicId+"/assignment")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))
        .catch((error)=>{
            alert(error.message);
        });
      }
      else{
          fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+topicId+"/exam")
              .then(response => (response.json()))
              .then(widgets => this.setState({widgets}))
              .catch((error)=>{
                  alert(error.message);
              });
      }
  }

  componentWillReceiveProps(newProps)
  {
      //alert("I just got fired !")

      // RELOAD LIST AGAIN

      const {navigation} = newProps;
      const topicId = navigation.getParam("topicId");
      const typeWidget = navigation.getParam("typeWidget");
      this.setState({
          topicId: topicId,
          typeWidget: typeWidget
      })

      if(typeWidget === 'Assignment'){
          fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+topicId+"/assignment")
              .then(response => (response.json()))
              .then(widgets => this.setState({widgets}))
              .catch((error)=>{
                  alert(error.message);
              });
      }
      else{
          fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+topicId+"/exam")
              .then(response => (response.json()))
              .then(widgets => this.setState({widgets}))
              .catch((error)=>{
                  alert(error.message);
              });
      }
  }

  render() {

      const widgetTypes = [
          'Assignments',
          'Exams']

    return(
        <View style={{padding: 15}}>

            <ButtonGroup
                style={{alignItems: 'center', textAlign: 'center'}}
                onPress={this.selectWidgetType}
                selectedIndex={this.state.selectedWidgetTypeIndex}
                buttons={widgetTypes}
                containerStyle={{height: 50}}/>

            {/*<Text> Print here: {this.state.selectedWidgetTypeIndex}</Text>*/}

            <Text>{'\n'}</Text>

            {/*{this.state.selectedWidgetTypeIndex == 0 && this.state.widgets.map(*/}
                {/*(widget, index) => (*/}
                    {/*<ListItem*/}
                        {/*onPress={() => this.props.navigation*/}
                            {/*.navigate("AssignmentList", {examId: widget.id})}*/}
                        {/*key={index}*/}
                        {/*subtitle={widget.description}*/}
                        {/*title={widget.title}/>))}*/}

            {this.state.selectedWidgetTypeIndex == 0 &&
            this.state.widgets.filter(widget => {return widget.widgetType !== 'Exam' })
                .map(
                    (widget, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("AssignmentList", {examId: widget.id})}
                            key={index}
                            subtitle={widget.description}
                            title={widget.title}
                            rightIcon={
                                <Icon
                                    key={'k'+index.toString()}
                                    name={'times'}
                                    size={20}
                                    type='font-awesome'
                                    raised
                                    color={'#f50'}
                                    // onPress={() => alert('Delete assignment/widget ?? by ID: '+widget.id)}
                                    onPress={() => this.deleteAssignment(widget.id)}
                                />}
                            />
                    ))}


      {this.state.selectedWidgetTypeIndex == 1 &&
      this.state.widgets.filter(widget => {return widget.widgetType !== 'Assignment' }).map(
        (widget, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("QuestionList", {examId: widget.id})}
            key={index}
            subtitle={widget.description}
            title={widget.title}
            rightIcon={
                <Icon
                    key={'k'+index.toString()}
                    name={'times'}
                    size={20}
                    type='font-awesome'
                    raised
                    color={'#f50'}
                    onPress={() => this.deleteExam(widget.id)}
                />}
          />))}



            <Text>{'\n'}</Text>
            <Icon
                raised
                // color='#f50'
                color='#2fa300' //: Green
                name='plus'
                type='font-awesome'
                onPress={() =>{
                    if(this.state.selectedWidgetTypeIndex == 0){
                        // Alert.alert('Navigate to ADD ASSIGNMENT WIDGET SCREEN, and add new Assignment to DB');
                        this.props.navigation
                            .navigate("Assignment", {topicId: this.state.topicId })
                    }
                    else{
                        Alert.alert('Navigate to ADD NEW EXAM SCREEN , and add new exam to DB with Qs');
                    }
                }}/>
            <Text style={{fontSize: 18, color: '#2fa300'}}>
                Add {this.state.selectedWidgetTypeIndex == 0 && <Text>Assignment</Text>}
                {this.state.selectedWidgetTypeIndex == 1 && <Text>Exam</Text>}
            </Text>

      </View>
    )
  }
}
export default WidgetList
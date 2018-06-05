import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Icon, ButtonGroup, Divider } from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
        selectedWidgetTypeIndex: 0,
        widgets: [],
        lessonId: 1,
        courseId: 1,
        moduleId: 1
    }

      this.selectWidgetType = this.selectWidgetType.bind(this);
  }

    selectWidgetType = (newWidgetTypeIndex) => {
        this.setState({
            selectedWidgetTypeIndex: newWidgetTypeIndex
        })
    }


  componentDidMount() {
    const {navigation} = this.props;
    const topicId = navigation.getParam("topicId")
    fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+topicId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))
        .catch((error)=>{
            alert(error.message);
        });
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

            {this.state.selectedWidgetTypeIndex == 0 && this.state.widgets.map(
                (widget, index) => (
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("AssignmentList", {examId: widget.id})}
                        key={index}
                        subtitle={widget.description}
                        title={widget.title}/>))}


      {this.state.selectedWidgetTypeIndex == 1 && this.state.widgets.map(
        (widget, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("QuestionList", {examId: widget.id})}
            key={index}
            subtitle={widget.description}
            title={widget.title}/>))}
            <Text>{'\n'}</Text>
            <Icon
                raised
                // color='#f50'
                color='#2fa300' //: Green
                name='plus'
                type='font-awesome'
                onPress={() =>{
                    if(this.state.selectedWidgetTypeIndex == 0){
                        Alert.alert('Navigate to ADD ASSIGNMENT WIDGET SCREEN, and add new Assignment to DB');
                    }
                    else{
                        Alert.alert('Navigate to ADD NEW EXAM SCREEN , and add new exam to DB with Qs');
                    }
                }}/>
            <Text style={{fontSize: 18, color: '#2fa300'}}>
                Add new {this.state.selectedWidgetTypeIndex == 0 && <Text>assignment</Text>}
                {this.state.selectedWidgetTypeIndex == 1 && <Text>exam</Text>}
            </Text>

      </View>
    )
  }
}
export default WidgetList
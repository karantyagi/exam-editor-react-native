import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class AssignmentList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            lessonId: 1,
            courseId: 1,
            moduleId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        // fetch("http://10.110.46.93:8080/api/topic/"+topicId+"/widget")
        //     .then(response => (response.json()))
        //     .then(widgets => this.setState({widgets}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                <Text h2> {'\n'} Assignment List here </Text>

                {/*{this.state.widgets.map(*/}
                    {/*(widget, index) => (*/}
                        {/*<ListItem*/}
                            {/*onPress={() => this.props.navigation*/}
                                {/*.navigate("QuestionList", {examId: widget.id})}*/}
                            {/*key={index}*/}
                            {/*subtitle={widget.description}*/}
                            {/*title={widget.title}/>))}*/}
            </View>
        )
    }
}
export default AssignmentList
import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'


class TopicList extends Component {
    static navigationOptions = {title: 'Topics'}
    constructor(props) {
        super(props)
        this.state = {
            topics: [],
            lessonId: 1,
            courseId: 1,
            moduleId: 1
        }

    }



    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        fetch("https://kt-course-manager-server.herokuapp.com/api/course/"+courseId+"/module/"+moduleId+"/lesson/"+lessonId+"/topic")
            .then(response => (response.json()))
            .then(topics => this.setState({topics}))
            .catch((error)=>{
                alert(error.message);
            });
    }
    render() {

        return(

            <View style={{padding: 15}}>
                {this.state.topics.map(
                    (topic, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {topicId: topic.id, typeWidget: 'Assignment'})}
                            key={index}
                            title={topic.title}/>))}

            </View>



        )
    }
}
export default TopicList
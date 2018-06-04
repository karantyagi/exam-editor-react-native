import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends Component {
    static navigationOptions = {title: 'Courses'}
    constructor(props) {
        super(props);

        // REPLACE WITH HEROKU SERVER
        fetch('http://10.110.46.93:8080/api/course')
            .then(response => {
                // alert(response);
                return (response.json());
            })
            .then(courses => {
                this.setState({courses: courses})
            }).catch((error)=>{
            alert(error.message);
        });

        this.state = { courses: [] }
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.courses.map((course, index) => (
                    <ListItem
                        onPress={() => this.props.
                        navigation.navigate("ModuleList",
                            {courseId: course.id})}
                        title={course.title}
                        key={index}/>
                ))}
            </View>
        )
    }
}
export default CourseList
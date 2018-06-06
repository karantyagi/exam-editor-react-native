import React from 'react'
import {View , Switch, ScrollView, TextInput} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'

class AssignmentEditor extends React.Component {
    static navigationOptions = { title: "Assignment Editor"}
    constructor(props) {
        super(props)
        this.state =
            {
                assignmentId: 1,
                assignment:
                    {
                        title: '',
                        description: '',
                        points: ''
                    },
                topicId: 1
            }

        // this.updateAssignment = this.updateAssignment.bind(this);

    }


    updateForm(newState) {
        this.setState(newState)
    }


    componentDidMount() {
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId");
        const topicId = navigation.getParam("topicId");
        this.setState({
            assignmentId: assignmentId,
            topicId: topicId
        })

        fetch("https://kt-course-manager-server.herokuapp.com/api/assignment/"+assignmentId)
            .then(response => (response.json()))
            // .then((questions) => {alert("Fetched" + questions.length);})
            .then(assignment => this.setState({assignment}))
            .catch((error)=>{
                alert(error.message);
            });

    }

    render(){
        return(

            <View>
                <View>
                    <Text> Topic ID: {this.state.topicId} </Text>
                    <FormLabel>Assignment ID: {this.state.assignmentId}</FormLabel>
                </View>


                <View style={{ marginTop:20}} >
                    <Button	backgroundColor="green"
                               color="white"
                               title="Update"
                               borderRadius={10}
                               borderWidth={2}
                               onPress={() => {}}
                    />

                </View>

                <View style={{ marginTop:10, marginBottom:30}}>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"
                               borderRadius={10}
                               borderWidth={2}
                               onPress={() => {
                                   this.props.navigation
                                       .navigate("WidgetList", {topicId: this.state.topicId, typeWidget: 'Assignment'})
                               }}
                    />

                </View>



            </View>
        );
    }
}

export default AssignmentEditor
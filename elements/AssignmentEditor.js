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

        this.updateAssignment = this.updateAssignment.bind(this);

    }

    updateAssignment = () => {

        if (this.state.assignment.title == "" ||
            this.state.assignment.points == "" ||
            this.state.assignment.description == "") {
            alert("Some fields are empty !")
        }
        else {


            alert("Assignment updated Successfully !\n\nTitle: " + this.state.assignment.title + "\n" +
                "Desc: "+this.state.assignment.description+"\n"+
                "Points: "+this.state.assignment.points);

            fetch("https://kt-course-manager-server.herokuapp.com/api/assignment/"+this.state.assignmentId,
                {
                    body: JSON.stringify({
                        title: this.state.assignment.title,
                        description: this.state.assignment.description,
                        points: parseInt(this.state.assignment.points.toString()),
                        widgetOrder: this.state.assignment.widgetOrder,
                        widgetType: this.state.assignment.widgetType
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'PUT'
                })
                .then(response => (response.json()))
                .catch((error)=>{
                    alert(error.message);
                });

            this.props.navigation
                .navigate("WidgetList", {topicId: this.state.topicId, typeWidget: 'Assignment'})

        }
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

                <FormLabel>Assignment Title</FormLabel>
                <FormInput
                    placeholder='Assignment title'
                    value={this.state.assignment.title}
                    onChangeText={
                        text => this.updateForm(
                            {assignment:
                                    {
                                        title: text,
                                        description: this.state.assignment.description,
                                        points:this.state.assignment.points,
                                        widgetOrder: this.state.assignment.widgetOrder,
                                        widgetType: this.state.assignment.widgetType
                                    }
                            })
                    }/>

                {this.state.assignment.title === "" &&
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>}

                <FormLabel>Description</FormLabel>
                <FormInput
                    value={this.state.assignment.description}
                    placeholder='Assignment Description'
                    onChangeText={
                        text => this.updateForm(
                            {assignment:
                                    {
                                        title: this.state.assignment.title,
                                        description: text,
                                        points:this.state.assignment.points,
                                        widgetOrder: this.state.assignment.widgetOrder,
                                        widgetType: this.state.assignment.widgetType
                                    }
                            })
                    }/>
                {this.state.assignment.description === "" &&
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>}



                <FormLabel>Points</FormLabel>
                <FormInput
                    placeholder='Enter points for Assignment'
                    value={this.state.assignment.points.toString()}
                    onChangeText={
                        text => this.updateForm(
                            {assignment:
                                    {
                                        title: this.state.assignment.title,
                                        description: this.state.assignment.description,
                                        points: text,
                                        widgetOrder: this.state.assignment.widgetOrder,
                                        widgetType: this.state.assignment.widgetType
                                    }

                            })
                    }/>
                {this.state.assignment.points.toString() == "" &&
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>}


                <View style={{ marginTop:20}} >
                    <Button	backgroundColor="blue"
                               color="white"
                               title="Update"
                               borderRadius={10}
                               borderWidth={2}
                               onPress={this.updateAssignment}
                    />

                </View>

                <View style={{ marginTop:10, marginBottom:30}}>
                    <Button	backgroundColor="gray"
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
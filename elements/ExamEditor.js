import React from 'react'
import {View , Switch, ScrollView, TextInput} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'

class ExamEditor extends React.Component {
    static navigationOptions = { title: "Exam Editor"}
    constructor(props) {
        super(props)
        this.state =
            {
                examId: 1,
                topicId: 1,
                exam:
                    {
                        title: '',
                        description: ''
                    }
            }

            this.updateExam = this.updateExam.bind(this);

    }

    updateExam = () => {

        if (this.state.exam.title == "" ||
            this.state.exam.description == "") {
            alert("Some fields are empty !")
        }
        else {


            alert("Exam updated Successfully !\n\nTitle: " + this.state.exam.title + "\n" +
                "Desc: " + this.state.exam.description);

            fetch("https://kt-course-manager-server.herokuapp.com/api/exam/"+this.state.examId,
                {
                    body: JSON.stringify({
                        title: this.state.exam.title,
                        description: this.state.exam.description,
                        widgetOrder: this.state.exam.widgetOrder,
                        widgetType: this.state.exam.widgetType
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'PUT'
                })
                .then(response => (response.json()))
                .catch((error)=>{
                    alert(error.message);
                });

            // OR THIS LINK ??

            this.props.navigation
                .navigate("WidgetList", {topicId: this.state.topicId, typeWidget: 'Exam'})

        }
    }

    updateForm(newState) {
        this.setState(newState)
    }


    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        const topicId = navigation.getParam("topicId")
        this.setState({
            examId: examId,
            topicId : topicId
        })

        fetch("https://kt-course-manager-server.herokuapp.com/api/exam/"+examId)
            .then(response => (response.json()))
            // .then((questions) => {alert("Fetched" + questions.length);})
            .then(exam => this.setState({exam}))
            .catch((error)=>{
                alert(error.message);
            });

    }

    render(){
    return(

        <View>
            <View>

                <FormLabel>Exam ID: {this.state.examId}</FormLabel>


                <FormLabel>Exam Title</FormLabel>
                <FormInput
                    value={this.state.exam.title}
                    onChangeText={
                        text => this.updateForm(
                            {exam:
                                    {
                                        title: text,
                                        description: this.state.exam.description,
                                        widgetOrder: this.state.exam.widgetOrder,
                                        widgetType: this.state.exam.widgetType
                                    }
                            })
                    }/>
                {this.state.exam.title == "" &&
                <FormValidationMessage>
                    Exam title cannot be empty
                </FormValidationMessage>}


                <FormLabel>Exam Description</FormLabel>
                <FormInput
                    value={this.state.exam.description}
                    onChangeText={
                        text => this.updateForm(
                            {exam:
                                    {
                                        title: this.state.exam.title,
                                        description: text,
                                        widgetOrder: this.state.exam.widgetOrder,
                                        widgetType: this.state.exam.widgetType
                                    }
                            })
                    }/>
                {this.state.exam.description == "" &&
                <FormValidationMessage>
                    Exam description is required
                </FormValidationMessage>}

            </View>


            <View style={{ marginTop:20}} >
                <Button	backgroundColor="blue"
                           color="white"
                           title="Update"
                           borderRadius={10}
                           borderWidth={2}
                           onPress={this.updateExam}
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
                                   .navigate("QuestionList", {examId: this.state.examId})
                           }}
                />

            </View>



        </View>
    );
    }
}

export default ExamEditor
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
                exam:
                    {
                        title: 'Old exam title',
                        description: 'old exam description'
                    }
            }

    }

    updateForm(newState) {
        this.setState(newState)
    }


    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        this.setState({
            examId: examId
        })
    }

    render(){
    return(

        <View>
            <View>

                <FormLabel>Exam ID: {this.state.examId} </FormLabel>


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
            </View>


            <View style={{ marginTop:20}} >
                <Button	backgroundColor="green"
                           color="white"
                           title="Update"
                           borderRadius={10}
                           borderWidth={2}
                           onPress={() => {alert("Update Exam title/description !")}}
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
                                   .navigate("QuestionList", {examId: this.state.examId})
                           }}
                />

            </View>



        </View>
    );
    }
}

export default ExamEditor
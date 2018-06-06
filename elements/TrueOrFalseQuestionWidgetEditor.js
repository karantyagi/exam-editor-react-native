import React from 'react'
import {View, Switch, ScrollView} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
    {label: 'True', value: 1 },
    {label: 'False', value: 0 }
];

class TrueOrFalseQuestionWidgetEditor extends React.Component {
    static navigationOptions = { title: "True-False Question Editor"}
    constructor(props) {
        super(props)
        this.state =
            {
                question: {
                    title: '',
                    description: '',
                    points: '',
                    isTrue: true,
                },
                examId: 1,
                preview: false
            }

        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        // this.updateForm = this.updateForm.bind(this);
    }

    toggleSwitch = () => {
        this.setState(state => ({
            preview: !state.preview,
        }));
    }

    addQuestion = () => {

        if (this.state.question.points === "" ||
            this.state.question.title === "" ||
            this.state.question.description === "") {
            alert("Some fields are empty !")
        }
        else {


            alert("Question Added Successfully !\n\nTitle: " + this.state.question.title + "\n" +
                "Desc: " + this.state.question.description + "\n" +
                "Points: " + this.state.question.points + "\n" +
                "Is true: " + this.state.question.isTrue);

            fetch("https://kt-course-manager-server.herokuapp.com/api/exam/"+this.state.examId+"/truefalse",
                {
                    body: JSON.stringify({
                        title: this.state.question.title,
                        description: this.state.question.description,
                        points: parseInt(this.state.question.points),
                        isTrue: this.state.question.isTrue,
                        subtitle: "True or False"
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST'
                })
                .then(response => (response.json()))
                .catch((error)=>{
                    alert(error.message);
                });

            this.props.navigation
                .navigate("QuestionList", {examId: this.state.examId})

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

    render() {
        return(
            <ScrollView>
                <View style={{padding:15}}>
                    <Text h4 style={{textAlign: 'center',color: 'gray' }}>
                        Add True-False Question</Text>
                    <Text style={{textAlign: 'center',color: 'gray' }}>
                        Exam ID : {this.state.examId}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 20, paddingTop: 15}}>
                        <Switch
                            value = {this.state.preview}
                            onValueChange={this.toggleSwitch}
                            style={{marginBottom: 4}}/>
                        <Text style={{paddingTop: 3, color: 'gray', fontSize: 16 }}>
                            {this.state.preview ? 'Preview On' : 'Preview Off'}
                        </Text>
                    </View>

                    {!this.state.preview &&
                    <View>

                        <FormLabel>Title</FormLabel>
                        <FormInput
                            placeholder='Question title'
                            value={this.state.question.title}
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: text,
                                                description: this.state.question.description,
                                                points: this.state.question.points,
                                                isTrue: this.state.question.isTrue
                                            }
                                    })
                            }/>

                        {this.state.question.title === "" &&
                        <FormValidationMessage>
                            Title is required
                        </FormValidationMessage>}

                        <FormLabel>Description</FormLabel>
                        <FormInput
                            value={this.state.question.description}
                            placeholder='Question Description'
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: this.state.question.title,
                                                description: text,
                                                points: this.state.question.points,
                                                isTrue: this.state.question.isTrue
                                            }
                                    })
                            }/>
                        {this.state.question.description === "" &&
                        <FormValidationMessage>
                            Description is required
                        </FormValidationMessage>}



                        <FormLabel>Points</FormLabel>
                        <FormInput
                            placeholder='Enter points for Question'
                            value={this.state.question.points}
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: this.state.question.title,
                                                description: this.state.question.description,
                                                points: text,
                                                isTrue: this.state.question.isTrue
                                            }
                                    })
                            }/>
                        {this.state.question.points === "" &&
                        <FormValidationMessage>
                            Points are required
                        </FormValidationMessage>}




                        <CheckBox onPress={() => this.updateForm({
                            question:
                                {
                                    title: this.state.question.title,
                                    description: this.state.question.description,
                                    points: this.state.question.points,
                                    isTrue: !this.state.question.isTrue
                                }})}
                                  checked={this.state.question.isTrue} title='The answer is true'/>


                        <View style={{ marginTop:20}} >
                            <Button	backgroundColor="green"
                                       color="white"
                                       title="Save"
                                       borderRadius={10}
                                       borderWidth={2}
                                       onPress={this.addQuestion}
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
                                       }}/>

                        </View>
                    </View>}

                    {this.state.preview &&
                    <View>
                        {/*<View>*/}
                        {/*<Text h4 style={{textAlign: 'center', }}>Preview</Text>*/}
                        {/*</View>*/}
                        <View style={{padding:2}}>
                            <Text style={{fontWeight: "bold",fontSize: 28,padding: 2}}>
                                {this.state.question.title} - True or False
                            </Text>
                            <Text style={{fontWeight: "bold",color: 'gray', fontSize: 20,padding: 2}}>{this.state.question.points} pts</Text>
                            <Text style={{fontSize: 19, padding: 5}} >{this.state.question.description}</Text>
                        </View>
                        <View style={{marginLeft :10, alignItems:'flex-start'}}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                // buttonColor={'#50C900'}
                                onPress={() => {}}
                            />
                        </View>
                        <View style={{ marginTop:20}} >
                            <Button	backgroundColor="blue"
                                       color="white"
                                       title="Submit"
                                       borderRadius={10}
                                       borderWidth={2}
                                       onPush={()=> {}}
                            />

                        </View>

                        <View style={{ marginTop:10, marginBottom:30}}>
                            <Button	backgroundColor="red"
                                       color="white"
                                       title="Cancel"
                                       borderRadius={10}
                                       borderWidth={2}
                                       onPush={()=> {}}
                            />
                        </View>
                    </View>}

                </View>
            </ScrollView>
        )
    }
}

export default TrueOrFalseQuestionWidgetEditor
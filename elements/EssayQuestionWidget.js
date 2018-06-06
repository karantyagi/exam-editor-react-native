import React from 'react'
import {View , Switch, ScrollView, TextInput} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'

class EssayQuestionWidget extends React.Component {
    static navigationOptions = { title: "Essay Question"}
    constructor(props) {
        super(props)
        this.state =
            {
                question: {
                    title: '',
                    description: '',
                    points: ''
                },
                examId: 1,
                preview: false
            }

        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
    }

    updateForm(newState) {
        this.setState(newState)
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
                "Points: " + this.state.question.points);

            fetch("https://kt-course-manager-server.herokuapp.com/api/exam/"+this.state.examId+"/essay",
                {
                    body: JSON.stringify({
                        title: this.state.question.title,
                        description: this.state.question.description,
                        points: parseInt(this.state.question.points),
                        subtitle: "Essay"
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
                    Add Essay Question</Text>
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
                                            points: this.state.question.points
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
                        placeholder='Essay Question Description'
                        onChangeText={
                            text => this.updateForm(
                                {question:
                                        {
                                            title: this.state.question.title,
                                            description: text,
                                            points: this.state.question.points
                                        }
                                })
                        }/>
                    {this.state.question.description === "" &&
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>}



                    <FormLabel>Points</FormLabel>
                    <FormInput
                        placeholder='Enter points for Essay Question'
                        value={this.state.question.points}
                        onChangeText={
                            text => this.updateForm(
                                {question:
                                        {
                                            title: this.state.question.title,
                                            description: this.state.question.description,
                                            points: text
                                        }
                                })
                        }/>
                    {this.state.question.points === "" &&
                    <FormValidationMessage>
                        Points are required
                    </FormValidationMessage>}




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
                    <View style={{padding:2}}>
                        <Text style={{fontWeight: "bold",fontSize: 28,padding: 2}}>
                            {this.state.question.title} - Essay Question
                        </Text>
                        <Text style={{fontWeight: "bold",color: 'gray', fontSize: 20,padding: 2}}>{this.state.question.points} pts</Text>
                        <Text style={{fontSize: 19, padding: 5}} >{this.state.question.description}</Text>
                    </View>
                    <View style={{marginRight:15, marginLeft:15, paddingRight: 5, paddingBottom:5}}>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            editable = {true}
                            maxLength = {40}
                            onChangeText={() => {}}
                            placeholder=
                                {
                                    'This would be an empty textarea where students can answer the essay' +
                                    ' question. The textarea should be atleast 5 rows high, take the entire ' +
                                    'width of container, and be resizeable from bottom right corner.'}
                            // value={this.state.text}
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

export default EssayQuestionWidget
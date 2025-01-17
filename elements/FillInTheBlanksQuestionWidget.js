import React from 'react'
import {View , Switch, TextInput} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'

class FillInTheBlanksQuestionWidget extends React.Component {
    static navigationOptions = { title: "Fill in Blank Question"}
    constructor(props) {
        super(props)
        this.state =
            {
                question: {
                    title: '',
                    description: '',
                    points: '',
                    blank: ''
                },
                examId: 1,
                preview: false
            }
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.parseDescription = this.parseDescription.bind(this);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    toggleSwitch = () => {
        this.setState(state => ({
            preview: !state.preview,
        }));
    }

    parseDescription = (text) => {

        let blank = text.substring(text.indexOf('['),text.indexOf(']')+1);
        return blank;

    }

    addQuestion = () => {

        if (this.state.question.points === "" ||
            this.state.question.title === "" ||
            this.state.question.blank === "" ||
            this.state.question.description === "") {
            alert("Some fields are empty !")
        }
        else {


            alert("Question Added Successfully !\n\nTitle: " + this.state.question.title + "\n" +
                "Desc: " + this.state.question.description + "\n" +
                "Points: " + this.state.question.points + "\n" +
                "blank: " + this.state.question.blank);

            fetch("https://kt-course-manager-server.herokuapp.com/api/exam/"+this.state.examId+"/blanks",
                {
                    body: JSON.stringify({
                        title: this.state.question.title,
                        description: this.state.question.description,
                        points: parseInt(this.state.question.points),
                        blank: this.state.question.blank,
                        subtitle: "Fill in the blanks"
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
            <View style={{padding:15}}>
                <Text h4 style={{textAlign: 'center',color: 'gray' }}>
                    Add Fill in Blank Question</Text>
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
                                            blank: this.state.question.blank
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
                                            blank: this.parseDescription(text)
                                        }
                                })
                        }/>
                    {this.state.question.description === "" &&
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage>}

                    <View style={{marginTop:8, marginLeft :20}}>
                        <Text style={{color:'gray'}}> Blank variable: {this.state.question.blank}</Text>
                    </View>



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
                                            blank: this.state.question.blank
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
                    {/*<View>*/}
                    {/*<Text h4 style={{textAlign: 'center', }}>Preview</Text>*/}
                    {/*</View>*/}
                    <View style={{padding:2}}>
                        <Text style={{fontWeight: "bold",fontSize: 28,padding: 2}}>
                            {this.state.question.title} - Fill in the Blank
                        </Text>
                        <Text style={{fontWeight: "bold",color: 'gray', fontSize: 20,padding: 2}}>{this.state.question.points} pts</Text>

                    </View>
                    <View style={{marginLeft :10}}>

                        <Text style={{fontSize: 19, padding: 5}} >
                            {this.state.question.description.substring
                            (0,this.state.question.description.indexOf(this.state.question.blank))}
                            </Text>
                        <TextInput
                        style={{width:120}}>
                        </TextInput>
                        <Text style={{fontSize: 19, padding: 5}} >
                            {this.state.question.description.substring
                            (this.state.question.description.indexOf(']')+1)}
                        </Text>

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
        )
    }
}

export default FillInTheBlanksQuestionWidget
import React from 'react'
import {View , Switch, ScrollView} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


class MultipleChoiceQuestionWidgetEditor extends React.Component {
    static navigationOptions = { title: "Multiple Choice Question Editor"}
    constructor(props) {
        super(props)
        this.state =
            {
                questionId: 0,
                question: {
                    title: '',
                    description: '',
                    points: '',
                    correctChoice: 'A',
                    choiceA: '',
                    choiceB: '',
                    choiceC: '',
                    choiceD: ''
                },
                examId: 1,
                preview: false
            }

        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);

    }

    updateForm(newState) {
        this.setState(newState)
    }

    toggleSwitch = () => {
        this.setState(state => ({
            preview: !state.preview,
        }));
    }


    updateQuestion = () => {

        if (this.state.question.points === "" ||
            this.state.question.choiceA === "" ||
            this.state.question.choiceB  === "" ||
            this.state.question.choiceC  === "" ||
            this.state.question.choiceD  === "" ||
            this.state.question.title === "" ||
            this.state.question.description === "") {
            alert("Some fields are empty !")
        }
        else {


            alert("Question Added Successfully !\n\nTitle: " + this.state.question.title + "\n" +
                "Desc: " + this.state.question.description + "\n" +
                "Points: " + this.state.question.points + "\n" +
                "OptionA: " + this.state.question.choiceA + "\n" +
                "OptionA: " + this.state.question.choiceB + "\n" +
                "OptionA: " + this.state.question.choiceC + "\n" +
                "OptionA: " + this.state.question.choiceD + "\n" +
                "Correct Answer: " + this.state.question.correctChoice );

            fetch("https://kt-course-manager-server.herokuapp.com/api/question/"+this.state.questionId+"/choice",
                {
                    body: JSON.stringify({
                        title: this.state.question.title,
                        description: this.state.question.description,
                        points: parseInt(this.state.question.points.toString()),
                        choiceA: this.state.question.choiceA,
                        choiceB: this.state.question.choiceB,
                        choiceC: this.state.question.choiceC,
                        choiceD: this.state.question.choiceD,
                        correctChoice: this.state.question.correctChoice,
                        subtitle: "Multiple choice"
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'PUT'
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
        const examId = navigation.getParam("examId");
        const questionId = navigation.getParam("questionId");
        this.setState({
            examId: examId,
            questionId: questionId
        })

        fetch("https://kt-course-manager-server.herokuapp.com/api/question/"+questionId)
            .then(response => (response.json()))
            // .then((questions) => {alert("Fetched" + questions.length);})
            .then(question => this.setState({question}))
            .catch((error)=>{
                alert(error.message);
            });
    }

    render() {
        return(
            <ScrollView>
                <View style={{padding:15}}>
                    <View>
                    <Text h4 style={{textAlign: 'center',color: 'gray' }}>
                        Update Multiple Choice Question</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 20, paddingTop: 15}}>
                        <Switch
                            value = {this.state.preview}
                            onValueChange={this.toggleSwitch}
                            style={{marginBottom: 4}}/>
                        <Text style={{paddingTop: 3, color: 'gray', fontSize: 16 }}>
                            {this.state.preview ? 'Preview' : 'Edit Mode'}
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
                                                choiceA: this.state.question.choiceA,
                                                choiceB: this.state.question.choiceB,
                                                choiceC: this.state.question.choiceC,
                                                choiceD: this.state.question.choiceD,
                                                correctChoice: this.state.question.correctChoice
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
                                                choiceA: this.state.question.choiceA,
                                                choiceB: this.state.question.choiceB,
                                                choiceC: this.state.question.choiceC,
                                                choiceD: this.state.question.choiceD,
                                                correctChoice: this.state.question.correctChoice
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
                            value={this.state.question.points.toString()}
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: this.state.question.title,
                                                description: this.state.question.description,
                                                points: text,
                                                choiceA: this.state.question.choiceA,
                                                choiceB: this.state.question.choiceB,
                                                choiceC: this.state.question.choiceC,
                                                choiceD: this.state.question.choiceD,
                                                correctChoice: this.state.question.correctChoice
                                            }
                                    })
                            }/>
                        {this.state.question.points.toString() == "" &&
                        <FormValidationMessage>
                            Points are required
                        </FormValidationMessage>}


                        <FormLabel>Option A</FormLabel>
                        <FormInput
                            placeholder='Enter Option A for Question'
                            value={this.state.question.choiceA}
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: this.state.question.title,
                                                description: this.state.question.description,
                                                points: this.state.question.points,
                                                choiceA: text,
                                                choiceB: this.state.question.choiceB,
                                                choiceC: this.state.question.choiceC,
                                                choiceD: this.state.question.choiceD,
                                                correctChoice: this.state.question.correctChoice
                                            }
                                    })
                            }/>
                        {this.state.question.choiceA === "" &&
                        <FormValidationMessage>
                            Option A is required
                        </FormValidationMessage>}

                        <FormLabel>Option B</FormLabel>
                        <FormInput
                            placeholder='Enter Option B for Question'
                            value={this.state.question.choiceB}
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: this.state.question.title,
                                                description: this.state.question.description,
                                                points: this.state.question.points,
                                                choiceB: text,
                                                choiceA: this.state.question.choiceA,
                                                choiceC: this.state.question.choiceC,
                                                choiceD: this.state.question.choiceD,
                                                correctChoice: this.state.question.correctChoice
                                            }
                                    })
                            }/>
                        {this.state.question.choiceB === "" &&
                        <FormValidationMessage>
                            Option B is required
                        </FormValidationMessage>}


                        <FormLabel>Option C</FormLabel>
                        <FormInput
                            placeholder='Enter Option C for Question'
                            value={this.state.question.choiceC}
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: this.state.question.title,
                                                description: this.state.question.description,
                                                points: this.state.question.points,
                                                choiceC: text,
                                                choiceA: this.state.question.choiceA,
                                                choiceB: this.state.question.choiceB,
                                                choiceD: this.state.question.choiceD,
                                                correctChoice: this.state.question.correctChoice
                                            }
                                    })
                            }/>
                        {this.state.question.choiceC === "" &&
                        <FormValidationMessage>
                            Option C is required
                        </FormValidationMessage>}


                        <FormLabel>Option D</FormLabel>
                        <FormInput
                            placeholder='Enter Option D for Question'
                            value={this.state.question.choiceD}
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: this.state.question.title,
                                                description: this.state.question.description,
                                                points: this.state.question.points,
                                                choiceD: text,
                                                choiceA: this.state.question.choiceA,
                                                choiceC: this.state.question.choiceC,
                                                choiceB: this.state.question.choiceB,
                                                correctChoice: this.state.question.correctChoice
                                            }
                                    })
                            }/>
                        {this.state.question.choiceD === "" &&
                        <FormValidationMessage>
                            Option D is required
                        </FormValidationMessage>}


                        <FormLabel>Correct Option</FormLabel>
                        <FormInput
                            placeholder='Enter Correct Answer : A/B/C/D'
                            value={this.state.question.correctChoice}
                            onChangeText={
                                text => this.updateForm(
                                    {question:
                                            {
                                                title: this.state.question.title,
                                                description: this.state.question.description,
                                                points: this.state.question.points,
                                                choiceD: this.state.question.choiceD,
                                                choiceA: this.state.question.choiceA,
                                                choiceC: this.state.question.choiceC,
                                                choiceB: this.state.question.choiceB,
                                                correctChoice: text
                                            }
                                    })
                            }/>
                        {this.state.question.choiceD == "" &&
                        <FormValidationMessage>
                            Correct Answer is needed
                        </FormValidationMessage>}


                        {/*<View style={{marginTop:8, marginRight:15}}>*/}
                        {/*<Text style={{color:'gray'}}> Answer: {this.state.question.correctChoice}*/}
                        {/*</Text>*/}
                        {/*</View>*/}


                        <View style={{ marginTop:20}} >
                            <Button	backgroundColor="blue"
                                       color="white"
                                       title="Save"
                                       borderRadius={10}
                                       borderWidth={2}
                                       onPress={this.updateQuestion}
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
                                {this.state.question.title} - Multiple Choice
                            </Text>
                            <Text style={{fontWeight: "bold",color: 'gray', fontSize: 20,padding: 2}}>{this.state.question.points} pts</Text>
                            <Text style={{fontSize: 19, padding: 5}} >{this.state.question.description}</Text>
                        </View>

                        <View style={{marginLeft :10, marginTop:8, alignItems:'flex-start'}}>
                            <RadioForm
                                radio_props={[
                                    {label: 'A) '+ this.state.question.choiceA, value: 'A' },
                                    {label: 'B) '+ this.state.question.choiceB, value: 'B' },
                                    {label: 'C) '+ this.state.question.choiceC, value: 'C' },
                                    {label: 'D) '+ this.state.question.choiceD, value: 'D' }
                                ]}
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

export default MultipleChoiceQuestionWidgetEditor
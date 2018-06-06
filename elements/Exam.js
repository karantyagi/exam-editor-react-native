import React, {Component} from 'react'
import {View, Switch, TextInput, ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, Divider}
    from 'react-native-elements'


class Exam extends React.Component {
    static navigationOptions = { title: "Add Exam"}
    constructor(props) {
        super(props)
        this.state = {
            topicId: 0,
            preview: false,
            exam:
                {
                    title: '',
                    description: '',
                    widgetOrder: 1,
                    widgetType: 'Exam'
                }
        }

        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.addExam = this.addExam.bind(this);
    }

    toggleSwitch = () => {
        this.setState(state => ({
            preview: !state.preview,
        }));
    }

    updateForm(newState) {
        this.setState(newState)
    }

    addExam = () => {

        if( this.state.exam.title === "" ||
            this.state.exam.description === ""){
            alert("Some fields are empty !")
        }
        else{


            alert("Exam Added Successfully !\n\nTitle: "+this.state.exam.title+"\n"+
                "Desc: "+this.state.exam.description);

            // fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+this.state.topicId+"/exam",
            //     {
            //         body: JSON.stringify({
            //             title: this.state.assignment.title,
            //             description: this.state.assignment.description,
            //             widgetOrder: this.state.assignment.widgetOrder,
            //             widgetType: this.state.assignment.widgetType
            //         }),
            //         headers: { 'Content-Type': 'application/json' },
            //         method: 'POST'
            //     })
            //     .then(response => (response.json()))
            //     .catch((error)=>{
            //         alert(error.message);
            //     });

            this.props.navigation
                .navigate("WidgetList", {topicId: this.state.topicId, typeWidget: 'Exam'})
        }
    }


    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId");
        this.setState({
            topicId: topicId
        })
    }

    render() {
        return(
            <ScrollView>
                <View>
                    {/*{!this.state.preview &&*/}
                    {/*<View>*/}
                    {/*<Text>{'\n'}</Text>*/}
                    {/*<Text style={{textAlign: 'center',color: 'gray', fontSize: 17 }}>*/}
                    {/*Create new Assignment for Topic ID: {this.state.topicId}</Text>*/}
                    {/*</View>}*/}
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
                        <FormLabel>Exam Title</FormLabel>
                        <FormInput
                            placeholder='Assignment title'
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

                        {this.state.exam.title === "" &&
                        <FormValidationMessage>
                            Exam Title is required
                        </FormValidationMessage>}

                        <FormLabel>Exam Description</FormLabel>
                        <FormInput
                            value={this.state.exam.description}
                            placeholder='Short Exam Description'
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
                        {this.state.exam.description === "" &&
                        <FormValidationMessage>
                            Description is required
                        </FormValidationMessage>}

                        <FormLabel>
                            To add/edit questions to the exam,{'\n'}
                            or to edit/update exam title, description {'\n'}
                            navigate to exam list and click on exam.
                        </FormLabel>


                        <View style={{ marginTop:20}} >
                            <Button	backgroundColor="green"
                                       color="white"
                                       title="Save"
                                       borderRadius={10}
                                       borderWidth={2}
                                       onPress={this.addAssignment}
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
                                       }}/>

                        </View>

                    </View>}

                    {this.state.preview &&
                    <View>
                        {/*<Text style={{textAlign: 'center',color: 'gray', fontSize: 18 }}>Preview</Text>*/}
                        <View style={{paddingLeft:15}}>
                            <Text h3>
                                {this.state.assignment.title}</Text>
                        </View>
                        <View style={{paddingLeft:15}}>
                            <Text style={{fontSize: 16}}>
                                {this.state.assignment.description}</Text>
                        </View>
                        {this.state.assignment.points !== "" &&
                        <View style={{paddingLeft:15}}>
                            <Text
                                style={{fontSize: 18, fontWeight: 'bold'}}>
                                Points: {this.state.assignment.points} </Text>
                        </View>}

                        <FormLabel>
                            Essay Answer</FormLabel>
                        {/*<FormInput*/}
                        {/*// borderWidth={1}*/}
                        {/*// borderRadius={14}*/}
                        {/*/>*/}
                        <View style={{marginRight:15, marginLeft:15, paddingRight: 5, paddingBottom:5}}>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                editable = {true}
                                maxLength = {40}
                                onChangeText={() => {}}
                                placeholder=
                                    {
                                        'This would be an empty textarea where faculty can describe the' +
                                        ' assignment. The textarea should be atleast 5 rows high, take the entire ' +
                                        'width of container, and be resizeable from bottom right corner.'}
                                // value={this.state.text}
                            />
                        </View>


                        <FormLabel>Upload a file</FormLabel>
                        <FormInput
                            placeholder={'No file chosen'}/>

                        <FormLabel>
                            Submit a link</FormLabel>
                        <FormInput
                            placeholder={"enter a url"}/>

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

export default Exam
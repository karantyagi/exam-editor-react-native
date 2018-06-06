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
            //             title: this.state.exam.title,
            //             description: this.state.exam.description,
            //             widgetOrder: this.state.exam.widgetOrder,
            //             widgetType: this.state.exam.widgetType
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
                    {/*Create new Exam for Topic ID: {this.state.topicId}</Text>*/}
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
                            placeholder='Exam title'
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
                            Exam Description is required
                        </FormValidationMessage>}

                        <FormLabel>
                            To add/edit questions to the exam,or to edit/update exam{'\n'}
                            title, description navigate to exam list and click on exam.{'\n'}
                        </FormLabel>


                        <View style={{ marginTop:20}} >
                            <Button	backgroundColor="green"
                                       color="white"
                                       title="Save"
                                       borderRadius={10}
                                       borderWidth={2}
                                       onPress={this.addExam}
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
                                               .navigate("WidgetList", {topicId: this.state.topicId, typeWidget: 'Exam'})
                                       }}/>

                        </View>

                    </View>}

                    {this.state.preview &&
                    <View>
                        {/*<Text style={{textAlign: 'center',color: 'gray', fontSize: 18 }}>Preview</Text>*/}
                        <View style={{paddingLeft:15}}>
                            <Text h3>Title:
                                {this.state.exam.title}</Text>
                        </View>
                        <View style={{paddingLeft:15}}>
                            <Text style={{fontSize: 16}}>Description:
                                {this.state.exam.description}</Text>
                        </View>

                    </View>}
                </View>
            </ScrollView>
        )
    }
}

export default Exam
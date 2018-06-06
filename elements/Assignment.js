import React from 'react'
import {View, Switch, TextInput, ScrollView} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, Divider}
    from 'react-native-elements'

class Assignment extends React.Component {
    static navigationOptions = { title: "Add Assignment"}
    constructor(props) {
        super(props)
        this.state = {
            topicId: 0,
            preview: false,
            assignment:
                {
                    title: '',
                    description: '',
                    points: '',
                    widgetOrder: 1,
                    widgetType: 'Assignment'
                }
        }

        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.addAssignment = this.addAssignment.bind(this);
    }

    toggleSwitch = () => {
        this.setState(state => ({
            preview: !state.preview,
        }));
    }

    updateForm(newState) {
        this.setState(newState)
    }

    addAssignment = () => {

        if(this.state.assignment.points === "" ||
            this.state.assignment.title === "" ||
            this.state.assignment.description === ""){
            alert("Some fields are empty !")
        }
        else{


            alert("Assignment Added Successfully !\n\nTitle: "+this.state.assignment.title+"\n"+
                "Desc: "+this.state.assignment.description+"\n"+
                "Points: "+this.state.assignment.points);

            fetch("https://kt-course-manager-server.herokuapp.com/api/topic/"+this.state.topicId+"/assignment",
                {
                    body: JSON.stringify({
                        title: this.state.assignment.title,
                        description: this.state.assignment.description,
                        points: parseInt(this.state.assignment.points),
                        widgetOrder: this.state.assignment.widgetOrder,
                        widgetType: this.state.assignment.widgetType
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST'
                })
                .then(response => (response.json()))
                .catch((error)=>{
                    alert(error.message);
                });

            this.props.navigation
                .navigate("WidgetList", {topicId: this.state.topicId, typeWidget: 'Assignment'})
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
                        <FormLabel>Title</FormLabel>
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
                            value={this.state.assignment.points}
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
                        {this.state.assignment.points === "" &&
                        <FormValidationMessage>
                            Points are required
                        </FormValidationMessage>}

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

export default Assignment
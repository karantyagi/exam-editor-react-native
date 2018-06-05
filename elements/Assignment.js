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
            title: '',
            description: '',
            points: 0,
            isTrue: true,
            topicId: 0,
            preview: false
        }

        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    toggleSwitch = () => {
        this.setState(state => ({
            preview: !state.preview,
        }));
    }

    updateForm(newState) {
        this.setState(newState)
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

                    <Text>{'\n'}</Text>
                    <Text style={{textAlign: 'center',color: 'gray', fontSize: 17 }}>
                        Create new Assignment for Topic ID: {this.state.topicId}</Text>

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
                            placeholder='Assignment title ...'
                            onChangeText={
                                text => this.updateForm({title: text})
                            }/>
                        <FormValidationMessage>
                            Title is required
                        </FormValidationMessage>

                        <FormLabel>Description</FormLabel>
                        <FormInput
                            placeholder='Assignment Description'
                            onChangeText={
                                text => this.updateForm({description: text})
                            }/>
                        <FormValidationMessage>
                            Description is required
                        </FormValidationMessage>

                        <FormLabel>Points</FormLabel>
                        <FormInput
                            placeholder='Enter points for Assignment'
                            onChangeText={
                                text => this.updateForm({points: text})
                            }/>
                        <FormValidationMessage>
                            Points are required
                        </FormValidationMessage>
                        <Text> Points: {this.state.points}</Text>

                        <View style={{ marginTop:20}} >
                            <Button	backgroundColor="green"
                                       color="white"
                                       title="Save"
                                       borderRadius={10}
                                       borderWidth={2}/>

                        </View>

                        <View style={{ marginTop:10, marginBottom:30}}>
                            <Button	backgroundColor="red"
                                       color="white"
                                       title="Cancel"
                                       borderRadius={10}
                                       borderWidth={2}                        />

                        </View>

                    </View>}

                    {this.state.preview &&
                    <View>
                        {/*<Text style={{textAlign: 'center',color: 'gray', fontSize: 18 }}>Preview</Text>*/}
                        <Text style={{padding: 10, fontSize: 18}}>Assignment ORDER - TITLE     POINTS?{this.state.title}</Text>
                        <Text style={{padding: 10, fontSize: 15}} >Description para : {this.state.description}</Text>
                        <Text  style={{padding: 10, fontSize: 15}}> Points: {this.state.points}</Text>

                        <FormLabel
                            style={{fontSize: 15, fontWeight: 'bold', color: 'gray'}}>
                            Essay Answer</FormLabel>
                        <FormInput
                            multiline={true}
                            placeholder={'This would be an empty textarea where students can answer the essay question.' +
                            ' The textarea should be atleast 5 rows high, take the entire width of container, and be resizeable' +
                            'from bottom right corner.'}
                            numberOfLines={5}
                            // onChangeText={(text) => this.setState({text})}
                            // value={this.state.text}
                        />

                        <FormLabel
                            style={{fontSize: 15, fontWeight: 'bold', color: 'gray'}}>
                            Upload a file</FormLabel>
                        <FormInput
                            placeholder={'No file chosen'}/>

                        <FormLabel
                            style={{fontSize: 15, fontWeight: 'bold', color: 'gray'}}>
                            Submit a link</FormLabel>
                        <FormInput/>

                        <View style={{ marginTop:20}} >
                            <Button	backgroundColor="blue"
                                       color="white"
                                       title="Submit"
                                       borderRadius={10}
                                       borderWidth={2}/>

                        </View>

                        <View style={{ marginTop:10, marginBottom:30}}>
                            <Button	backgroundColor="red"
                                       color="white"
                                       title="Cancel"
                                       borderRadius={10}
                                       borderWidth={2}/>
                        </View>
                    </View>}
                </View>
            </ScrollView>
        )
    }
}

export default Assignment
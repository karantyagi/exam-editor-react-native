import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'

class Assignment extends React.Component {
    static navigationOptions = { title: "Create New Assignment"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            isTrue: true,
            topicId: 0
        }
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
            <View>
                <Text h1 style={{textAlign: 'center',color: 'gray' }}>Add Assignment</Text>

                <FormLabel>Title</FormLabel>
                <FormInput
                    placeholder='Question title ...'
                    onChangeText={
                        text => this.updateForm({title: text})
                    }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput
                    placeholder='Question...'
                    onChangeText={
                        text => this.updateForm({description: text})
                    }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput
                    placeholder='Enter points for question'
                    onChangeText={
                        text => this.updateForm({points: text})
                    }/>
                <FormValidationMessage>
                    Points are required
                </FormValidationMessage>
                <Text> Points: {this.state.points}</Text>

                <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue} title='The answer is true'/>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h4 style={{textAlign: 'center',color: 'gray' }}>{'\n'}Preview</Text>
                <Text h3 style={{padding: 15}}>{this.state.title}</Text>
                <Text style={{padding: 15}} >{this.state.description}</Text>

            </View>
        )
    }
}

export default Assignment
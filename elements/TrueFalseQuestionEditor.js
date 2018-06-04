import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'

class TrueFalseQuestionEditor extends React.Component {
    static navigationOptions = { title: "True False"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            isTrue: true
        }
    }

    updateForm(newState) {
        this.setState(newState)
    }

    render() {
        return(
            <View>
                <Text h4 style={{textAlign: 'center',color: 'gray' }}>Question Editor</Text>

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

export default TrueFalseQuestionEditor
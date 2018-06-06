import React from 'react'
import {Picker, Text, View} from 'react-native'

class QuestionTypePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionType: "MC"
        }
    }
    render() {
        return (
            <View style={{paddingLeft: 40}}>
                <Picker
                    style={{padding:20}}
                    onValueChange={(itemValue) =>
                        this.setState({questionType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="MC" label="Multiple Choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or False" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>
                <Text> {this.state.questionType}</Text>
            </View>
        )
    }
}

export default QuestionTypePicker
import React from 'react'
import {View} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'

class TrueFalseQuestion extends React.Component {
    static navigationOptions = { title: "True-False Question"}
    constructor(props) {
        super(props)
        this.state =
            {
                question: {
                    title: '',
                    description: '',
                    points: 0,
                    isTrue: true,
                },
                examId: 1
            }
    }

    updateForm(newState) {
        this.setState(newState)
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
                    Add True-False Question</Text>
                <Text style={{textAlign: 'center',color: 'gray' }}>
                     Exam ID : {this.state.examId}
                </Text>

                {/*<FormLabel>Title</FormLabel>*/}
                {/*<FormInput*/}
                    {/*placeholder='Question title ...'*/}
                    {/*onChangeText={*/}
                        {/*text => this.updateForm({title: text})*/}
                    {/*}/>*/}
                {/*<FormValidationMessage>*/}
                    {/*Title is required*/}
                {/*</FormValidationMessage>*/}

                {/*<FormLabel>Description</FormLabel>*/}
                {/*<FormInput*/}
                    {/*placeholder='Question...'*/}
                    {/*onChangeText={*/}
                        {/*text => this.updateForm({description: text})*/}
                    {/*}/>*/}
                {/*<FormValidationMessage>*/}
                    {/*Description is required*/}
                {/*</FormValidationMessage>*/}

                {/*<FormLabel>Points</FormLabel>*/}
                {/*<FormInput*/}
                    {/*placeholder='Enter points for question'*/}
                    {/*onChangeText={*/}
                        {/*text => this.updateForm({points: text})*/}
                    {/*}/>*/}
                {/*<FormValidationMessage>*/}
                    {/*Points are required*/}
                {/*</FormValidationMessage>*/}
                {/*<Text> Points: {this.state.points}</Text>*/}

                {/*<CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}*/}
                          {/*checked={this.state.isTrue} title='The answer is true'/>*/}

                {/*<Button	backgroundColor="green"*/}
                           {/*color="white"*/}
                           {/*title="Save"/>*/}
                {/*<Button	backgroundColor="red"*/}
                           {/*color="white"*/}
                           {/*title="Cancel"/>*/}

                {/*<Text h4 style={{textAlign: 'center',color: 'gray' }}>{'\n'}Preview</Text>*/}
                {/*<Text h3 style={{padding: 15}}>{this.state.title}</Text>*/}
                {/*<Text style={{padding: 15}} >{this.state.description}</Text>*/}

            </View>
        )
    }
}

export default TrueFalseQuestion
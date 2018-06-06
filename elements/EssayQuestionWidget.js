import React from 'react'
import {View , Switch} from 'react-native'
import {Button, CheckBox, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'

class EssayQuestionWidget extends React.Component {
    static navigationOptions = { title: "Essay Question"}
    constructor(props) {
        super(props)
        this.state =
            {
                question: {
                    title: '',
                    description: '',
                    points: 0
                },
                examId: 1,
                preview: false
            }

        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    toggleSwitch = () => {
        this.setState(state => ({
            preview: !state.preview,
        }));
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
                    Add Essay Question</Text>
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
                <View style={{ marginTop:20}} >
                    <Button	backgroundColor="green"
                               color="white"
                               title="Save"
                               borderRadius={10}
                               borderWidth={2}
                               onPress={() => {alert("Save this Question !")}}
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
                <Text h4 style={{textAlign: 'center',color: 'gray' }}>{'\n'}Preview</Text>
                <Text h3 style={{padding: 15}}>{this.state.title}</Text>
                <Text style={{padding: 15}} >{this.state.description}</Text>
                </View>}

            </View>
        )
    }
}

export default EssayQuestionWidget
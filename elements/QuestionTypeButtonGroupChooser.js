import React, {Component} from 'react'
import {Text, View, Alert} from 'react-native'
import {ButtonGroup, Divider} from 'react-native-elements'

class QuestionTypeButtonGroupChooser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedQuestionTypeIndex: 0
        }
        this.selectQuestionType = this.selectQuestionType.bind(this);
        this.renderMCQ = this.renderMCQ.bind(this);
    }

    selectQuestionType = (newQuestionTypeIndex) => {
        this.setState({
            selectedQuestionTypeIndex: newQuestionTypeIndex
        })
    }

    renderMCQ = () => {
        return(
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}> MCQ Editor </Text>
            </View>
        )
    }

    render() {
        const questionTypes = [
            'Multiple\nChoice',
            'Fill in the\nblank',
            'Essay',
            'True or\nFalse']
        return(
            <View>
                <ButtonGroup
                    style={{alignItems: 'center', textAlign: 'center'}}
                    onPress={this.selectQuestionType}
                    selectedIndex={this.state.selectedQuestionTypeIndex}
                    buttons={questionTypes}
                    containerStyle={{height: 60}}/>

                <Text>{'\n'}</Text>
                {this.state.selectedQuestionTypeIndex === 0 && this.renderMCQ()}
                {this.state.selectedQuestionTypeIndex === 1 && <Text h1> Fill in the Blank Question Editor </Text>}
                {this.state.selectedQuestionTypeIndex === 2 && <Text h1> Essay Question Editor </Text>}
                {this.state.selectedQuestionTypeIndex === 3 && <Text h1> True or False Question Editor </Text>}
            </View>

        )
    }
}


export default QuestionTypeButtonGroupChooser
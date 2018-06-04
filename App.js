import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Text, Button, Picker  } from 'react-native';
import { Divider } from 'react-native-elements'

import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'

import { createStackNavigator } from 'react-navigation'

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props)
    }

    render(){
        return(
            <ScrollView>
                <View>
                    <FixedHeader/>
                    <Button title="Go to Screen A"
                            onPress={() => this.props.navigation
                                .navigate('ScreenA') } />
                    <Button title="Go to Screen B"
                            onPress={() => this.props.navigation
                                .navigate('ScreenB') } />

                    <QuestionTypeButtonGroupChooser/>
                    {/*<QuestionTypePicker/>*/}
                    <Text>{"\n"}</Text>
                    <TrueFalseQuestionEditor/>
                    <Text>{"\n"}</Text>
                    <Exam/>

                    {/*<View style={{padding:20}}>*/}
                    {/*<TextHeadings/>*/}
                    {/*<Divider/>*/}
                    {/*<Icons/>*/}
                    {/*</View>*/}
                </View>
            </ScrollView>
        )
    }

}



class ScreenA extends React.Component {
    static navigationOptions = {title: "Screen A"}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </View>
        )
    }
}

class ScreenB extends React.Component {
    static navigationOptions = {title: "Screen B"}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h1>Screen B</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </View>
        )
    }
}

const App = createStackNavigator({
    Home: {screen: Home},
    ScreenA: {screen: ScreenA},
    ScreenB: {screen: ScreenB}
});

export default App;
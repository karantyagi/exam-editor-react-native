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

import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'

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
                    <Button title="Courses"
                            onPress={() => this.props.navigation
                                .navigate('CourseList') } />

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
    CourseList: {screen: CourseList},
    ModuleList: {screen: ModuleList},
    LessonList: {screen: LessonList},
    TopicList: {screen: TopicList},
    WidgetList: {screen: WidgetList},
    QuestionList: {screen: QuestionList},
    ScreenA: {screen: ScreenA},
    ScreenB: {screen: ScreenB}
});

export default App;
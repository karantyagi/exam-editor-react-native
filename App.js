import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import { Divider } from 'react-native-elements'

import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'

import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import AssignmentList from './components/AssignmentList'
import ExamEditor from './elements/ExamEditor'
import Assignment from './elements/Assignment'
import Exam from './elements/Exam'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import MultipleChoiceQuestionWidget from "./elements/MultipleChoiceQuestionWidget"
import EssayQuestionWidget from "./elements/EssayQuestionWidget"
import FillInTheBlanksQuestionWidget from "./elements/FillInTheBlanksQuestionWidget"
import TrueOrFalseQuestionWidget from "./elements/TrueOrFalseQuestionWidget"

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

                    {/*<Button title="Go to Screen A"*/}
                            {/*onPress={() => this.props.navigation*/}
                                {/*.navigate('ScreenA') } />*/}

                    {/*<Button title="Go to Screen B"*/}
                            {/*onPress={() => this.props.navigation*/}
                                {/*.navigate('ScreenB') } />*/}

                    {/*<QuestionTypeButtonGroupChooser/>*/}
                    {/*<QuestionTypePicker/>*/}
                    {/*<Text>{"\n"}</Text>*/}
                    {/*<TrueFalseQuestionEditor/>*/}
                    <Text>{"\n"}</Text>
                    {/*<Exam/>*/}

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
    AssignmentList: {screen: AssignmentList},
    WidgetList: {screen: WidgetList},
    Assignment: {screen: Assignment},
    ExamEditor: {screen: ExamEditor},
    Exam: {screen: Exam},
    QuestionList: {screen: QuestionList},
    TrueOrFalseQuestionWidget: {screen: TrueOrFalseQuestionWidget},
    FillInTheBlanksQuestionWidget: {screen: FillInTheBlanksQuestionWidget},
    MultipleChoiceQuestionWidget: {screen: MultipleChoiceQuestionWidget},
    EssayQuestionWidget: {screen: EssayQuestionWidget},
    ScreenA: {screen: ScreenA},
    ScreenB: {screen: ScreenB}
});

export default App;
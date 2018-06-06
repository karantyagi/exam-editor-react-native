import React, {Component} from 'react';
import { View, ScrollView, Button } from 'react-native';
import FixedHeader from './elements/FixedHeader'

import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import ExamEditor from './elements/ExamEditor'
import Assignment from './elements/Assignment'
import AssignmentEditor from './elements/AssignmentEditor'
import Exam from './elements/Exam'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import MultipleChoiceQuestionWidget from "./elements/MultipleChoiceQuestionWidget"
import EssayQuestionWidget from "./elements/EssayQuestionWidget"
import FillInTheBlanksQuestionWidget from "./elements/FillInTheBlanksQuestionWidget"
import TrueOrFalseQuestionWidget from "./elements/TrueOrFalseQuestionWidget"

import MultipleChoiceQuestionWidgetEditor from "./elements/MultipleChoiceQuestionWidgetEditor"
import EssayQuestionWidgetEditor from "./elements/EssayQuestionWidgetEditor"
import FillInTheBlanksQuestionWidgetEditor from "./elements/FillInTheBlanksQuestionWidgetEditor"
import TrueOrFalseQuestionWidgetEditor from "./elements/TrueOrFalseQuestionWidgetEditor"

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
                </View>
            </ScrollView>
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
    Assignment: {screen: Assignment},
    AssignmentEditor: {screen: AssignmentEditor},
    ExamEditor: {screen: ExamEditor},
    Exam: {screen: Exam},
    QuestionList: {screen: QuestionList},
    TrueOrFalseQuestionWidget: {screen: TrueOrFalseQuestionWidget},
    FillInTheBlanksQuestionWidget: {screen: FillInTheBlanksQuestionWidget},
    MultipleChoiceQuestionWidget: {screen: MultipleChoiceQuestionWidget},
    EssayQuestionWidget: {screen: EssayQuestionWidget},
    TrueOrFalseQuestionWidgetEditor: {screen: TrueOrFalseQuestionWidgetEditor},
    FillInTheBlanksQuestionWidgetEditor: {screen: FillInTheBlanksQuestionWidgetEditor},
    MultipleChoiceQuestionWidgetEditor: {screen: MultipleChoiceQuestionWidgetEditor},
    EssayQuestionWidgetEditor: {screen: EssayQuestionWidgetEditor}
});

export default App;
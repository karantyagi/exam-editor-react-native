import React from 'react';
import { StyleSheet, View, ScrollView, Text  } from 'react-native';
import { Divider } from 'react-native-elements'

import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'


export default class App extends React.Component {
  render() {
    return (
        <ScrollView>
            <View>
                <FixedHeader/>

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

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

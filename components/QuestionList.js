import React, {Component} from 'react'
import {View, Alert, ScrollView, Picker} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

const questions = [
    {	title: 'Question 1', subtitle: 'Multiple choice',
        icon: 'list'},
    {	title: 'Question 2', subtitle: 'Fill-in the blanks',
        icon: 'code'},
    {	title: 'Question 3', subtitle: 'True or false',
        icon: 'check'},
    {	title: 'Question 4', subtitle: 'Essay',
        icon: 'subject'}]


class QuestionList extends Component {
  static navigationOptions = {title: 'Exam Questions'}
  constructor(props) {
    super(props)
      this.state = {
          questions: [],
          examId: 1,
          questionType: "MC"
      }

      this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion = () => {
    alert("Add Question: "+this.state.questionType );
    if(this.state.questionType === "TF"){
      this.props.navigation
            .navigate("TrueFalseQuestion", {examId: this.state.examId})
    }

  }



  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
      this.setState({
          examId: examId
      })
    fetch("https://kt-course-manager-server.herokuapp.com/api/exam/"+examId+"/question")
        .then(response => (response.json()))
      .then(questions => this.setState({questions}))
        .catch((error)=>{
            alert(error.message);
        });
  }
  render() {
    return(
        <ScrollView>
            {/*<View style={{paddingLeft: 12, marginBottom: 1}}>*/}
                {/*<Text style={{color:'gray'}}>Exam ID: {this.state.examId}  </Text>*/}
            {/*</View>*/}

            <View style={{paddingLeft: 6, paddingTop: 5, marginTop: 3, alignItems:'center'}}>
                <Text h3>Total Questions: {this.state.questions.length}  </Text>
            </View>
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
            </View>

          <View style={{padding: 4, marginTop:4, marginLeft: 3}}>
                <Button	backgroundColor="red"
                           color="white"
                           title="Add Question"
                           borderRadius={10}
                           borderWidth={2}
                     onPress={this.addQuestion}
                />
            </View>


            <View style={{padding: 12}}>
                <Text h4>List</Text>
                {this.state.questions.map( (question, index) => (
                    <ListItem
                        key={index}
                        leftIcon={{name: 'list'}}
                        subtitle={question.subtitle}
                        title={question.title}
                    />
                ))}
            </View>

        </ScrollView>
    )
  }
}
export default QuestionList
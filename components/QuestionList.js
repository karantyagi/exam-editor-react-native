import React, {Component} from 'react'
import {View, Alert, ScrollView, Picker} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import Icon from "react-native-elements/src/icons/Icon";

class QuestionList extends Component {
  static navigationOptions = {title: 'Exam Question Editor'}
  constructor(props) {
    super(props)
      this.state = {
          questions: [],
          examId: 1,
          questionType: "MC"
      }

      this.addQuestion = this.addQuestion.bind(this);
      this.deleteQuestion = this.deleteQuestion.bind(this);
      this.iconName = this.iconName.bind(this);
  }

  iconName = (subtitle) => {

      if(subtitle == "Multiple choice"){
          return ({name: 'list'});
      }
      else if(subtitle == "Fill in the blanks"){
          return ({name: 'code'});
      }
      else if(subtitle == "True or False"){
          return ({name: 'check'});
      }
      else{
          return ({name: 'subject'});
      }
  }

  addQuestion = () => {
    // alert("Add Question: "+this.state.questionType );
    if(this.state.questionType == "TF"){
      this.props.navigation
            .navigate("TrueOrFalseQuestionWidget", {examId: this.state.examId})
    }
      else if(this.state.questionType == "MC"){
          this.props.navigation
              .navigate("MultipleChoiceQuestionWidget", {examId: this.state.examId})
      }
      else if(this.state.questionType == "ES"){
          this.props.navigation
              .navigate("EssayQuestionWidget", {examId: this.state.examId})
      }
      else{
          this.props.navigation
              .navigate("FillInTheBlanksQuestionWidget", {examId: this.state.examId})
      }

  }

    deleteQuestion = (questionId) => {

         alert("Deleted Question ID " + questionId);
        fetch("https://kt-course-manager-server.herokuapp.com/api/question/"+questionId,
            {
                method: 'DELETE'
            })
            .then(response => (response))
            .catch((error)=>{
                alert(error.message);
            });
        this.props.navigation
            .navigate("QuestionList", {examId: this.state.examId})

    }



  componentDidMount() {


    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
      this.setState({
          examId: examId
      })
      // alert("mount fired")
    fetch("https://kt-course-manager-server.herokuapp.com/api/exam/"+examId+"/question")
        .then(response => (response.json()))
        // .then((questions) => {alert("Fetched" + questions.length);})
      .then(questions => this.setState({questions}))
        .catch((error)=>{
            alert(error.message);
        });
  }

    componentWillReceiveProps(newProps)
    {
        const {navigation} = newProps;
        const examId = navigation.getParam("examId")
        this.setState({
            examId: examId
        })
        // alert("will receive fired")
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
            {/*<View>*/}
                {/*<Text> Exam ID: {this.state.examId}</Text>*/}
            {/*</View>*/}

            <View style={{ marginTop:10, marginBottom:5}}>
                <Button	backgroundColor="orange"
                           color="white"
                           title="Edit exam (title/description)"
                           borderRadius={10}
                           borderWidth={2}
                           onPress={() => {
                               this.props.navigation
                                   .navigate("ExamEditor", {examId: this.state.examId})
                           }}
                />
            </View>

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
                <Button	backgroundColor="green"
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
                        leftIcon={this.iconName(question.subtitle)}
                        subtitle={question.subtitle}
                        title={question.title}
                        rightIcon={
                            <Icon
                                key={'k'+index.toString()}
                                name={'times'}
                                // size={20}
                                type='font-awesome'
                                // raised
                                // color={'#f50'}
                                // onPress={() => alert('Delete assignment/widget ?? by ID: '+widget.id)}
                                onPress={() => this.deleteQuestion(question.id)}
                            />}
                    />
                ))}
            </View>

        </ScrollView>
    )
  }
}
export default QuestionList
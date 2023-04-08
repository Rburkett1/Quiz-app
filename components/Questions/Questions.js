import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { ButtonGroup } from "@rneui/themed";
import { useState, useEffect } from "react";

const quizQuestions = [
  {
    prompt: "Q1: What year was UCF founded?",
    type: "Single-choice",
    choices: ["1963", "1957", "1989", "1977"],
    correct: 0, //1963
  },
  {
    prompt: "Q2: Which is NOT a programming language?",
    type: "multiple-choice",
    choices: ["React", "B++", "Doge", "JavaScript"],
    correct: [1, 2], // B++, Doge //only correct when answered in the order of the array 
  },
  {
    prompt: "Q3: What is the 3rd largest country in Europe landwise?",
    type: "single-choice",
    choices: ["Germany", "Spain", "Sweeden", "France"],
    correct: 3, //France
  },
  {
    prompt: "Q4: The strait of Gibraltar Seperates Spain and Algeria.",
    type: "true-false",
    choices: ["True", "False"],
    correct: 1, //false
  },
  {
    prompt: "Q5: Dont Believe the answer choices to this question.",
    type: "Single-choice",
    choices: [
      "This is the answer",
      "No,this is the answer",
      "This is not the answer",
      "The First choice is the answer",
    ],
    correct: 2, //This is not the answer
  },
];

export default function Questions({ navigation }) {
  //The question currently in focus 
  const [currentQuestion, setCurrentQuestions] = useState(0);
  //selecting more then one answer choice if allowed
  const [selectedIndexes, setSelectedIndexes] = useState([0]);
  //selecting one answer choice
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // score for summary page
  const [answers, setAnswers] = useState([]);
  //track when quiz is over
  const [ended, setEnded] = useState(false);

  //navigates to the summary page when the quiz is over
  useEffect(() => {
    if (ended) {
      navigation.navigate("Summary", { quiz: quizQuestions, answers });
    }
  }, [ended, answers]);

  const handleAnswer = async () => {
    const selected =
      quizQuestions[currentQuestion].type === "multiple-choice"
        ? selectedIndexes.sort((a, b) => a - b)
        : selectedIndex;
    const answer = {
      index: currentQuestion,
      selected,
      corrected:
        quizQuestions[currentQuestion].correct.toString() ==
        selected.toString(),
    };
    setAnswers((answers) => [...answers, answer]);
    setSelectedIndexes([]);
    setSelectedIndex(-1);
  };

  const handleQuestions = () => {
    //goes to the next question
    //prevents choice from being pre-selected
    handleAnswer();

    //check if we are at the last question
    if (currentQuestion === quizQuestions.length - 1) {
      //triggers the useEffect
      setEnded(true);
      return;
    }
    // if not, we go to the next question
    setCurrentQuestions((question) => question + 1);
  };

  const reset = () => {
    setCurrentQuestions(0);
    setSelectedIndexes([]);
    setSelectedIndex(-1);
    setAnswers([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionStatus}>
          Question {currentQuestion + 1} out of {quizQuestions.length}
        </Text>
        <Text style={styles.questionPrompt}>
          {quizQuestions[currentQuestion].prompt}
        </Text>
        <Text style={styles.questionType}>
          {quizQuestions[currentQuestion].type}
        </Text>
        <View>
          {quizQuestions[currentQuestion].type === "multiple-choice" ? (
            <ButtonGroup
              selectMultiple
              buttons={quizQuestions[currentQuestion].choices}
              selectedIndexes={selectedIndexes}
              testID={"choices"}
              onPress={(choice) => setSelectedIndexes(choice)}
              buttonStyle={styles.ButtonGroup}
              selectedButtonStyle={styles.selectedButton}
              textStyle={styles.ButtonGroupText}
              selectedTextStyle={styles.selectedButtonText}
              vertical
            />
          ) : (
            <ButtonGroup
              buttons={quizQuestions[currentQuestion].choices}
              selectedIndex={selectedIndex}
              testID={"choices"}
              onPress={(choice) => setSelectedIndex(choice)}
              buttonStyle={styles.ButtonGroup}
              selectedButtonStyle={styles.selectedButton}
              textStyle={styles.ButtonGroupText}
              selectedTextStyle={styles.selectedButtonText}
              vertical
            />
          )}
        </View>
        <Button
          title={currentQuestion < 4 ? "Next question" : "Go to results"}
          buttonStyle={styles.Button}
          onPress={handleQuestions}
          testID={"next-question"}
          onLongPress={reset}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#48484A", //ios systemgray3 dark
  },
  questionContainer: {
    padding: 10,
    width: 360,
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
  questionStatus: {
    fontSize: 22,
    marginBottom: 6,
    color: "#F2F2F7", //ios systemgray6 light
  },
  questionType: {
    fontSize: 16,
    marginBottom: 6,
    color: "#F2F2F7", //ios systemgray6 light
  },
  //question styles
  questionPrompt: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#F2F2F7", //ios systemgray6 light
  },
  //styles for button group
  ButtonGroup: {
    backgroundColor: "darkgray",
    borderStyle: 'none',
    color: "#F2F2F7", //ios systemgray6 light
    // borderRadius: 10,
    // overflow: 'hidden'
    //make postion fixed
  },
  //styles for button group option that is selected
  selectedButton: {
    backgroundColor: "#0A84FF", //ios system blue
    color: "white",
  },
  //Button group text
  ButtonGroupText: {
    color: "black",
  },
  //selected button group text
  selectedButtonText: {
    color: "white",
  },
  //bottom button styles, "Next question" and "Go to Results"
  Button: {
    backgroundColor: "#1C1C1E", //ios systemgray6 dark 
    marginTop: 25,
    paddingVertical: 20,
    borderRadius: 15,
  },
  choiceText: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#7C9885",
    color: "black",
    padding: 10,
    
  },
});
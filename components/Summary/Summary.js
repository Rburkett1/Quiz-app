import { StyleSheet, View,  Text, ScrollView,  } from 'react-native';
import { useMemo } from 'react';

export default function Summary( {route}) {

  const {quiz, answers} = route.params

  const corrected = useMemo(
    () => answers.filter((item) => item.corrected).length,
    [answers]
  );

  console.log(route.params)
  return (
    <View style = {styles.container}>
      <View style = {styles.summaryContainer}>
        <Text style = {corrected >= 3 ? styles.scoreGreen : styles.scoreRed}>
          Score: {corrected} out of {quiz.length}
        </Text>
        <ScrollView>{quiz?.map((item, index)=> 
          <View key = {index} style = {styles.questionContainer}>           
            <Text style = {styles.prompt}>{item.prompt}</Text>
            <View>{item.choices?.map((choice , _index) => 
              <Text key = {_index} style={
                answers[index] &&
                answers[index].selected.toString().includes(_index) &&
                answers[index].corrected ? styles.correct : 
                answers[index] && 
                answers[index].selected.toString().includes(_index) &&
                !answers[index].corrected ? styles.incorrect :  
                styles.other}
              >
                {choice}
              </Text>
              )}
            </View>
          </View>
         )}       
       </ScrollView> 
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
   
    backgroundColor: '#636366', //ios systemgray2 dark
  },
  scoreContainer: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 80
  },
  scoreGreen: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'green',
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  scoreRed: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  score: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  summaryContainer: {
    marginHorizontal: 14,
  },
  questionContainer: {
    marginHorizontal: 14,
    borderColor: 'lightgray',
    borderWidth: 2,
    marginVertical: 10,
    padding: 12,
    backgroundColor: 'lightgray',
    borderRadius: 8
    //add border to each question
  },
  prompt: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 12,
    color: 'black'
  },
  //stying the correct incorrect and other answer choices depending on selection 
  correct: {
    color: 'green',
    fontWeight: 'bold',
    
  },
  incorrect: {
    color: 'red',
    fontWeight: 'bold',
   // fontSize: 18
  },
  other:{
    color: 'black'
  }

  
});

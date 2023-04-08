import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Questions from './components/Questions/Questions';
import Summary from './components/Summary/Summary';



const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Questions" 
        component={Questions} 
        options = {{
          headerStyle: {
            backgroundColor: "#0A84FF", //ios system blue,
          },
          //back button and header text color
          headerTintColor: 'white'
        }}
        />
        <Stack.Screen 
        name="Summary" 
        component={Summary} 
        options = {{
          headerStyle: {
            backgroundColor:"#0A84FF", //ios system blue,
          },
          headerTintColor: 'white'
        }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

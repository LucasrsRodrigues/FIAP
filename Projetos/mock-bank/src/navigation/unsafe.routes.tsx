import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../pages/unsafe/Welcome';
import LoginScreen from '../pages/unsafe/Login';
import Register from '../pages/unsafe/Register';


const Stack = createNativeStackNavigator();


export function UnsafeRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}
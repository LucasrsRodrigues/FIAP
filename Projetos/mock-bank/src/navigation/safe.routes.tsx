import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../pages/safe/Dashboard';
import Profile from '../pages/safe/Profile';
import Recive from '../pages/safe/Recive';
import Send from '../pages/safe/Send';
import TransactionDetail from '../pages/safe/TransactionDetail';
import Transactions from '../pages/safe/Transactions';

const Stack = createNativeStackNavigator();

export function SafeRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Recive" component={Recive} />
      <Stack.Screen name="Send" component={Send} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
      <Stack.Screen name="Transactions" component={Transactions} />
    </Stack.Navigator>
  )
}
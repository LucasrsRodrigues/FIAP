import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Dashboard from "../screens/Dashboard";
import TabRoutes from "./tab.routes";
import SendPackage from "../screens/SendPackage";

const { Navigator, Screen } = createNativeStackNavigator();

export default function SafeRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Home" component={TabRoutes} />
      <Screen name="SendPackage" component={SendPackage} />
    </Navigator>
  )
}
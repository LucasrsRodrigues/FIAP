import { NavigationContainer } from "@react-navigation/native";
import SafeRoutes from "./safe.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <SafeRoutes />
    </NavigationContainer>
  )
}
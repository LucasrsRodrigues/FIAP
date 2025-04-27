import { NavigationContainer } from "@react-navigation/native";
import { UnsafeRoutes } from "./unsafe.routes";
import { useAuth } from "../hooks/useAuth";
import { SafeRoutes } from "./safe.routes";

export default function Routes() {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      {token ? <SafeRoutes /> : <UnsafeRoutes />}
    </NavigationContainer>
  )
}
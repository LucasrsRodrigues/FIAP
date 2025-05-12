import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Delivery from "../screens/Delivery";
import Message from "../screens/Message";
import Account from "../screens/Account";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const { Navigator, Screen } = createBottomTabNavigator();


const routes = [
  {
    id: 0,
    label: "Home",
    name: "Dashboard",
    component: Dashboard,
    icon: "home"
  },
  {
    id: 1,
    name: "Delivery",
    label: "Delivery",
    component: Delivery,
    icon: "CodeSandbox"
  },
  {
    id: 4,
    name: "Plus",
    label: "Plus",
    component: Delivery,
    icon: "plus"
  },
  {
    id: 2,
    label: "Message",
    name: "Message",
    component: Message,
    icon: "message1"
  },
  {
    id: 3,
    label: "Account",
    name: "Account",
    component: Account,
    icon: "user"
  },
];


export default function TabRoutes() {
  const { navigate } = useNavigation();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#131417",
          borderTopColor: "#040404",
        },
        tabBarActiveTintColor: "#ED145B"
      }}
    >
      {routes.map(route => {
        if (route.name === "Plus") {
          return (
            <Screen
              key={route.id}
              name={route.name}
              component={route.component}
              options={{
                tabBarIcon: () => null,
                tabBarButton: (props) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ED145B",
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      top: -30,
                      alignSelf: "center"
                    }}
                    onPress={() => navigate("SendPackage")}
                  >
                    <AntDesign name="plus" size={34} color="#000" />
                  </TouchableOpacity>
                )
              }}
            />
          )
        }

        return (
          <Screen
            key={route.id}
            name={route.name}
            component={route.component}
            options={({ navigation, route: opRoute, theme }) => ({
              tabBarIcon: ({ color, focused, size }) => {
                return <AntDesign name={route.icon} size={size} color={color} />
              },
              tabBarLabel: route.label,
              tabBarLabelStyle: {
                fontFamily: "secondary_regular",
                fontSize: 16
              },

            })}

          />
        )

      })}
    </Navigator>
  )
}
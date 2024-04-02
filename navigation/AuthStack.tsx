import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function AuthStack({route}: any) {
  const { user } = route.params || {};
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        initialParams={{ user: user }}
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

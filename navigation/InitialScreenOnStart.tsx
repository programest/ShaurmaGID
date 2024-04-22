import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Entry/Login";
import Signup from "../screens/Entry/Signup";
import Forgot from "../screens/Entry/Forgot";
import Welcome from "../screens/Entry/Welcome";
import React, { useState, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";

const Stack = createNativeStackNavigator();

export const InitialScreenOnStart = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Здесь могут быть выполнены дополнительные действия при обновлении
    // Например, загрузка данных с сервера
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{
            headerTitle: 'Назад',
          }}
        />
      </Stack.Navigator>
    </ScrollView>
  );
};

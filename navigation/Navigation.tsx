import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { InitialScreenOnStart } from "./InitialScreenOnStart";
import AuthStack from "./Tabs/AuthStack";
import OrderTab from "./Tabs/OrderTab";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import HomeTabs from "./Tabs/HomeTab";
import MapTabs from "./Tabs/MapTab";
import FavoriteTabs from "./Tabs/FavoriteTab";
import Home from "../assets/svg/Home";
import Favorite from "../assets/svg/Favorite";
import Order from "../assets/svg/Order";
import Search from "../assets/svg/Search";
import Shop from "../screens/Main/Shop";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [] );
  return (
    <View style={styles.container}> 
      <NavigationContainer >
        {user ? (
          <>
          <Tab.Navigator 
          
          tabBarOptions={{
            activeTintColor: '#25CB87', // Цвет иконки для активного таба
            inactiveTintColor: '#66707A', // Цвет иконки для неактивного таба
            
          }}
          
          >
            <Tab.Screen   options={{ headerShown: false, tabBarIcon: ({ focused, color  }) => (
              <Home color={color}/>  ), tabBarLabel: 'Auth',  }} initialParams={{ user: user }}  name="AuthStack" component={AuthStack} 
            />
            
            <Tab.Screen  options={{ headerShown: false , tabBarIcon: ({ focused, color  }) => (
              <Favorite color={color}/>  ), tabBarLabel: 'Home',  }} initialParams={{ user: user }}  name="HomeTab" component={HomeTabs} />

            <Tab.Screen  options={{ headerShown: false,  tabBarIcon: ({ focused, color  }) => (
              <Search color={color} style={{ marginTop: -30 }} size={60} />  ), tabBarLabel: 'Map',  }} initialParams={{ user: user }}  name="MapTab" component={MapTabs} 
              />

            <Tab.Screen  options={{ headerShown: false, tabBarIcon: ({ focused, color  }) => (
              <Order color={color}/>  ), tabBarLabel: 'Favorite',  }} initialParams={{ user: user  }}  name="FavoriteTab" component={FavoriteTabs} />
              

              <Tab.Screen
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color }) => (
                      <Order color={color} />
                    ),
                    tabBarLabel: 'Order',
                  }}
                  initialParams={{ user: user }}
                  name="OrderTab" // Обратите внимание, что имя здесь должно соответствовать имени экрана
                  component={OrderTab}
                />
          </Tab.Navigator>


          {/* <Stack.Navigator>
            <Stack.Screen
              name="Shop"
              component={Shop}
              options={{
                headerShown: false,
                
              }}
            />  
          </Stack.Navigator> */}
          
        </>
        ) : (
          <Stack.Navigator initialRouteName="InitialScreenOnStart">
            <Stack.Screen
              name="InitialScreenOnStart"
              component={InitialScreenOnStart}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
});

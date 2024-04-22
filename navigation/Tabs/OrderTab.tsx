import React, { useState, useEffect } from "react";
import { doc, getDoc , getDocs, collection, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import Order from "../../screens/Main/Order";
import NoOrders from "../../screens/Main/NoOrders";

interface OrderItem {
  title: string;
  subTitle: string;
  price: number;
  count: number
} 

export default function OrderTab({ route, navigation }: any) {
  const { user } = route.params || {};
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const ordersCollectionRef = collection(userDocRef, 'order');
          const unsubscribe = onSnapshot(ordersCollectionRef, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => doc.data() as OrderItem);
            setOrders(ordersData);
            setLoading(false); // Установка loading в false после успешного получения данных
          });
          return () => unsubscribe(); // Отписка от слушателя при размонтировании компонента
        } else {
          console.log('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Установка loading в false в случае ошибки получения данных
      }
    };
  
    fetchData();
  }, []);

  return (
    <Stack.Navigator>
      {loading ? (
        <Stack.Screen
          name="Loading"
          component={() => <View><Text>Loading...</Text></View>}
          options={{ headerShown: false }}
        />
      ) : orders.length > 0 ? (
        <Stack.Screen
          name="Order"
          component={() => <Order route={{ params: { user, orders } }} />}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="NoOrders"
          component={NoOrders}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

import React, { useState, useEffect } from "react";
import { doc, getDoc, DocumentSnapshot, DocumentData, getDocs, collection, QuerySnapshot } from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Map from "../../screens/Main/Map";
import Shop from "../../screens/Main/Shop";
import { ActivityIndicator } from "react-native";

interface OrderItem {
  adress: string;
  name: string;
  coordinates: {
    latitude: number;                 
    longitude: number;                
  };
}

export default function MapTab() {
  const [loading, setLoading] = useState<boolean>(true);
  const [markers, setMarkers] = useState<OrderItem[]>([]); // Массив маркеров
  const Stack = createNativeStackNavigator();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'shops'));
        const markersData: OrderItem[] = []; // Массив для хранения маркеров
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const userData = doc.data() as OrderItem;
            markersData.push(userData); // Добавляем данные в массив маркеров
          }
        });
        setMarkers(markersData); // Устанавливаем массив маркеров в состояние
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator />; // Пока данные загружаются, отображаем индикатор загрузки
  }

  return (

      <Stack.Navigator >
        <Stack.Screen
          name="Map"
          component={Map}
          initialParams={{ markers: markers }} // Передаем массив маркеров в параметрах
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Shop"
          component={Shop}
          options={{
            headerShown: false,
 
          }}
        />
      </Stack.Navigator>

  );
}


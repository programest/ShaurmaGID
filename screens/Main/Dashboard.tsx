import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

import { ActivityIndicator } from 'react-native';

export default function Dashboard({ route }: any) {
  const [userInfo, setUserInfo] = useState<any | undefined>(null);
  const [loading, setLoading] = useState(true); // Состояние загрузки данных

  const { user } = route.params;
  const handleSignout = async () => {
    await auth.signOut();
  };

  const Modal = () => {
    Alert.alert("Auth App", "Вы точно хотите выйти?", [
      {
        text: "Нет",
        onPress: () => console.log("Cancel Pressed"),
      },
      { text: "Выйти", onPress: handleSignout },
    ]);
  };

  const getData = async () => {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      setUserInfo(docSnap.data());
    } else {
      console.log('No such document!');
    }
    setLoading(false); // После загрузки данных устанавливаем состояние загрузки в false
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Добро пожаловать {userInfo.Name}</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={Modal}>
          <Text style={{ color: Colors.white, fontSize: 20 }}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    marginTop: 30,
  },
});

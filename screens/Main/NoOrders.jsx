import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Logo from "../../assets/svg/Logo";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NoOrdersImg from "../../assets/svg/NoOrdersImg";
export default function NoOrders() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <NoOrdersImg style={styles.image} />
        </View>
        <Text style={styles.title}>No orders available</Text>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  logoContainer: {
    marginBottom: 20,
    width: 200, 
    height: 200,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Позволяет изображению сохранять пропорции внутри контейнера
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#20B25D',
    borderRadius: 10,
  },
  goBackText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 5,
  },
});

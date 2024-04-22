import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import Logo from "../../assets/svg/Logo";
  export default function Welcome({ navigation }: { navigation: any }) {
   
    return (
      <View style={styles.container}>
        <ImageBackground 
          source={require('../../assets/BGWelcomePage.jpg')} // Укажите путь к вашему изображению
          style={styles.backgroundImage}
        >
            <View style={styles.blockText}>
                <Logo />
                <Text style={styles.text}>ShaurmaGID</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push("Login")}>
                <Text style={styles.buttonText}>Продолжить</Text>
                </TouchableOpacity>      
            </ImageBackground>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between', // Равномерное распределение пространства между элементами
    },
    blockText: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 60, // Отступ сверху
    },
    backgroundImage: {
      alignItems: 'center',
      flex: 1,
      
      resizeMode: "cover",
    },
    text: {
      fontSize: 32,
      fontWeight: '600',
      color: "white",
      textAlign: "center",
      marginLeft: 7
    },
    button: {
     marginTop: 'auto',
      backgroundColor: '#228F62',
      width: '90%',
      paddingVertical: 14,
  
      borderRadius: 15,
      alignItems: 'center',
      marginBottom: 40, // Отступ снизу
    },
    buttonText: {
      fontWeight: '700',
      color: '#ffffff',
      fontSize: 18,
    },
  });
  
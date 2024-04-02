import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "../firebase/firebase";
import { Entypo } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "../components/Button";
import Message from "../components/Message";
const { width, height } = Dimensions.get("window");
let top;
if (Platform.OS === "ios") {
  top = height * 0.02;
} else {
  top = 0;
}

export default function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSignin = async () => {
    if (!email || !password) {
      alert('Пожалуйста, введите свой email и пароль');
      return;
    }
  
    setLoading(true);
  
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/invalid-email') {
        alert('Неверный формат email');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('Неправильный email или пароль');
      }else if (error.code === 'auth/invalid-credential') {
        alert('Неправильный email или пароль');
      } else {
        console.error('Ошибка входа:', error);
        alert('Произошла ошибка при входе. Пожалуйста, попробуйте снова');
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginHeader}>
        <Text style={styles.loginHeaderText}>Войти 🚀</Text>
      </View>

      <View style={styles.loginContainer}>
        {/* Email */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Email</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Введите свой email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* Password */}
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordText}>Пароль</Text>
          <TextInput
            style={styles.passwordInput}
            placeholder="Введите свой пароль"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {/* Forgot Password */}
        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={() => navigation.push("Forgot")}>
            <Text style={styles.forgotText}>Забыли пароль?</Text>
          </TouchableOpacity>
        </View>
        {/* Login Button */}
       
          <Button onPress={handleSignin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>
              {
                loading ? "Вход..." : "Войти"
              }
            </Text>
          </Button>
        

        <View style={styles.signupGroup}>
          <Text style={styles.new}>Нету акаунта?</Text>
          <TouchableOpacity onPress={() => navigation.push("Signup")}>
            <Text style={styles.signup}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: height * 0.05,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  loginHeader: {
    marginTop: 20,
  },
  loginHeaderText: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: 'center'
  },
  loginContainer: {
    marginTop: 20,
  },
  emailContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emailInput: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: Colors.light,
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 8,
    paddingLeft: 10,
  },
  passwordContainer: {
    marginTop: 20,
  },
  passwordText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordInput: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: Colors.light,
    borderRadius: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: Colors.light,
  },
  forgotContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  forgotText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  loginButton: {
    marginTop: 20,
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  signupGroup: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  signup: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  new: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 5,
  },
});

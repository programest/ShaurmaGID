import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "../firebase/firebase";
import { Entypo } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "../components/Button";

export default function Signup({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    // Проверяем, что все поля заполнены
    if (!username || !email || !phone || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
  
    // Проверяем, что введен корректный email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }
  
    if (password.length < 6) {
      alert('Пароль должен содержать минимум 6 символов');
      return;
    }
  
    // Если все проверки пройдены, выполняем регистрацию
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        setDoc(doc(db, "users", user.uid), {
          Name: username,
          Email: email,
          PhoneNumber: phone,
          CreatedAt: new Date().toUTCString(),
        });
        alert("Аккаунт успешно создан 🎉");
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === 'auth/email-already-in-use') {
          // Если email уже используется, выводим сообщение с предложением перейти на другую страницу
          alert('Этот email уже используется. Попробуйте войти или восстановить пароль.');
          // Здесь вы можете перенаправить пользователя на другую страницу
          // navigation.navigate("Recovery");
        } else {
          // Если другая ошибка, выводим сообщение об ошибке
          alert(err.message);
        }
      });
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.loginHeader}>
        <Text style={styles.loginHeaderText}>Регистрация 🎉</Text>
      </View>

      <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
        {/* Username */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Имя</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Введите свое Имя"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
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
        {/* Phone Number */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Номер телефона </Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Введите свой номер телефона "
            value={phone?.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
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

        {/* Login Button */}
        <Button style={styles.loginButton} onPress={handleSignup}>
         
            <Text style={styles.loginButtonText}>
              {loading ? "Создание акаунта..." : "Создать акаунт"}
            </Text>
       
        </Button>

        <View style={styles.signupGroup}>
          <Text style={styles.new}>Есть акаунт?</Text>
          <TouchableOpacity onPress={() => navigation.push("Login")}>
            <Text style={styles.signup}>Войти</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent:'center'
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

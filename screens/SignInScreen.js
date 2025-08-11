import React, { useState, useCallback } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useAuth } from "../AuthContext"

// Import your images
import Background_SignIn from "../images/SignIn/Bg-SignIn.png"
import Text_SignIn from "../images/SignIn/Text-SignIn.png"

const { width, height } = Dimensions.get("window")

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const { signIn, verifyCredentials } = useAuth()

  const handleSignIn = useCallback(() => {
    console.log("Sign In pressed with:", { email, password })

    if (verifyCredentials(email, password)) {
      signIn() // This will switch to MainAppStack and show Welcome screen first
      // The RootNavigator will automatically switch to MainAppStack
      // and WelcomeScreen will be the first screen shown (initialRouteName="Welcome")
    } else {
      Alert.alert("Login Failed", "Invalid email or password. Please try again.")
    }
  }, [email, password, verifyCredentials, signIn])

  const handleSignUp = useCallback(() => {
    console.log("Sign Up pressed")
    navigation.navigate("SignUp")
  }, [navigation])

  return (
    <ImageBackground source={Background_SignIn} style={styles.fullScreenBackground} resizeMode="cover">
      <View style={styles.contentArea}>
        {/* SIGN IN Text */}
        <Image source={Text_SignIn} style={styles.signInText} resizeMode="contain" />

        <Text style={styles.descriptionText}>Log in with your email and password to continue where you left off.</Text>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email:</Text>
          <View style={[styles.inputContainer, isEmailFocused && styles.inputFocused]}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password:</Text>
          <View style={[styles.inputContainer, isPasswordFocused && styles.inputFocused]}>
            <MaterialCommunityIcons name="lock-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5DC",
    justifyContent: "center",
    alignItems: "center",
  },
  contentArea: {
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#FFFCF3",
    borderRadius: 30,
    paddingVertical: 30,
    width: "90%",
    maxWidth: 400,
  },
  signInText: {
    width: width * 0.6,
    height: 60,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
    fontWeight: "normal",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E6A2E",
    marginBottom: 8,
    alignSelf: "flex-start",
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B0B0B0",
    paddingHorizontal: 15,
    height: 50,
  },
  inputFocused: {
    borderColor: "#2E6A2E",
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  inputIcon: {
    marginRight: 10,
  },
  iconButton: {
    paddingLeft: 10,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#2E6A2E",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  signUpText: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  signUpLink: {
    fontSize: 14,
    color: "#2E6A2E",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
})

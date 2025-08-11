import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../AuthContext';
import Text_SignUp from '../images/SignUp/Text-SignUp.png'

const { width, height } = Dimensions.get('window');

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for input focus
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const { registerUser } = useAuth();

  const handleSignUp = async () => {
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    const success = await registerUser(email, password);
    if (success) {
      Alert.alert('Success', 'Account created successfully! Please sign in.');
      navigation.navigate('SignIn');
    } else {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* SIGN UP Text Image */}
      <Image
        source={Text_SignUp}
        style={styles.signUpText}
        resizeMode="contain"
      />
      <Text style={styles.descriptionText}>
        Create a new account to get started. Fill in your details to join and access all features.
      </Text>

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

      {/* First Name Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>First Name:</Text>
        <View style={[styles.inputContainer, isFirstNameFocused && styles.inputFocused]}>
          <MaterialCommunityIcons name="account-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter First Name"
            placeholderTextColor="#888"
            autoCapitalize="words"
            value={firstName}
            onChangeText={setFirstName}
            onFocus={() => setIsFirstNameFocused(true)}
            onBlur={() => setIsFirstNameFocused(false)}
          />
        </View>
      </View>

      {/* Last Name Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Last Name:</Text>
        <View style={[styles.inputContainer, isLastNameFocused && styles.inputFocused]}>
          <MaterialCommunityIcons name="account-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Last Name"
            placeholderTextColor="#888"
            autoCapitalize="words"
            value={lastName}
            onChangeText={setLastName}
            onFocus={() => setIsLastNameFocused(true)}
            onBlur={() => setIsLastNameFocused(false)}
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
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
          >
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Confirm Password:</Text>
        <View style={[styles.inputContainer, isConfirmPasswordFocused && styles.inputFocused]}>
          <MaterialCommunityIcons name="lock-check-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.iconButton}
          >
            <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInLink}>Sign In!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF3', // Light beige/cream background
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 80, // Adjust for status bar/notch
  },
  signUpText: {
    width: width * 0.6, // Adjust size as needed
    height: 60, // Adjust height as needed
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4A4A4A', // Dark grey text
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E6A2E', // Dark green
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 5, // Small indent for label
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0', // Light grey border
    paddingHorizontal: 15,
    height: 50,
  },
  inputFocused: {
    borderColor: '#2E6A2E', // Dark green border when focused
    borderWidth: 2, // Slightly thicker border
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333', // Dark text color
  },
  inputIcon: {
    marginRight: 10, // Space between icon and text input
  },
  iconButton: { // For the eye icon
    paddingLeft: 10,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#2E6A2E', // Dark green
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signInText: {
    fontSize: 14,
    color: '#4A4A4A', // Dark grey text
  },
  signInLink: {
    fontSize: 14,
    color: '#2E6A2E', // Dark green
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

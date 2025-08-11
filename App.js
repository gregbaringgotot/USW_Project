"use client"

import "react-native-gesture-handler" // Must be at the top
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { AuthProvider, useAuth } from "./AuthContext"
import { View, ActivityIndicator, StyleSheet, Text } from "react-native"
import { enableScreens } from "react-native-screens"

// Enable react-native-screens for better performance
enableScreens()

// Disable all navigation animations globally
const disableAnimations = {
  animationEnabled: false,
  gestureEnabled: false,
  ...TransitionPresets.DefaultTransition,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 0 } },
    close: { animation: 'timing', config: { duration: 0 } },
  },
  cardStyleInterpolator: () => ({}),
}

// Import your screen components
import SignInScreen from "./screens/SignInScreen"
import SignUpScreen from "./screens/SignUpScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
import HomeScreen from "./screens/HomeScreen"
import NewsScreen from "./screens/NewsScreen"
import BiddingScreen from "./screens/BiddingScreen"
import ProfileScreen from "./screens/ProfileScreen"

// Import your NavBarLayout
import NavBarLayout from "./Layout/NavbarLayout"

const Stack = createStackNavigator()

// --- Authentication Stack ---
// Screens accessible when the user is NOT logged in
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        ...disableAnimations,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      initialRouteName="SignIn" // SignIn screen will be the first screen when app opens
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

// --- Main App Stack (User-facing screens with NavBarLayout) ---
// Each screen here will be wrapped by NavBarLayout
function MainAppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        ...disableAnimations,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      initialRouteName="Welcome" // Welcome screen will be first after login
    >
      {/* Welcome screen is the first screen after login */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      {/* Screens that use the NavBarLayout */}
      <Stack.Screen 
        name="Home"
options={{ ...disableAnimations }}
      >
        {(props) => (
          <NavBarLayout>
            <HomeScreen {...props} />
          </NavBarLayout>
        )}
      </Stack.Screen>

      <Stack.Screen 
        name="News"
options={{ ...disableAnimations }}
      >
        {(props) => (
          <NavBarLayout>
            <NewsScreen {...props} />
          </NavBarLayout>
        )}
      </Stack.Screen>

      <Stack.Screen 
        name="Bidding"
options={{ ...disableAnimations }}
      >
        {(props) => (
          <NavBarLayout>
            <BiddingScreen {...props} />
          </NavBarLayout>
        )}
      </Stack.Screen>

      <Stack.Screen 
        name="Profile"
options={{ ...disableAnimations }}
      >
        {(props) => (
          <NavBarLayout>
            <ProfileScreen {...props} />
          </NavBarLayout>
        )}
      </Stack.Screen>

      {/* Placeholder for 'My Account' screen if needed in user menu */}
      <Stack.Screen 
        name="Account"
options={{ ...disableAnimations }}
      >
        {(props) => (
          <NavBarLayout>
            <View style={styles.accountScreen}>
              <Text>My Account Details</Text>
            </View>
          </NavBarLayout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

// --- Root Navigator (Conditional Rendering) ---
function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E6A2E" />
      </View>
    )
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#F8F9FA',
        },
      }}
    >
      {isLoggedIn ? <MainAppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

// --- Main App Component ---
export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFCF3",
  },
  accountScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
})

import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]); // New state to store registered users

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedLogin = await AsyncStorage.getItem('isLoggedIn');
        const storedUsers = await AsyncStorage.getItem('registeredUsers');

        if (storedLogin === 'true') {
          setIsLoggedIn(true);
        }
        if (storedUsers) {
          setRegisteredUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        console.error('Failed to load auth data from AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthData();
  }, []);

  // Memoized function to register a new user
  const registerUser = useCallback(async (email, password) => {
    const newUser = { email, password };
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    try {
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      return true; // Indicate success
    } catch (error) {
      console.error('Failed to save new user to AsyncStorage', error);
      return false; // Indicate failure
    }
  }, [registeredUsers]);

  // Memoized function to verify credentials
  const verifyCredentials = useCallback((email, password) => {
    return registeredUsers.some(user => user.email === email && user.password === password);
  }, [registeredUsers]);

  const signIn = useCallback(async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('isLoggedIn', 'true');
  }, []);

  const signOut = useCallback(async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('isLoggedIn');
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    isLoggedIn,
    isLoading,
    signIn,
    signOut,
    registerUser,
    verifyCredentials
  }), [isLoggedIn, isLoading, signIn, signOut, registerUser, verifyCredentials]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { useState, useCallback, useMemo } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useAuth } from "../AuthContext"

export default function ProfileScreen({ navigation }) {
  const { signOut } = useAuth()
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    memberSince: "January 2023",
    avatar: "https://via.placeholder.com/100x100/CCCCCC/FFFFFF?text=Avatar",
  })

  const stats = [
    { label: "Total Bids", value: "47", icon: "gavel", iconType: "material", color: "#2E6A2E" }, // Corrected iconType
    { label: "Won Auctions", value: "12", icon: "award", iconType: "feather", color: "#F5A623" }, // Changed trophy to award for Feather
    { label: "Success Rate", value: "85%", icon: "trending-up", iconType: "feather", color: "#4A90E2" },
  ]

  const menuItems = [
    {
      id: 1,
      title: "My Bids",
      subtitle: "View your bidding history",
      icon: "gavel",
      iconType: "material",
      onPress: () => navigation.navigate("Bidding"),
    },
    {
      id: 2,
      title: "Won Items",
      subtitle: "Items you've successfully won",
      icon: "award",
      iconType: "feather",
      onPress: () => console.log("Navigate to Won Items"),
    },
    {
      id: 3,
      title: "Watchlist",
      subtitle: "Items you're watching",
      icon: "heart",
      iconType: "feather",
      onPress: () => console.log("Navigate to Watchlist"),
    },
    {
      id: 4,
      title: "Payment Methods",
      subtitle: "Manage your payment options",
      icon: "credit-card",
      iconType: "feather",
      onPress: () => console.log("Navigate to Payment Methods"),
    },
    {
      id: 5,
      title: "Notifications",
      subtitle: "Manage notification preferences",
      icon: "bell",
      iconType: "feather",
      onPress: () => console.log("Navigate to Notifications"),
    },
    {
      id: 6,
      title: "Help & Support",
      subtitle: "Get help and contact support",
      icon: "help-circle",
      iconType: "feather",
      onPress: () => console.log("Navigate to Help"),
    },
    {
      id: 7,
      title: "Settings",
      subtitle: "App preferences and account settings",
      icon: "settings",
      iconType: "feather",
      onPress: () => console.log("Navigate to Settings"),
    },
  ]

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            signOut()
            // Navigation will automatically redirect to AuthStack due to App.js logic
          },
        },
      ],
      { cancelable: true },
    )
  }

  const renderIcon = (item) => {
    if (item.iconType === "material") {
      return <MaterialCommunityIcons name={item.icon} size={24} color="#666" />
    } else {
      return <Feather name={item.icon} size={24} color="#666" />
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Feather name="log-out" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={16} color="#2E6A2E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                  {stat.iconType === "material" ? (
                    <MaterialCommunityIcons name={stat.icon} size={20} color="white" />
                  ) : (
                    <Feather name={stat.icon} size={20} color="white" />
                  )}
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>{renderIcon(item)}</View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
            <View style={styles.logoutIcon}>
              <Feather name="log-out" size={24} color="#D0021B" />
            </View>
            <View style={styles.logoutText}>
              <Text style={styles.logoutTitle}>Logout</Text>
              <Text style={styles.logoutSubtitle}>Sign out of your account</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#2E6A2E",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 12,
    color: "#888",
  },
  editButton: {
    padding: 8,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  menuItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  logoutCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE6E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFE6E6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  logoutText: {
    flex: 1,
  },
  logoutTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D0021B",
    marginBottom: 2,
  },
  logoutSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  bottomPadding: {
    height: 100,
  },
})

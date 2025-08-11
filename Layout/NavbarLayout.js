"use client"

import React, { useMemo, useCallback } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const { width } = Dimensions.get("window")

// Memoized tab configuration to prevent re-creation on every render
const tabs = [
  {
    name: "Home",
    icon: "home",
    route: "Home",
  },
  {
    name: "News",
    icon: "newspaper",
    route: "News",
  },
  {
    name: "Bidding",
    icon: "gavel",
    route: "Bidding",
  },
  {
    name: "Profile",
    icon: "account",
    route: "Profile",
  },
]

function NavBarLayout({ children }) {
  const navigation = useNavigation()
  const route = useRoute()

  // Immediate navigation function with zero delay
  const navigateTo = useCallback((screenName) => {
    // Use push for immediate navigation without any transition
    if (route.name !== screenName) {
      navigation.replace(screenName)
    }
  }, [navigation, route.name])

  // Memoized indicator position calculation
  const indicatorPosition = useMemo(() => {
    const activeIndex = tabs.findIndex((tab) => tab.route === route.name)
    if (activeIndex !== -1) {
      const tabWidth = width / tabs.length
      return activeIndex * tabWidth + tabWidth / 2 - 20 // 20 is half of indicator width
    }
    return 0
  }, [route.name])

  // Memoized icon rendering function using only MaterialCommunityIcons
  const renderIcon = useCallback((tab, isActive) => {
    const iconColor = isActive ? "#2E6A2E" : "#888"
    const iconSize = 22

    return <MaterialCommunityIcons name={tab.icon} size={iconSize} color={iconColor} />
  }, [])

  return (
    <View style={styles.container}>
      {/* Main Content Area */}
      <View style={styles.content}>{children}</View>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        {/* Static Indicator Line */}
        <View
          style={[
            styles.indicator,
            {
              left: indicatorPosition,
            },
          ]}
        />

        <View style={styles.bottomNav}>
          {tabs.map((tab, index) => {
            const isActive = route.name === tab.route
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tabButton}
                onPress={() => navigateTo(tab.route)}
                activeOpacity={1}
                delayPressIn={0}
                delayPressOut={0}
                delayLongPress={0}
              >
                <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                  {renderIcon(tab, isActive)}
                </View>
                <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    paddingBottom: 0, // Remove any bottom padding since navbar is fixed
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 15,
    paddingTop: 8,
    paddingBottom: 25, // Safe area padding
  },
  indicator: {
    position: "absolute",
    top: 0,
    width: 40,
    height: 3,
    backgroundColor: "#2E6A2E",
    borderRadius: 2,
    zIndex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    backgroundColor: "transparent",
  },
  activeIconContainer: {
    backgroundColor: "rgba(46, 106, 46, 0.1)",
  },
  tabLabel: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
    textAlign: "center",
  },
  activeTabLabel: {
    color: "#2E6A2E",
    fontWeight: "700",
  },
})

// Export memoized component for better performance
export default React.memo(NavBarLayout)

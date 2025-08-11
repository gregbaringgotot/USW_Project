import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform, StatusBar } from "react-native"
import { VideoView, useVideoPlayer } from "expo-video" // Updated import for expo-video
import { LinearGradient } from "expo-linear-gradient"

// Import your logo image and video
import USWLogo from "../images/Welcome/USW-Logo.png"
const welcomeVideo = require("../images/Welcome/USWvideo.mp4")

const { width, height } = Dimensions.get("window")

export default function WelcomeScreen({ navigation }) {
  // Using the new expo-video API
  const player = useVideoPlayer(welcomeVideo, (player) => {
    player.loop = true
    player.play()
    player.muted = true
  })

  const handleStartBidding = () => {
    console.log("Start Bidding pressed")
    navigation.replace("Home")
  }

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Background Video */}
      <VideoView
        style={styles.backgroundVideo}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        contentFit="cover"
      />

      {/* Gradient Overlay for content and readability */}
      <LinearGradient colors={["rgba(0, 0, 0, 0.45)", "rgba(0, 0, 0, 1)"]} style={styles.gradientOverlay}>
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={USWLogo} style={styles.logo} resizeMode="contain" />
          </View>

          {/* Content Area */}
          <View style={styles.contentArea}>
            <Text style={styles.descriptionText}>
              Fresh finds are waiting! Place your <Text style={styles.highlightText}>bids</Text>, grab the{" "}
              <Text style={styles.highlightText}>deals</Text>, and shop smart with style.
            </Text>

            {/* Start Bidding Button */}
            <TouchableOpacity style={styles.startButton} onPress={handleStartBidding}>
              <Text style={styles.startButtonText}>Start Bidding!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  contentArea: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 24,
    color: "#FFFCF3",
    textAlign: "left",
    lineHeight: 32,
    marginBottom: 40,
    fontWeight: "400",
    marginLeft: 20,
  },
  highlightText: {
    color: "#a5eea8ff",
    fontWeight: "bold",
  },
  startButton: {
    width: "90%",
    backgroundColor: "#135918",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: "#FFFCF3",
    fontSize: 18,
    fontWeight: "bold",
  },
})

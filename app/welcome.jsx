import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../helpers/common";
import Constants from "expo-constants";
import { theme } from "../constants/theme";
import Button from "../components/Button";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../assets/images/welcome.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["#1188E4", "rgba(0,0,255,0.6)"]}
          style={styles.gradient}
        >
          <ScreenWrapper bg="transparent" style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={{ gap: 20 }}>
              <Text style={styles.title}>
                La aplicación móvil para transformar y automatizar la gestión
                educativa
              </Text>
            </View>

            <View style={styles.footer}>
              <Button
                title="Registrarse"
                buttonStyle={{ marginHorizontal: wp(3) }}
                onPress={() => router.push("signUp")}
              />
              <View style={styles.bottomTextContainer}>
                <Text style={styles.loginText}>Tengo una cuenta - </Text>
                <Pressable onPress={() => router.push("login")}>
                  <Text
                    style={[
                      styles.loginText,
                      {
                        color: theme.colors.primary,
                        fontWeight: theme.fonts.semibold,
                      },
                    ]}
                  >
                    Iniciar Sesión
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScreenWrapper>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1188E4",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: wp(90),
    height: hp(50),
    alignItems: "center",
  },
  logo: {
    height: hp(50),
    width: wp(100),
  },
  title: {
    color: theme.colors.darkLight,
    fontSize: hp(4),
    paddingHorizontal: wp(10),
    textAlign: "center",
    fontWeight: theme.fonts.extraBold,
  },
  footer: {
    gap: 30,
    width: "100%",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.darkLight,
    fontSize: hp(1.6),
  },
});

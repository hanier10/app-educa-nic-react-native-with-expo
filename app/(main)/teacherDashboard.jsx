import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons";
import { useRouter } from "expo-router";
import Avatar from "../../components/Avatar";
import { StatusBar } from "expo-status-bar";
import HomeBannerSlider from "../../components/HomeBannerSlider";
import SubjectCard from "../../components/SubjectCard";

const Home = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  const subjects = [
    {
      subject: "Biología",
      grade: "Undécimo Grado A",
      time: "7:00 AM - 8:30 AM",
      day: "Lunes",
      color: "#FF6B6B",
      url: () => router.push("subjects/biologia"),
    },
    {
      subject: "Química",
      grade: "Undécimo Grado A",
      time: "10:00 AM - 11:30 AM",
      day: "Martes",
      color: "#4ECDC4",
      url: () => router.push("subjects/quimica"),
    },
    {
      subject: "CC:NN",
      grade: "Septimo Grado A",
      time: "9:00 AM - 10:45 AM",
      day: "Miércoles",
      color: "#C44D58",
      url: () => router.push("subjects/ccnnseptimo"),
    },
    {
      subject: "CC:NN",
      grade: "Noveno Grado A",
      time: "8:00 AM - 9:45 AM",
      day: "Jueves",
      color: "#45B7D1",
      url: () => router.push("subjects/ccnnoveno"),
    },
    {
      subject: "Química",
      grade: "Noveno Grado A",
      time: "8:00 AM - 9:45 AM",
      day: "Viernes",
      color: "#FF8C42",
      url: () => router.push("subjects/quimicanoveno"),
    },
  ];

  return (
    <ImageBackground
      source={require("../../assets/images/fondo2.jpg")}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.1 }}
    >
      <ScreenWrapper>
        <StatusBar style="dark" />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>EducaNic</Text>
            <View style={styles.icons}>
              <Pressable onPress={() => router.push("notifications")}>
                <Icon
                  name="heart"
                  size={hp(3)}
                  strokeWidth={2}
                  color={theme.colors.text}
                />
              </Pressable>
              <Pressable onPress={() => router.push("newPost")}>
                <Icon
                  name="plus"
                  size={hp(3)}
                  strokeWidth={2}
                  color={theme.colors.text}
                />
              </Pressable>
              <Pressable onPress={() => router.push("profile")}>
                <Avatar
                  uri={user?.image}
                  size={hp(4.3)}
                  rounded={theme.radius.sm}
                  style={{ borderWidth: 2 }}
                />
              </Pressable>
            </View>
          </View>

          {/* Bienvenida */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bienvenido/a {user?.name}</Text>
          </View>

          <View>
            <HomeBannerSlider />
          </View>

          <View style={styles.subjectsContainer}>
            <Text style={styles.subjectsTitle}>Asignaturas a Impartir</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.subjectsScroll}
            >
              {subjects.map((subject, index) => (
                <SubjectCard key={index} {...subject} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  // ... (keep your existing styles)
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  subjectsContainer: {
    marginTop: hp(3),
    paddingHorizontal: wp(4),
  },
  subjectsTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: hp(2),
  },
  subjectsScroll: {
    flexGrow: 0,
  },
  welcomeContainer: {
    paddingHorizontal: wp(4),
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: theme.colors.text,
  },
});

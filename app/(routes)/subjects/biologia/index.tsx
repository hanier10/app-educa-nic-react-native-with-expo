import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Icon from "@/assets/icons";
import { useRouter } from "expo-router";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/contexts/AuthContext";

export default function index() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={styles.titleBar}>EducaNic</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push("/notifications")}>
              <Icon
                name="heart"
                size={hp(3)}
                strokeWidth={2}
                color={theme.colors.text}
              />
            </Pressable>
            <Pressable onPress={() => router.push("/newPost")}>
              <Icon
                name="plus"
                size={hp(3)}
                strokeWidth={2}
                color={theme.colors.text}
              />
            </Pressable>
            <Pressable onPress={() => router.push("/profile")}>
              <Avatar
                uri={user?.image}
                size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{ borderWidth: 2 }}
              />
            </Pressable>
          </View>
        </View>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.header}>Biología</Text>

        <Image
          source={require("../../../../assets/images/asignatura5.jpg")}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.grade}>Onceavo Grado A</Text>
          <Text style={styles.timeDay}>
            7:00 AM - 8:30 AM • Lunes{" "}
            <Ionicons name="star" size={16} color="#FFD700" /> 30 Estudiantes
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonTextActive}>Opciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonTextInactive}>
              Descripción Asignatura
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.calendarIcon}>
              <Text style={styles.calendarDay}>9</Text>
              <Text style={styles.calendarMonth}>Mayo</Text>
            </View>
            <Text style={styles.optionText}>Registrar Asistencia del día</Text>
            <Ionicons name="chevron-forward" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.gradesIcon}>
              <Ionicons name="document-text" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.optionText}>Registrar Calificaciones</Text>
            <Ionicons name="chevron-forward" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: wp(4),
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  titleBar: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  image: {
    width: wp(50),
    height: wp(50),
    alignSelf: "center",
    marginBottom: hp(2),
    borderRadius: theme.radius.sm,
  },
  detailsContainer: {
    padding: 16,
  },
  grade: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  timeDay: {
    fontSize: 14,
    color: "#666666",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabButtonTextActive: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  tabButtonTextInactive: {
    color: "#666666",
  },
  optionsContainer: {
    padding: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  calendarIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#FF4081",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarDay: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  calendarMonth: {
    color: "#FFFFFF",
    fontSize: 10,
  },
  gradesIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#FF4081",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
});

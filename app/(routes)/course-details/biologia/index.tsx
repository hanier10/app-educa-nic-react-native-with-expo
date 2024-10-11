import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Icon from "../../../../assets/icons";
import { useRouter } from "expo-router";
import { hp, wp } from "../../../../helpers/common";
import { theme } from "../../../../constants/theme";
import Avatar from "../../../../components/Avatar";
import { useAuth } from "../../../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function index() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.title}>Lengua y Literatura</Text>
        </View>
        <View style={styles.content}>
          <Image
            source={require("../../../../assets/images/asignatura1.jpg")}
            style={styles.bookIcon}
          />
          <Text style={styles.description}>
            El desarrollo de la competencia comunicativa constituye una de las
            principales capacidades que se demanda a toda persona para
            desenvolverse en el mundo actual. La comprensión lectora, la
            producción de textos, la escucha y la expresión oral son habilidades
            indispensables tanto en la escuela como en la vida laboral. En todas
            las asignaturas del currículo, los estudiantes utilizan la lectura,
            escriben textos, escuchan las explicaciones orales y toman apuntes
            para asegurar la construcción de aprendizajes significativos.
          </Text>
          <View style={styles.teacherInfo}>
            <Avatar uri={user?.image} size={hp(5)} rounded={theme.radius.sm} />
            <Text style={styles.teacherName}>Docente: Karla Martínez</Text>
          </View>
          <Pressable
            style={styles.button}
            // onPress={() => router.push("/grade")}
          >
            <Text style={styles.buttonText}>Visualizar Mi Calificación</Text>
            <Ionicons name="eye" size={24} color="white" />
          </Pressable>
          <Pressable
            style={styles.button}
            // onPress={() => router.push("/report")}
          >
            <Text style={styles.buttonText}>Reportar un Problema</Text>
            <Ionicons name="warning" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6B2E7E",
    paddingTop: hp(5),
    paddingBottom: hp(2),
    paddingHorizontal: wp(4),
  },
  backButton: {
    marginRight: wp(3),
  },
  title: {
    color: "white",
    fontSize: hp(2.5),
    fontWeight: "bold",
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
  content: {
    flex: 1,
    padding: wp(4),
  },
  bookIcon: {
    width: wp(30),
    height: wp(30),
    alignSelf: "center",
    marginBottom: hp(2),
  },
  description: {
    fontSize: hp(1.8),
    color: theme.colors.text,
    marginBottom: hp(2),
  },
  teacherInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(3),
  },
  teacherName: {
    marginLeft: wp(3),
    fontSize: hp(2),
    color: theme.colors.text,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6B2E7E",
    padding: wp(4),
    borderRadius: theme.radius.sm,
    marginBottom: hp(2),
  },
  buttonText: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "bold",
  },
});

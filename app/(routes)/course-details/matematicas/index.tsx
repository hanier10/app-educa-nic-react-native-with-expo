import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Icon from "../../../../assets/icons";
import { useRouter } from "expo-router";
import { hp, wp } from "../../../../helpers/common";
import { theme } from "../../../../constants/theme";
import Avatar from "../../../../components/Avatar";
import { useAuth } from "../../../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();
  const [showGrades, setShowGrades] = useState(false);
  const [firstTermGrade, setFirstTermGrade] = useState<number | null>(null);
  const [secondTermGrade, setSecondTermGrade] = useState<number | null>(null);
  const [thirdTermGrade, setThirdTermGrade] = useState<number | null>(null);
  const [fourthTermGrade, setFourthTermGrade] = useState<number | null>(null);

  const toggleGrades = () => {
    setShowGrades(!showGrades);
  };

  const showFirstTermGrade = () => {
    setFirstTermGrade(95);
  };

  const showSecondTermGrade = () => {
    setSecondTermGrade(85);
  };

  const showThirdTermGrade = () => {
    setThirdTermGrade(90);
  };

  const showFourthTermGrade = () => {
    setFourthTermGrade(100);
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <ScrollView>
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
            <Text style={styles.title}>Matemáticas</Text>
          </View>
          <View style={styles.content}>
            <Image
              source={require("../../../../assets/images/asignatura3.jpg")}
              style={styles.bookIcon}
            />
            <Text style={styles.description}>
              La matemática es una herramienta potente en el desarrollo de cada
              una de nuestras vidas; nos ayuda a resolver problemas complejos
              con mayor facilidad, a contar con un razonamiento matemático capaz
              de ser crítico, analítico y práctico. En definitiva, a vivir con
              éxito, en un mundo cada vez más desafiante ante los cambios
              sociales y los avances tecnológicos.
            </Text>
            <View style={styles.teacherInfo}>
              <Image
                source={require("../../../../assets/images/docente2.jpg")}
                style={styles.teacherImage}
              />
              <Text style={styles.teacherName}>Docente: Braulio González</Text>
            </View>
            <Pressable style={styles.button} onPress={toggleGrades}>
              <Text style={styles.buttonText}>Visualizar Mi Calificación</Text>
              <Ionicons
                name={showGrades ? "eye-off" : "eye"}
                size={24}
                color="white"
              />
            </Pressable>
            <Pressable
              style={styles.button}
              // onPress={() => router.push("/notes-details/biologia")}
            >
              <Text style={styles.buttonText}>Reportar un Problema</Text>
              <Ionicons name="warning" size={24} color="white" />
            </Pressable>
          </View>
          {showGrades && (
            <View style={styles.gradesContainer}>
              <Text style={styles.gradesTitle}>Calificaciones</Text>
              <Pressable
                style={styles.gradeButton}
                onPress={showFirstTermGrade}
              >
                <Text style={styles.gradeButtonText}>1</Text>
                <Text style={styles.gradeButtonLabel}>
                  Visualizar Primer Corte
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.colors.primary}
                />
              </Pressable>
              {firstTermGrade !== null && (
                <Text style={styles.gradeDisplay}>
                  Nota del Primer Corte: {firstTermGrade}
                </Text>
              )}
              <Pressable
                style={styles.gradeButton}
                onPress={showSecondTermGrade}
              >
                <Text style={styles.gradeButtonText}>2</Text>
                <Text style={styles.gradeButtonLabel}>
                  Visualizar Segundo Corte
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.colors.primary}
                />
              </Pressable>
              {secondTermGrade !== null && (
                <Text style={styles.gradeDisplay}>
                  Nota del Segundo Corte: {secondTermGrade}
                </Text>
              )}
              <Pressable
                style={styles.gradeButton}
                onPress={showThirdTermGrade}
              >
                <Text style={styles.gradeButtonText}>3</Text>
                <Text style={styles.gradeButtonLabel}>
                  Visualizar Tercer Corte
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.colors.primary}
                />
              </Pressable>
              {thirdTermGrade !== null && (
                <Text style={styles.gradeDisplay}>
                  Nota del Tercer Corte: {thirdTermGrade}
                </Text>
              )}
              <Pressable
                style={styles.gradeButton}
                onPress={showFourthTermGrade}
              >
                <Text style={styles.gradeButtonText}>4</Text>
                <Text style={styles.gradeButtonLabel}>
                  Visualizar Cuarto Corte
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.colors.primary}
                />
              </Pressable>
              {fourthTermGrade !== null && (
                <Text style={styles.gradeDisplay}>
                  Nota del Cuarto Corte: {fourthTermGrade}
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
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
  teacherImage: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    marginRight: wp(3),
  },
  bookIcon: {
    width: wp(30),
    height: wp(30),
    alignSelf: "center",
    marginBottom: hp(2),
    borderRadius: theme.radius.sm,
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
    fontWeight: "bold",
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
  gradesContainer: {
    padding: wp(4),
    backgroundColor: "#f0f0f0",
    borderRadius: theme.radius.md,
    marginHorizontal: wp(4),
    marginBottom: hp(2),
  },
  gradesTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: hp(2),
  },
  gradeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: wp(4),
    borderRadius: theme.radius.sm,
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: theme.colors.gray,
  },
  gradeButtonText: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: theme.colors.primary,
    color: "white",
    fontSize: hp(2.5),
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: wp(8),
    marginRight: wp(3),
  },
  gradeButtonLabel: {
    flex: 1,
    fontSize: hp(2),
    color: theme.colors.text,
    fontWeight: "bold",
  },
  gradeDisplay: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
    marginBottom: hp(2),
  },
});

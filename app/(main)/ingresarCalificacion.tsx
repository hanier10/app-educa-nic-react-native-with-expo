import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { ChevronRight, Trash2 } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Icon from "@/assets/icons";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";

interface Grade {
  corte: string;
  grade: string;
}

export default function StudentGradeRecorder() {
  const { user } = useAuth();
  const router = useRouter();
  const { studentId, studentName, studentImage } = useLocalSearchParams();

  const [grades, setGrades] = useState<Grade[]>([]);
  const [currentGrade, setCurrentGrade] = useState("");
  const [editingCorte, setEditingCorte] = useState("");

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    const { data, error } = await supabase
      .from("estudiantes")
      .select("nota1, nota2, nota3, nota4")
      .eq("id", studentId)
      .order("name", { ascending: false })
      .single();

    if (error) {
      console.error("Error fetching grades:", error);
    } else {
      const fetchedGrades: Grade[] = [
        { corte: "1", grade: data.nota1?.toString() || "" },
        { corte: "2", grade: data.nota2?.toString() || "" },
        { corte: "3", grade: data.nota3?.toString() || "" },
        { corte: "4", grade: data.nota4?.toString() || "" },
      ];
      setGrades(fetchedGrades);
    }
  };

  const saveGrade = async (corte: string) => {
    if (currentGrade === "") {
      Alert.alert("Error", "Por favor ingrese una calificación");
      return;
    }

    const gradeField = `nota${corte}`;
    const { error } = await supabase
      .from("estudiantes")
      .update({ [gradeField]: parseFloat(currentGrade) })
      .eq("id", studentId);

    if (error) {
      console.error("Error saving grade:", error);
      Alert.alert("Error", "No se pudo guardar la calificación");
    } else {
      const newGrades = grades.map((g) =>
        g.corte === corte ? { ...g, grade: currentGrade } : g
      );
      setGrades(newGrades);
      setCurrentGrade("");
      setEditingCorte("");
      Alert.alert("Éxito", "Calificación guardada correctamente");
    }
  };

  const deleteGrade = async (corte: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar esta calificación?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const gradeField = `nota${corte}`;
            const { error } = await supabase
              .from("estudiantes")
              .update({ [gradeField]: null })
              .eq("id", studentId);

            if (error) {
              console.error("Error deleting grade:", error);
              Alert.alert("Error", "No se pudo eliminar la calificación");
            } else {
              const newGrades = grades.map((g) =>
                g.corte === corte ? { ...g, grade: "" } : g
              );
              setGrades(newGrades);
              Alert.alert("Éxito", "Calificación eliminada correctamente");
            }
          },
        },
      ]
    );
  };

  const renderGradeInput = (corte: string) => {
    if (editingCorte === corte) {
      return (
        <View style={styles.gradeInputContainer}>
          <TextInput
            style={styles.gradeInput}
            value={currentGrade}
            onChangeText={setCurrentGrade}
            keyboardType="numeric"
            placeholder="Ingrese la calificación"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveGrade(corte)}
          >
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const cortes = [
    { id: "1", name: "Primer Corte" },
    { id: "2", name: "Segundo Corte" },
    { id: "3", name: "Tercer Corte" },
    { id: "4", name: "Cuarto Corte" },
  ];

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

      <ScrollView style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calificaciones del Estudiante</Text>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: studentImage as string }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.studentName}>{studentName as string}</Text>
        {cortes.map((corte) => (
          <View key={corte.id}>
            <TouchableOpacity
              style={styles.gradeOption}
              onPress={() => setEditingCorte(corte.id)}
            >
              <View style={styles.gradeOptionContent}>
                <View style={styles.gradeOptionNumber}>
                  <Text style={styles.gradeOptionNumberText}>{corte.id}</Text>
                </View>
                <Text
                  style={styles.gradeOptionText}
                >{`Registrar ${corte.name}`}</Text>
              </View>
              <ChevronRight color="#000" size={24} />
            </TouchableOpacity>
            {renderGradeInput(corte.id)}
            {grades.find((g) => g.corte === corte.id)?.grade && (
              <View style={styles.savedGradeContainer}>
                <Text style={styles.savedGrade}>
                  Calificación:{" "}
                  {grades.find((g) => g.corte === corte.id)?.grade}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteGrade(corte.id)}
                >
                  <Trash2 color="#fff" size={20} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: wp(4),
    padding: 16,
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
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  studentName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e91e63",
    marginTop: 10,
    textAlign: "center",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  gradeOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  gradeOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  gradeOptionNumber: {
    backgroundColor: "#ffeb3b",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  gradeOptionNumberText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gradeOptionText: {
    fontSize: 16,
    color: "#333",
  },
  gradeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  gradeInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    marginLeft: 10,
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  savedGradeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  savedGrade: {
    fontSize: 16,
    color: "#4caf50",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
});

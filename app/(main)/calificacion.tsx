import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Eye } from "lucide-react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Icon from "@/assets/icons";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";

interface Student {
  id: string;
  name: string;
  imageurl: string;
}

export default function GradeRecorder() {
  const { user } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const { data, error } = await supabase.from("estudiantes").select("*");

    if (error) {
      console.error("Error fetching students:", error);
    } else {
      setStudents(data);
    }
  }

  const navigateToIngresarCalificacion = (student: Student) => {
    router.push({
      pathname: "/ingresarCalificacion",
      params: {
        studentId: student.id,
        studentName: student.name,
        studentImage: student.imageurl,
      },
    });
  };

  const StudentItem = ({ student }: { student: Student }) => (
    <TouchableOpacity
      style={styles.studentItem}
      onPress={() => navigateToIngresarCalificacion(student)}
    >
      <Image source={{ uri: student.imageurl }} style={styles.avatar} />
      <Text style={styles.name}>{student.name}</Text>
      <View style={styles.eyeButton}>
        <View style={styles.eyeCircle}>
          <Eye size={20} color="#000" />
        </View>
      </View>
    </TouchableOpacity>
  );

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

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Registro Calificaciones</Text>
      </View>
      <FlatList
        data={students}
        renderItem={({ item }) => <StudentItem student={item} />}
        keyExtractor={(item) => item.id}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subject: {
    fontSize: 18,
    color: "#e91e63",
    marginTop: 5,
  },
  grade: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeButton: {
    padding: 5,
  },
  eyeCircle: {
    backgroundColor: "#ffeb3b",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

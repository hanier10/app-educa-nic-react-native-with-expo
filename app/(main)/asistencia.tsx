import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Icon from "@/assets/icons";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { supabase } from "@/lib/supabase";
import { ThumbsUp } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";

interface Student {
  id: string;
  name: string;
  imageurl: string;
  asistencia: boolean;
}

const AttendanceItem = ({
  student,
  onToggleAttendance,
}: {
  student: Student;
  onToggleAttendance: (id: string) => void;
}) => (
  <View style={styles.studentItem}>
    <Image source={{ uri: student.imageurl }} style={styles.avatar} />
    <Text style={styles.name}>{student.name}</Text>
    <TouchableOpacity onPress={() => onToggleAttendance(student.id)}>
      <View
        style={[
          styles.attendanceButton,
          student.asistencia ? styles.attendanceButtonActive : {},
        ]}
      >
        <ThumbsUp
          size={24}
          color={student.asistencia ? "#ffffff" : "#000000"}
        />
      </View>
    </TouchableOpacity>
  </View>
);

export default function AttendanceList() {
  const { user } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from("estudiantes")
      .select("id, name, imageurl, asistencia");

    if (error) {
      console.error("Error fetching students:", error);
    } else {
      setStudents(data || []);
    }
  };

  const toggleAttendance = async (id: string) => {
    const studentToUpdate = students.find((s) => s.id === id);
    if (!studentToUpdate) return;

    const newAttendanceStatus = !studentToUpdate.asistencia;

    const { error } = await supabase
      .from("estudiantes")
      .update({ asistencia: newAttendanceStatus })
      .order("name", { ascending: true })
      .eq("id", id);

    if (error) {
      console.error("Error updating attendance:", error);
    } else {
      setStudents(
        students.map((s) =>
          s.id === id ? { ...s, asistencia: newAttendanceStatus } : s
        )
      );
    }
  };

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
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.header}>Registro Asistencia del día</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
          })}
        </Text>
        <FlatList
          data={students}
          renderItem={({ item }) => (
            <AttendanceItem
              student={item}
              onToggleAttendance={toggleAttendance}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
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
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#757575",
  },
  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  attendanceButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 20,
  },
  attendanceButtonActive: {
    backgroundColor: "#4caf50",
  },
});

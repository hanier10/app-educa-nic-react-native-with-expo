import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TeacherCard = ({ name, image, subject, url }) => (
  <View style={styles.teacherCard}>
    <Image source={{ uri: image }} style={styles.teacherImage} />
    <Text style={styles.teacherName}>{name}</Text>
    <Text style={styles.teacherSubject}>{subject}</Text>
    <TouchableOpacity style={styles.viewButton}>
      <Text style={styles.viewButtonText} onPress={url}>
        Ver Asignatura
      </Text>
    </TouchableOpacity>
  </View>
);

const SubjectCard = ({ name, icon, schedule, url }) => (
  <View style={styles.subjectCard}>
    <View style={styles.subjectIconContainer}>{icon}</View>
    <View style={styles.subjectInfo}>
      <Text style={styles.subjectName}>{name}</Text>
      <Text style={styles.subjectSchedule}>{schedule}</Text>
    </View>
    <TouchableOpacity style={styles.viewSubjectButton}>
      <Text style={styles.viewSubjectButtonText} onPress={url}>
        Ver
      </Text>
    </TouchableOpacity>
  </View>
);

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const timeSlots = ["7:00 AM", "8:30 AM", "10:00 AM", "11:30 AM", "12:45 PM"];

  const schedule = {
    Lunes: [
      "Matemáticas",
      "Lengua y Literatura",
      "Receso",
      "Creciendo en Valores",
      "AEP",
    ],
    Martes: ["EE.FF.", "AEP", "Receso", "Biología", "Ciencias Sociales"],
    Miércoles: [
      "Computación",
      "Lengua y Literatura",
      "Receso",
      "Matemáticas",
      "EE.FF.",
    ],
    Jueves: ["Física", "Química", "Receso", "Historia", "Inglés"],
    Viernes: ["TAC", "Lengua y Literatura", "Receso", "Matemáticas", "Física"],
  };

  const teachers = [
    {
      name: "Karla Martínez",
      image:
        "https://xlljrtxdeirlipgxfsnr.supabase.co/storage/v1/object/public/uploads/docentes/docente1.jpg",
      subject: "Biología",
      url: () => router.push("course-details/biologia"),
    },
    {
      name: "Braulio González",
      image:
        "https://xlljrtxdeirlipgxfsnr.supabase.co/storage/v1/object/public/uploads/docentes/docente2.jpg?t=2024-10-14T08%3A58%3A18.803Z",
      subject: "Matemáticas",
      url: () => router.push("course-details/matematicas"),
    },
    {
      name: "Marlon Calero",
      image:
        "https://xlljrtxdeirlipgxfsnr.supabase.co/storage/v1/object/public/uploads/docentes/docente3.jpeg",
      subject: "Física",
      url: () => router.push("course-details/fisica"),
    },
    {
      name: "Martha Moraga",
      image:
        "https://xlljrtxdeirlipgxfsnr.supabase.co/storage/v1/object/public/uploads/docentes/docente4.jpeg",
      subject: "Computación",
      url: () => router.push("course-details/computacion"),
    },
  ];

  const subjects = [
    {
      name: "Lengua y Literatura",
      icon: <Ionicons name="book-outline" size={24} color="#007AFF" />,
      schedule: "Lunes: 08:30 AM a 10:30 AM",
      url: () => router.push("course-details/lengua"),
    },
    {
      name: "Química",
      icon: <Ionicons name="flask-outline" size={24} color="#007AFF" />,
      schedule: "Jueves: 08:30 AM a 10:30 AM",
      url: () => router.push("course-details/quimica"),
    },
    {
      name: "Historia",
      icon: <Ionicons name="earth" size={24} color="#007AFF" />,
      schedule: "Jueves: 11:30 AM a 12:45 MD",
      url: () => router.push("course-details/historia"),
    },
  ];

  return (
    <ImageBackground
      source={require("../../assets/images/fondo2.jpg")}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.1 }}
    >
      {/* <LinearGradient
        colors={["#1188E4", "rgba(0,0,255,0.6)"]}
        style={styles.gradient}
      > */}
      <ScreenWrapper>
        <StatusBar style="dark" />
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, styles.lightText]}>EducaNic</Text>
            <View style={styles.icons}>
              <Pressable onPress={() => router.push("notifications")}>
                <Icon name="heart" size={hp(3)} strokeWidth={2} color="dark" />
              </Pressable>
              <Pressable onPress={() => router.push("newPost")}>
                <Icon name="plus" size={hp(3)} strokeWidth={2} color="dark" />
              </Pressable>
              <Pressable onPress={() => router.push("profile")}>
                <Avatar
                  uri={user?.image}
                  size={hp(4.3)}
                  rounded={theme.radius.sm}
                  style={{ borderWidth: 2, borderColor: "white" }}
                />
              </Pressable>
            </View>
          </View>

          {/* Bienvenida */}
          <View style={styles.welcomeContainer}>
            <Text style={[styles.welcomeText, styles.lightText]}>
              Bienvenido/a {user?.name}
            </Text>
          </View>

          {/* Home Banner Slider */}
          <View>
            <HomeBannerSlider />
          </View>

          {/* Mis Docentes */}
          <View style={styles.headerSection}>
            <Text style={[styles.headerTitle, styles.lightText]}>
              Mis Docentes
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, styles.lightText]}>
                Ver Todos
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.teachersContainer}
          >
            {teachers.map((teacher, index) => (
              <TeacherCard key={index} {...teacher} />
            ))}
          </ScrollView>

          {/* Mis Asignaturas */}
          <View style={styles.headerSection}>
            <Text style={[styles.headerTitle, styles.lightText]}>
              Asignaturas Vistas Recientemente
            </Text>
          </View>
          <View style={styles.subjectsContainer}>
            {subjects.map((subject, index) => (
              <SubjectCard key={index} {...subject} />
            ))}
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Horario Semanal</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.table}>
                <View style={styles.column}>
                  <View style={styles.timeHeader}>
                    <Text style={styles.timeHeaderText}>Hora</Text>
                  </View>
                  {timeSlots.map((time, index) => (
                    <View key={index} style={styles.timeCell}>
                      <Text style={styles.timeText}>{time}</Text>
                    </View>
                  ))}
                </View>
                {weekDays.map((day, index) => (
                  <View key={index} style={styles.column}>
                    <View style={styles.dayHeader}>
                      <Text style={styles.dayText}>{day}</Text>
                    </View>
                    {schedule[day].map((subject, subIndex) => (
                      <View key={subIndex} style={styles.cell}>
                        <Text style={styles.subjectText}>{subject}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </ScreenWrapper>
      {/* </LinearGradient> */}
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  lightText: {
    color: "dark",
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
  welcomeContainer: {
    paddingHorizontal: wp(4),
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: theme.colors.text,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
    marginVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#007AFF",
  },
  teachersContainer: {
    paddingLeft: 16,
  },
  teacherCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    alignItems: "center",
    width: 150,
  },
  teacherImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  teacherName: {
    fontWeight: "bold",
    textAlign: "center",
  },
  teacherSubject: {
    color: "#666",
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewButtonText: {
    color: "white",
    fontSize: 12,
  },
  subjectsContainer: {
    paddingHorizontal: 16,
  },
  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  subjectIconContainer: {
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    padding: 8,
    marginRight: 16,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  subjectSchedule: {
    color: "#666",
    fontSize: 12,
  },
  viewSubjectButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewSubjectButtonText: {
    color: "white",
    fontSize: 12,
  },

  container: {
    marginVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginBottom: hp(2),
    color: theme.colors.text,
  },
  table: {
    flexDirection: "row",
  },
  column: {
    width: wp(30),
    marginRight: wp(1),
  },
  timeHeader: {
    backgroundColor: "#007AFF",
    padding: wp(2),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  timeHeaderText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  dayHeader: {
    backgroundColor: "#007AFF",
    padding: wp(2),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dayText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    backgroundColor: "white",
    padding: wp(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: hp(8),
    justifyContent: "center",
  },
  timeCell: {
    backgroundColor: theme.colors.background,
    padding: wp(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: hp(8),
    justifyContent: "center",
  },
  subjectText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  timeText: {
    textAlign: "center",
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: hp(1.6),
  },
});

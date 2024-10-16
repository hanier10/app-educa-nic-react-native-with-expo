import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ImageBackground,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../contexts/AuthContext";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons";
import Avatar from "../../components/Avatar";
import HomeBannerSlider from "../../components/HomeBannerSlider";
import SubjectCard from "../../components/SubjectCard";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedAttendance, setSelectedAttendance] = useState(0);

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

  const attendanceData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie"],
    datasets: [
      {
        data: [96, 98, 100, 97, 100],
      },
    ],
  };

  const totalStudents = 30; // Asumimos que hay 100 estudiantes en total

  const handleBarClick = (index) => {
    const day = attendanceData.labels[index];
    const attendance = attendanceData.datasets[0].data[index];
    const studentsPresent = Math.round((attendance / 30) * totalStudents);
    setSelectedDay(day);
    setSelectedAttendance(studentsPresent);
    setModalVisible(true);
  };

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

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bienvenido/a {user?.name}</Text>
          </View>

          <HomeBannerSlider />

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Asistencia Semanal</Text>
            <BarChart
              data={attendanceData}
              width={Dimensions.get("window").width - wp(8)}
              height={220}
              yAxisLabel="%"
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Color verde para las barras
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.8,
                fillShadowGradient: "rgba(75, 192, 192, 1)", // Relleno verde sólido
                fillShadowGradientOpacity: 1,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              onDataPointClick={({ index }) => handleBarClick(index)}
            />
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {selectedDay}: {selectedAttendance} estudiantes asistieron
            </Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  chartContainer: {
    marginTop: hp(3),
    paddingHorizontal: wp(4),
  },
  chartTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: hp(2),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

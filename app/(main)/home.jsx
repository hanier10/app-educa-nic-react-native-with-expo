import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

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
        "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5KJIUUU6FWXGRDI672TKQCKBN56%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2OTEyMDAifQ.E-ioQhTS0f8MrWoC_skt278cwoAb6l6uieywG17_Nf09tB5OYK9p0MGTMNlaJXgi16X5g4O_QYN7_IqaonpITasrIFUe78sjCggd0FcxkXpXb7xPZkq8JwIqG7Y-dDir2YAjAlIox6ku05WaxJ2o6Zr75V59t4I2LAE44VK12rwFolSF5wfPeDmErTnjqNY_r2nXnFu1uOIBGPmQWm76jZHOnPaPhfcFYllEsdedZSCFGvv02QLgh28N9Z0yCy8AhwZwuIHB5p-k89h9Nl5U2IrnkoqQeOHCjt2fdgIkZiskFeMTcbKm-_yVRJMGbDzVgVdVHrSTIqaYVIj1LQ5W7svJ8nWVPEaqzjwkyD_xcdk.ajPeuv0TwzA9TUy0pyBZdIeLX6ZWzSP2ilx_BpvFoBg%26version%3DPublished&cb=63864218070&encodeFailures=1&width=516&height=528",
      subject: "Biología",
      url: () => router.push("course-details/biologia"),
    },
    {
      name: "Braulio González",
      image:
        "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5KCBKDG4UFHW5B3ARSWPH2DJ6PU%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2OTEyMDAifQ.oiWkeSXeovf20bF1m1xl9OFSGwHk7CK_WPZYkHBEeVgR_DXpGmJ5T4tN-o8k41gFdmU9oVTtX50W5S-1_12eR6eFFXGLKd3gpSG4wNFGWh9IETKEuLJfkrrNocAoMHx6bmlOGXLX1aw-oy9v91DqSiOF1WLe7qvmqkbz9m3MUKsktGJWSlEH6GPuA4f4NShz40eggFshFvyzgQLhm5W_wvCFcAPI_9Y8UVvODw53KEJV3gnrBOW7K6eAaV--stM_lylyjzG5UMbvyHiURDziZxkZIEiT5Wj0dBD59ItcNX9JzxtyXt10jQ6tYRWg43vTDONwta_qWuKVQJTDdXhaTm7IG3ECnt70g2Z5HO6_r4U.oMe7q5S6aqpsFC24wQ8hXyq5B0nMVCI29qg8BReI69s%26version%3DPublished&cb=63864218071&encodeFailures=1&width=240&height=240",
      subject: "Matemáticas",
      url: () => router.push("course-details/matematicas"),
    },
    {
      name: "Marlon Calero",
      image:
        "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpeg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5MYBIFXJOXPQJC3VRRESN2UE2XA%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2OTEyMDAifQ.sU5_GQn-riP97GafXdR9Llf6RrU391OCzilPPuxsrUZ90lsH9zQV0NejBVAVl7iVd8CMU6E7AKtssUupBldwlMEE2HURvjsfZ0LmSm4eU_GIB00dL-Pu9xADC7M-2py7oApFnfrmO7PU8fSluEI2J-iMeChLSvH48-qX2ZX3UlOSeLbeVCwStD3gxa2YbT2KJOFjWhUgkPbBNETeQV_pKoCLW2Tjy22rdQ1kSlsR2FvhnEOAXFXaohgXZwUXhvy-cmj54Fv2hsBIC-AzUiwHoOB3-7hbRvG7Q5ZaWRw_PgLwXXx-LJLL-vhlbVQauTkKLqrQOaxhPs3Wx19RetVjBxAO57i9B2e3asXRm04gnZQ.RL4mHO5ua_MoXY2b0yX5i05dWgktx-8tSujAhEl64ac%26version%3DPublished&cb=63864218070&encodeFailures=1&width=175&height=174",
      subject: "Física",
      url: () => router.push("course-details/fisica"),
    },
    {
      name: "Martha Moraga",
      image:
        "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpeg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5ORVJBBQDVTQREYOLYH77OVROLF%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2OTEyMDAifQ.dj5VnfFhH-tJviDx487FAyCLxn5U2f7i_wUEQGEC_jh5D4wnPOWI3VgMj6xYW_JhmeJxJ4zwgyB898_U6JMNgsmNoNdUC_ilvCbs7UCW2jTDrQf-IB7xdQI8zNjNDnse2PKPMMJdz_6rJSAVexwkEG0fiE8KaVtEu9Tl6eB9otIVH2Q4sPHyse-sA5EoRQLV_rhTqZqB7pJJgjXn-08O_SSvfAnL3T-sYfW1SLFI5fP2_cUwxGbtmGDR3UFF6T-6NYkUPsb0qk3lQOR3_ge-kNvX0cLp8pBXo2ejua2KZL0NW9ShnmaNIeGBsfHRfzgWfBtbCQRE8i6u6xa-Lr1vULUOzBdOi7L8uViStR_1Bxg.FmyPLJDbUB82sEGf-oTCyIrAD0nswfaIqt0s1XWhwko%26version%3DPublished&cb=63864218308&encodeFailures=1&width=215&height=188",
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
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <ScrollView>
        {/* Header */}
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

        {/* Home Banner Slider */}
        <View>
          <HomeBannerSlider />
        </View>

        {/* Mis Docentes */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Mis Docentes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>Ver Todos</Text>
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
          <Text style={styles.headerTitle}>
            Asignaturas Vistas Recientemente
          </Text>
          {/* <TouchableOpacity>
            <Text style={styles.viewAllText}>Ver todas</Text>
          </TouchableOpacity> */}
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
  );
};

export default Home;

const styles = StyleSheet.create({
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

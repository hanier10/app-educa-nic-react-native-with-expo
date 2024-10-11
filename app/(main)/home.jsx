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

const SubjectCard = ({ name, icon, schedule }) => (
  <View style={styles.subjectCard}>
    <View style={styles.subjectIconContainer}>{icon}</View>
    <View style={styles.subjectInfo}>
      <Text style={styles.subjectName}>{name}</Text>
      <Text style={styles.subjectSchedule}>{schedule}</Text>
    </View>
    <TouchableOpacity style={styles.viewSubjectButton}>
      <Text style={styles.viewSubjectButtonText}>Ver</Text>
    </TouchableOpacity>
  </View>
);

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  const teachers = [
    {
      name: "Karla Martínez",
      image:
        "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5KJIUUU6FWXGRDI672TKQCKBN56%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2MzcyMDAifQ.aaJ2lquoh2lhCESJZ_LQdRQ7tNBPzWbt9HLh7V2S_vz1tAEOC1l8EWMmZEl0-biDFZRNVbLkGccQRvbewc3ptatlYzFi8L7UCkU4UDR0iLmI1M7ulfCMsIt_u6V3DSyDqgeD2mMZu3ean6yKRMS_RV9fkGQEkVeM7Pv9iAuJvxQTqFkXeTajG9d9oJixxlhPJ5CFRGTnJv3Lp4esXRl1LDgJVHnCfeVckoXrhQ_-ZtPUXsJZbxnscMw1XcwgoP-h86vibVU4HccuPglmuPdJq_uEDXirkdF0CKfOrEAU7mm0EcjLUXBCgLyYy50mfh0p85ZIc7CFjBOYYdlTgL1QoF5lwIz6iXaDYseKRw7ab2-yl74S51MRKJiytyqB6eQ-.GwpzeWFQSjF3pSiYhUK7x5A1nUdx_0TQ7XPUHE3VVZc%26version%3DPublished&cb=63864218070&encodeFailures=1&width=1920&height=886&action=Access",
      subject: "Biología",
      url: () => router.push("course-details/biologia"),
    },
    {
      name: "Braulio González",
      image:
        "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5KCBKDG4UFHW5B3ARSWPH2DJ6PU%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2MzcyMDAifQ.8VKxJ0NdIeHlsaKVhHTby68nnYwbnTZApEiYdtYEpwdkVqjIyZnHZ38kQN4IDv_-GFz7SJhsZTYehL3PNW4mmJDqvxzThPcgL8Y-Im0bJkpWJm-bY4BxKapgjgn_M_tBRT7sRFKdVlaiSGf64KwWj4mXhqp-fl_6oMYt_Tey2ZWEQsgdw3Iu_AwJRGpFw4rSn6UK4egTIq2k8j5SfKQvif65uorWHJKxfbq2pFhvGpgVs-Fyw2yhcN4p8ZkUeCUMzp7uIsX8E5gUNOJW8CVQHOGmALmnV_Vv7IgdBDT1OG06AixGC9zGRqEbR6jcMINJUWeFJ5_Iok6POmTw2dRlNx3fKoAWcNaqvxp-I3673G2fb_qkRWBbGdyQ7BH4Gcxc.tXUh4HWyEIYX7y-GXiwTmx_TnfrFG22Dhy4xQhMMVYY%26version%3DPublished&cb=63864218071&encodeFailures=1&width=240&height=240",
      subject: "Matemáticas",
      url: () => router.push("course-details/matematicas"),
    },
    {
      name: "Marlon Calero",
      image:
        "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpeg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5MYBIFXJOXPQJC3VRRESN2UE2XA%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2MzcyMDAifQ.2T_xnhaXYPPuLGHrW_rKLGnpSqTfKKCWX2qGwzsBS31ORCLfNfLmdw3Dfttt0e1m2fveTxE7bzMnZQNYRVGmM9lIg6Pqyq1Ncwod42ks4x4lTXaXbPYg9aQTU5soypmc-aAcZyQV7vceXO1RPlQktI195uHMg5Put2bdYTfjkO5Ka8JwWWSfo2DEwH_-ji5waLvgOcOT9XM0UF27Arhn7AkfpyD76aBE1iiPjD51jnJOIw9Qkl3XdDHU-5VdJnUM87RZx5SYllNs6rujsJgfL7FFLZjDktD1zuvNqbtAKzxaFi7uMFrqP1a134iLdxN9fnxj_XmlO-VUvs2ykX_DDWOf9XuCAwKsGJ9iHbLTN1lbdgxcXPINUtzRNOfVfLrJ.WKxHhaBH0eQtxVoKCYUFr06-mc_Y976FOY98VGFfYjs%26version%3DPublished&cb=63864218070&encodeFailures=1&width=175&height=174",
      subject: "Física",
      url: () => router.push("course-details/fisica"),
    },
    {
      name: "Martha Moraga",
      image:
        "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpeg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5ORVJBBQDVTQREYOLYH77OVROLF%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2MzcyMDAifQ.y2Wool86qWpmXXWBLVAPZsN0Epw1K-HJxPjK1bwg2Txl-2Hd-LEtSfkd1a1pcd8gUlWeDv43gALunFdsjoAvcVu6zBZahUhGGTCHWw_TqhR3SLyzpU3znBU25GX4WOVZcuigMRuk5VCPkTY5zbvMGRUPKHuntMUPYV9TqSpRatdx-MVWXALRHNUZbGvPvsVVE6DN4KC-T3Z0aojqXK8yFVNm7O8cKf2uUWKdcPJ71M2fcYH6VjBboOfMUA9OO-s_HmyXbIAlTYd9qlW-0dnPI5iXOaU8OaTF_hDxyxNcBPBJZatNNyb3Fyn4RN4KrCF_ieWVZDTQ7p-8xmfLgFNec1PD23AHDyTtc-Yd6hMdmGltqh6hazdW7K5Ehitqx5nS.xOW5IiUra2NFpQtNLASR_-_sKKD0Anrg7xGwBhx-Z4A%26version%3DPublished&cb=63864218308&encodeFailures=1&width=1920&height=886",
      subject: "Computación",
      url: () => router.push("course-details/computacion"),
    },
  ];

  const subjects = [
    {
      name: "Lengua y Literatura",
      icon: <Ionicons name="book-outline" size={24} color="#007AFF" />,
      schedule: "Viernes: 10:30 AM a 12:00 PM",
    },
    {
      name: "Química",
      icon: <Ionicons name="flask-outline" size={24} color="#007AFF" />,
      schedule: "Lunes: 9:00 AM a 10:30 AM",
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
          <Text style={styles.welcomeText}>Bienvenido {user?.name}</Text>
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
          <Text style={styles.headerTitle}>Mis Asignaturas</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subjectsContainer}>
          {subjects.map((subject, index) => (
            <SubjectCard key={index} {...subject} />
          ))}
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
});

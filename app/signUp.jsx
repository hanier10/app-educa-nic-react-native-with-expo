import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import Icon from "../assets/icons";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import { useRouter } from "expo-router";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Input from "../components/Input";
import ButtonGeneral from "../components/ButtonGeneral";
import { supabase } from "../lib/supabase";

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !nameRef.current ||
      !role
    ) {
      Alert.alert("Registrarse", "Por favor rellene todos los campos");
      return;
    }

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();
    // let role = role.current.trim();

    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });
    setLoading(false);

    // console.log("session: ", session);
    // console.log("error: ", error);
    if (error) {
      Alert.alert("Error", error.message);
    }

    // if (role === "student") {
    //   router.push("home");
    // } else if (role === "teacher") {
    //   router.push("teacherDashboard");
    // }

    // console.log("session: ", session);
    // console.log("error: ", error);
    // if (error) {
    //   Alert.alert("Error", error.message);
    // }

    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: {
    //       name,
    //       role,
    //     },
    //   },
    // });

    // if (error) {
    //   setLoading(false);
    //   Alert.alert("Error", error.message);
    //   return;
    // }

    // if (data.user) {
    //   // El trigger se encargará de insertar los datos en public.users
    //   setLoading(false);
    //   Alert.alert("Éxito", "Usuario registrado correctamente");
    //   router.push("login");
    // }
  };

  const RoleOption = ({ value, label }) => (
    <TouchableOpacity
      style={[styles.roleOption, role === value && styles.roleOptionSelected]}
      onPress={() => setRole(value)}
    >
      <Text
        style={[
          styles.roleOptionText,
          role === value && styles.roleOptionTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        <View>
          <Text style={styles.welcomeText}>Empieza</Text>
          <Text style={styles.welcomeText}>con registrarte</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formText}>
            Por favor rellene los campos para crear una cuenta
          </Text>

          <Input
            icon={<Icon name="user" size={26} strokeWidth={1.6} />}
            placeholder="Ingrese su nombre y su apellido"
            onChangeText={(value) => (nameRef.current = value)}
          />

          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Ingrese su email"
            onChangeText={(value) => (emailRef.current = value)}
          />

          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Ingrese su contraseña"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
          />

          <View style={styles.roleContainer}>
            <Icon
              name="user"
              size={26}
              strokeWidth={1.6}
              style={styles.roleIcon}
            />
            <View style={styles.roleOptions}>
              <RoleOption value="student" label="Estudiante" />
              <RoleOption value="teacher" label="Maestro" />
            </View>
          </View>

          <ButtonGeneral
            title={"Registrarse"}
            loading={loading}
            onPress={onSubmit}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Tengo una cuenta!</Text>

          <Pressable onPress={() => router.push("login")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Iniciar Sesión
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  formText: {
    fontSize: hp(1.5),
    color: theme.colors.text,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
  },
  roleIcon: {
    marginRight: 10,
    color: theme.colors.text,
  },
  roleOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  roleOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  roleOptionSelected: {
    backgroundColor: theme.colors.primaryLight,
  },
  roleOptionText: {
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  roleOptionTextSelected: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.semibold,
  },
});

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          setAuth(session?.user);
          const userData = await updateUserData(
            session?.user,
            session?.user?.email
          );
          if (userData) {
            setUserRole(userData.role);
            if (userData.role === "student") {
              router.replace("/home");
            } else if (userData.role === "teacher") {
              router.replace("/teacherDashboard");
            }
          }
        } else {
          setAuth(null);
          setUserRole(null);
          router.replace("/welcome");
        }
      }
    );

    // Cleanup function
    return () => {
      if (authListener && authListener.data) {
        authListener.data.unsubscribe();
      }
    };
  }, []);

  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);
    if (res.success) {
      const userData = { ...res.data, email };
      setUserData(userData);
      return userData;
    }
    return null;
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default _layout;

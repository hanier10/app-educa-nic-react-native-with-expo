import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Icon from "../../../../assets/icons";
import { useRouter } from "expo-router";
import { hp, wp } from "../../../../helpers/common";
import { theme } from "../../../../constants/theme";
import Avatar from "../../../../components/Avatar";
import { useAuth } from "../../../../contexts/AuthContext";

export default function index() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>EducaNic</Text>
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
    </ScreenWrapper>
  );
}

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
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
});

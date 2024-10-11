import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";

interface SubjectCardProps {
  subject: string;
  grade: string;
  time: string;
  day: string;
  color: string;
  url: any;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  grade,
  time,
  day,
  color,
  url,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.subject}>{subject}</Text>
      <Text style={styles.details}>{grade}</Text>
      <Text style={styles.details}>{time}</Text>
      <Text style={styles.details}>{day}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={url}>
          Más detalles
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(60),
    padding: wp(4),
    borderRadius: theme.radius.md,
    marginRight: wp(4),
  },
  subject: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "white",
    marginBottom: hp(1),
  },
  details: {
    fontSize: hp(1.8),
    color: "white",
    marginBottom: hp(0.5),
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: wp(2),
    borderRadius: theme.radius.sm,
    alignSelf: "flex-start",
    marginTop: hp(1),
  },
  buttonText: {
    color: "white",
    fontSize: hp(1.6),
  },
});

export default SubjectCard;

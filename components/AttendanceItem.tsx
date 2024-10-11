import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThumbsUp, X } from "lucide-react-native";

interface AttendanceItemProps {
  name: string;
  imageUrl: string;
}

export default function AttendanceItem({
  name,
  imageUrl,
}: AttendanceItemProps) {
  const [isPresent, setIsPresent] = useState(true);

  const toggleAttendance = () => {
    setIsPresent(!isPresent);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity onPress={toggleAttendance} style={styles.iconContainer}>
        {isPresent ? (
          <ThumbsUp size={24} color="#4CAF50" />
        ) : (
          <X size={24} color="#F44336" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    padding: 5,
  },
});

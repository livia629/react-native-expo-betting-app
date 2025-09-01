import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  title: string;
  hasBackButton: boolean;
};

export default function CustomHeader({ title, hasBackButton = false }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {hasBackButton && (
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons
            name="chevron-left"
            size={28}
            color="white"
            style={{ marginTop: 2 }}
          />
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 108,
    backgroundColor: "#01326D",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 14,
  },
  title: {
    fontSize: 20,
    color: "white",
    fontFamily: "NotoSansTC-Bold",
  },
  backBtn: {
    position: "absolute",
    left: 8,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 0,
    fontSize: 16,
  },
});
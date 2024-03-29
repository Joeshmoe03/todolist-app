import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  const { text, isCompleted, onPress, onDelete } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.itemLeading}>
          <View style={styles.square}>
            {isCompleted && <Text style={styles.checkmark}>&#10003;</Text>}
          </View>
          <Text style={[styles.itemText, isCompleted && styles.completedText]}>
            {text}
          </Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>Del</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    shadowRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  itemLeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemText: {
    fontSize: 17,
    maxWidth: "80%",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#8DDFDA",
    borderRadius: 5,
    opacity: 0.8,
    marginRight: 16,
  },
  checkmark: {
    color: "#000",
    fontSize: 20,
    paddingLeft: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteText: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  },
});

export default Task;

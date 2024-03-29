import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";

const AddTask = (props) => {
  const [Task, setTask] = useState();
  const { onAddTaskPress } = props;

  //use state to store the new value of the input
  const handleAddTask = () => {
    if (!Task) return;
    onAddTaskPress(Task);
    Keyboard.dismiss();
    setTask();
  };
  return (
    <View style={styles.addContainer}>
      <TextInput
        value={Task}
        onChangeText={setTask}
        style={styles.textInput}
        placeholder="Add task"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  addContainer: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 17,
    color: "#558CF6",
    fontWeight: "bold",
  },
});

export default AddTask;

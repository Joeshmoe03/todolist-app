import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

export default function App() {
  //This allows us to define TaskItems added and a setter to add them. By default there are no tasks.
  const [taskItems, setTaskItems] = useState([]);
  const handleTaskComplete = async (index) => {
    console.log(taskItems);
    // Copy the task items
    let updatedTasks = [...taskItems];
    // Whatever the completed status was, it is now the opposite.
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    // Move the completed task to the end of the list
    if (updatedTasks[index].isCompleted) {
      const completedTask = updatedTasks.splice(index, 1)[0];
      updatedTasks.push(completedTask);
    }

    // Update the tasks
    setTaskItems(updatedTasks);

    try {
      // Save the updated task list to AsyncStorage
      await AsyncStorage.setItem("todolist-app", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        // Load the tasks from AsyncStorage
        const storedTasks = await AsyncStorage.getItem("todolist-app");
        if (storedTasks !== null) {
          setTaskItems(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks from Async storage:", error);
      }
    };
    loadTasks();
    //array determines number of times run
  }, []);

  const onAddTaskPress = async (text) => {
    //update the tasks every time we add a new task
    const updatedTasks = [...taskItems, { text: text, isCompleted: false }];
    setTaskItems(updatedTasks);
    console.log(updatedTasks);
    try {
      // Save the updated task list to AsyncStorage
      await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  const handleTaskDelete = async (index) => {
    const updatedTasks = [...taskItems];
    // Remove the task at index
    updatedTasks.splice(index, 1);
    // Update the tasks
    setTaskItems(updatedTasks);
    try {
      // Save the updated task list to AsyncStorage
      await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerStyle}>Today's Tasks</Text>
        </View>
        <FlatList
          style={styles.items}
          data={taskItems}
          renderItem={({ item, index }) => (
            <Task
              text={item.text}
              isCompleted={item.isCompleted}
              onPress={() => handleTaskComplete(index)}
              onDelete={() => handleTaskDelete(index)}
            />
          )}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.addTaskContainer}
        >
          <AddTask onAddTaskPress={onAddTaskPress} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff1",
  },
  headerWrapper: {
    paddingTop: 16,
    paddingBottom: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    backgroundColor: "#365e9e",
    borderRadius: 8,
  },
  headerStyle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  items: {
    marginTop: 32,
    margin: 16,
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});

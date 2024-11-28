import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleNewTodo = () => {
    if (inputValue) {
      setTodos([inputValue, ...todos]);
      setInputValue("");
    } else {
      Alert.alert("", "Please enter a task first");
    }
  };

  const handleEditTodo = (index: number, value: string) => {
    const newTodoList = todos.map((v, i) => {
      if (index === i) {
        v = value;
      }
      return v;
    });
    setTodos(newTodoList);
  };

  const handleDeleteTodo = (index: number) => {
    const newTodoList = todos.filter((_, i) => {
      return i !== index;
    });
    setTodos(newTodoList);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.appContainer, styles.shadowProp]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Todo List</Text>
        </View>
        <View>
          <View>
            <Text style={styles.text}>Enter your task:</Text>
            <TextInput
              style={[styles.input, styles.shadowProp]}
              onChangeText={(e) => setInputValue(e)}
              value={inputValue}
              blurOnSubmit={false}
              onSubmitEditing={handleNewTodo}
            ></TextInput>
          </View>
        </View>
        <Button
          color={"#6db2dd"}
          title="Add new task"
          onPress={() => handleNewTodo()}
        />

        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.text}>Your todo list:</Text>
            <Text
              style={[
                styles.text,
                {
                  textDecorationLine: "underline",
                },
              ]}
              onPress={() => setTodos([])}
            >
              Clear
            </Text>
          </View>
          <FlatList
            style={styles.todoList}
            data={todos}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginVertical: 20 }}>
                You currently dont have any todo
              </Text>
            }
            renderItem={({ item, index }) => (
              <TodoItem
                value={item}
                onEdit={(value) => handleEditTodo(index, value)}
                onDelete={() => handleDeleteTodo(index)}
              />
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  appContainer: {
    backgroundColor: "#be95be",
    padding: 20,
    height: "auto",
    justifyContent: "center",
    gap: 20,
    borderRadius: 40,
  },
  input: {
    height: 40,
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#71a3c1",
  },
  todoList: {
    maxHeight: 400,
    overflow: "scroll",
  },
});

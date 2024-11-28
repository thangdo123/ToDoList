import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TodoItem({
  value,
  onEdit,
  onDelete,
}: {
  value: string;
  onEdit?: (value: string) => void;
  onDelete?: () => void;
}) {
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);

  const handleEditTodo = () => {
    if (inputValue) {
      onEdit!(inputValue);
      setEditStatus(false);
    } else {
      Alert.alert("", "Please enter a task first");
    }
  };

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <TextInput
        onChangeText={(e) => setInputValue(e)}
        value={inputValue}
        onPress={() => setEditStatus(true)}
        style={{ flex: 1 }}
      ></TextInput>

      {editStatus && <Button title="Save" onPress={() => handleEditTodo()} />}
      <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#DDDDDD",
    marginVertical: 5,
    padding: 8,
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
});

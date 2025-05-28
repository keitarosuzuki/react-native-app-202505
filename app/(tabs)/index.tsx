import { db } from '@/firebaseConfig';
import { onValue, push, ref, remove, set, update } from 'firebase/database';
import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Provider as PaperProvider, Text, TextInput } from 'react-native-paper';

export default function App() {
  const [taskList, setTaskList] = React.useState<any[]>([]);
  const [inputText, setInputText] = React.useState('');

  React.useEffect(() => {
    const tasksRef = ref(db, 'tasks/');
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const items = Object.entries(data).map(([id, value]: any) => ({
        id,
        ...value,
      }));
      setTaskList(items);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async () => {
    if (!inputText.trim()) {
      alert("タスクを入力してください。")
      return;
    }

    const newRef = push(ref(db, 'tasks/'));
    await set(newRef, {
      title: inputText,
      isEditing: false,
      isDone: false,
    });
    setInputText('');
  };

  const toggleDone = async (item: any) => {
    await update(ref(db, `tasks/${item.id}`), {
      isDone: !item.isDone,
    });
  };

  const handleDelete = async (id: string) => {
    await remove(ref(db, `tasks/${id}`));
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {/* フォームとボタン */}
        <View style={styles.formRow}>
          <TextInput
            label="タスクを入力"
            mode="outlined"
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
          />
          <Button mode="contained" style={styles.addButton} onPress={handleAddTask}>
            新規登録
          </Button>
        </View>

        {/* リスト表示 */}
        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={[styles.taskText, item.isDone && styles.strikeThrough]}>
                  {item.title}
                </Text>
                <View style={styles.buttonGroup}>
                  <IconButton icon="check" onPress={() => toggleDone(item)} />
                  <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
                </View>
              </Card.Content>
            </Card>
          )}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    marginHorizontal: 500,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    alignSelf: 'center',
  },
  card: {
    marginBottom: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  editField: {
    flex: 1,
    marginRight: 8,
  },
});

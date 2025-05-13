import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Provider as PaperProvider, Text, TextInput } from 'react-native-paper';

export default function App() {
  const dummyList = [
    { id: '1', title: '買い物に行く', isEditing: false, isDone: true },
    { id: '2', title: 'レポートを書く', isEditing: true, isDone: false },
  ];

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {/* フォームとボタン */}
        <View style={styles.formRow}>
          <TextInput
            label="タスクを入力"
            mode="outlined"
            style={styles.input}
          />
          <Button mode="contained" style={styles.addButton}>
            新規登録
          </Button>
        </View>

        {/* リスト表示 */}
        <FlatList
          data={dummyList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                {/* 文字表示部分 */}
                {item.isEditing ? (
                  <TextInput value={item.title} style={styles.editField} mode="outlined" />
                ) : (
                  <Text style={[styles.taskText, item.isDone && styles.strikeThrough]}>
                    {item.title}
                  </Text>
                )}

                {/* ボタン群 */}
                <View style={styles.buttonGroup}>
                  <IconButton icon="check" onPress={() => {}} />
                  <IconButton icon="pencil" onPress={() => {}} />
                  <IconButton icon="delete" onPress={() => {}} />
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

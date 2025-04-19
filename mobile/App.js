import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return; // Don't allow empty prompts

    setLoading(true);
    try {
      const res = await fetch('http://10.0.0.196:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error(err);
      setResponse('Error talking to AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💸 MoneyCitrus AI</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ask about saving, investing, debt..."
        value={prompt}
        onChangeText={setPrompt}
      />
      
      <Button title={loading ? "Thinking..." : "Ask AI"} onPress={askAI} disabled={loading} />

      {response.length > 0 && (
        <View style={styles.responseBox}>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  responseBox: {
    marginTop: 30,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    width: '100%',
  },
  responseText: {
    fontSize: 16,
  },
});

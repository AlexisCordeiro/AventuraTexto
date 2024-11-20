// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [output, setOutput] = useState([
    'Bem-vindo à Aventura em Texto!',
    'Você está em uma floresta escura. Uma trilha se estende ao norte e outra ao leste.',
  ]);
  const [input, setInput] = useState('');
  const [localizacao, setLocalizacao] = useState('floresta');
  const [inventario, setInventario] = useState([]);

  const processarComando = (comando) => {
    let newOutput = [...output];
    comando = comando.toLowerCase();

    if (comando === 'norte') {
      if (localizacao === 'floresta') {
        setLocalizacao('cabana');
        newOutput.push('Você encontra uma cabana abandonada.');
      } else {
        newOutput.push('Você não pode ir para o norte daqui.');
      }
    } else if (comando === 'leste') {
      if (localizacao === 'floresta') {
        setLocalizacao('rio');
        newOutput.push('Você chega a um rio de águas turbulentas.');
      } else {
        newOutput.push('Você não pode ir para o leste daqui.');
      }
    } else if (comando === 'sul') {
      newOutput.push('Você não pode ir para o sul daqui.');
    } else if (comando === 'oeste') {
      newOutput.push('Você não pode ir para o oeste daqui.');
    } else if (comando === 'sair') {
      newOutput.push('Obrigado por jogar!');
      // Opcional: adicionar lógica para encerrar o jogo ou resetar o estado
    } else {
      newOutput.push('Comando inválido.');
    }

    setOutput(newOutput);
    explorarLocalizacao(newOutput);
  };

  const explorarLocalizacao = (newOutput) => {
    if (localizacao === 'cabana') {
      newOutput.push('Dentro da cabana, você encontra uma chave enferrujada.');
      if (!inventario.includes('chave')) {
        setInventario([...inventario, 'chave']);
      }
    } else if (localizacao === 'rio') {
      newOutput.push('Há uma ponte frágil sobre o rio.');
      if (inventario.includes('chave')) {
        newOutput.push(
          'Você usa a chave para destravar um mecanismo na ponte e atravessá-la.'
        );
        setLocalizacao('tesouro');
        newOutput.push('Você encontrou um tesouro escondido! Parabéns!');
      } else {
        newOutput.push('Você precisa encontrar uma maneira de atravessar o rio.');
      }
    }
  };

  const handleInput = () => {
    processarComando(input);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.outputContainer}>
        {output.map((line, index) => (
          <Text key={index} style={styles.text}>
            {line}
          </Text>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Para onde você vai?"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Enviar" onPress={handleInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  outputContainer: {
    flex: 1,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 2,
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

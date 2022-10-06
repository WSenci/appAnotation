import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';

export default function App() {

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura);
      } catch (error) { }
    })();
  }, [])

  SetData = async () => {
    try {
      await AsyncStorage.setItem('anotacao', anotacao);
    } catch (error) {

    }
  }

  function atualizarTexto() {
    setarEstado('leitura')
    SetData();
  }

  if (estado == 'leitura') {
    return (
      <View style={{ flex: 1 }}>

        <StatusBar hidden />

        <Text style={styles.header}>Aplicativo de Anotação</Text>
        {
          (anotacao != '') ?
            <Text style={{ padding: 20 }}>{anotacao}</Text>
            :
            <Text style={{ padding: 20, opacity: 0.3 }}>Nenhuma anotação.</Text>
        }

        {
          (anotacao == '') ?
            <TouchableOpacity onPress={() => setarEstado('atualizando')} style={[styles.btnAnotacao]}>
              <Text style={styles.btnAnotacaoTextoMais}>+</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => setarEstado('atualizando')} style={[styles.btnAnotacao]}>
              <Text style={styles.btnAnotacaoTextoEdit}>Editar</Text>
            </TouchableOpacity>
        }
      </View >
    );
  } else if (estado == 'atualizando') {
    return (
      <View style={{ flex: 1 }}>

        <StatusBar hidden />

        <Text style={styles.header}>Aplicativo de Anotação</Text>

        <TextInput autoFocus={true} onChangeText={(text) => setarAnotacao(text)} style={{ height: '100%', textAlignVertical: 'top', padding: 20 }} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

        <TouchableOpacity onPress={() => atualizarTexto()} style={[styles.btnAnotacaoSalvar]}>
          <Text style={styles.btnAnotacaoTextoSalvar}>Salvar</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#0091ff',
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  btnAnotacao: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#0091ff',
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 8
  },
  btnAnotacaoSalvar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 80,
    height: 50,
    backgroundColor: '#0091ff',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 8
  },
  btnAnotacaoTextoMais: {
    textAlign: 'center',
    color: 'white',
    position: 'relative',
    top: 4,
    fontSize: 30
  },
  btnAnotacaoTextoEdit: {
    textAlign: 'center',
    color: 'white',
    position: 'relative',
    top: 12,
    fontSize: 18
  },
  btnAnotacaoTextoSalvar: {
    textAlign: 'center',
    color: 'white',
    position: 'relative',
    top: 12,
    fontSize: 18
  }
})

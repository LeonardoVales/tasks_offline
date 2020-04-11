import React, { Component } from 'react';
import { View, 
         Text,
         ImageBackground,
         StyleSheet
        } from 'react-native';

import todayImage from './assets/imgs/today.jpg';
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from './src/commonStyles'
import Task from './src/components/Task'

export default class App extends Component {
  render() {

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    return (
      <View style={styles.container}>
        <ImageBackground 
          source={todayImage}
          style={styles.background}
          >
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <Task desc="Comprar livro" estimateAt={new Date()} doneAt={new Date()} />
          <Task desc="Ler o livro" estimateAt={new Date()} doneAt={null} />
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 3, //30% da tela
  },
  taskList: {
    flex: 7, //70% da tela
  },
  titleBar: {
    flex: 1, //quando eu coloco 1, estou dizendo que vou permitir que ele cresça dentro do escopo 
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 50,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 20,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 30
  }

})
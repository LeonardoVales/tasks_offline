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
            <Text>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <Text>Teste</Text>
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
    fontSize: 50
  }

})
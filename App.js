import React, { Component } from 'react';
import { View, 
         Text,
         ImageBackground,
         StyleSheet,
         FlatList,
         TouchableOpacity,
         Platform,
         StatusBar,
         Alert,
        } from 'react-native';

import todayImage from './assets/imgs/today.jpg';
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from './src/commonStyles'
import Task from './src/components/Task'
import { Ionicons } from '@expo/vector-icons';
import AddTask from './src/screens/AddTask'    

export default class App extends Component {

  state = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: [
      {
        id: Math.random(),
        desc: 'Comprar Livro de React',
        estimateAt: new Date(),
        doneAt: new Date(),
      }, 
      {
        id: Math.random(),
        desc: 'Ler Livro de React',
        estimateAt: new Date(),
        doneAt: null,
      }
    ]
  }

  componentDidMount = () => {
    this.filterTasks()
  }

  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
  }

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }
    this.setState({visibleTasks})
  }

  toggleTask = taskId => {

    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    })

    this.setState({tasks: tasks}, this.filterTasks)

  }

  AddTask = newTask => {
    
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados inválidos', 'Descrição não informada')
      return 
    }

    const tasks = [...this.state.tasks]
    tasks.push({
      id:         Math.random(),
      desc:       newTask.desc,
      estimateAt: newTask.date,
      doneAt:     null
    })

    this.setState({tasks, showAddTask: false}, this.filterTasks)

  }

  render() {

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AddTask 
          isVisible={this.state.showAddTask} 
          onCancel={() => this.setState({showAddTask: false})}
          onSave={this.AddTask}  />
        <ImageBackground 
          source={todayImage}
          style={styles.background}
          >
          <View style={styles.iconBar}>
            <TouchableOpacity
              onPress={this.toggleFilter}
            >
              <Ionicons 
                name={this.state.showDoneTasks ? 'md-eye' : 'md-eye-off'} 
                size={30} 
                color={commonStyles.colors.secondary} />
            </TouchableOpacity>
          </View>  
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList 
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} />}
          />
        </View>   
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => this.setState({showAddTask: true})}
          activeOpacity={0.7}>
          <Ionicons 
            name='md-add' 
            size={20} 
            color={commonStyles.colors.secondary} />
        </TouchableOpacity> 
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
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 30 : 25,

  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
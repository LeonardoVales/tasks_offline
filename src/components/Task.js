import React from 'react'
import { View,
         Text,
         StyleSheet 
        } from 'react-native'

import commonStyles from '../commonStyles'    
import { Ionicons } from '@expo/vector-icons';    

export default props => {

    const doneOrNotStyle = props.doneAt != null ? 
        { textDecorationLine: 'line-through'} : {}

    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text>{props.estimateAt + ""}</Text>
            </View>            
        </View>
    );

} 

function getCheckView(doneAt) {

    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Ionicons 
                    name="md-checkmark" 
                    size={20} color='#FFF'
                    
                />
            </View>
        );
    } else {
        return (
            <View style={styles.pending}>
                
            </View>
        );        
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA', //Quando coloca a cor da borda, é necessário colocar a sua largura
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    pending: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        color: commonStyles.colors.mainText,
        fontSize: 15,

    }
});
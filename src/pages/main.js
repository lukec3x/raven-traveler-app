import React, { Component } from 'react'

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default class Main extends Component {
  render() {
    return (
      <View style={stl.back}>
        <View style={stl.main}>

          <View style={stl.top}>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Enviar1')}>
              <Image style={stl.imgs} source={require('../assets/enviar.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Receber1') }>
              <Image style={stl.imgs} source={require('../assets/ler.png')}/>
            </TouchableOpacity>
          </View>

          <View style={stl.bottom}>
            <Text style={stl.txt}>
              Sed eget viverra augue. Nulla a augue enim. Nam tempus vestibulum libero at consectetur. 
              Aliquam leo arcu, auctor pretium placerat et, ornare vitae risus. Nunc a ipsum tellus. 
              Aenean nisl libero, porttitor at rhoncus non, eleifend eu turpis. Nulla volutpat vestibulum 
              dui nec consequat. Donec vulputate nec urna ut pellentesque.
            </Text>
          </View>

        </View>
      </View>
    )
  }
}

const stl = StyleSheet.create({
  back: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#21170b',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#58503d",
    // width: '94%',
    width: '100%',
  },
  imgs: {
    margin: 20,
    height: 130,
    width: 150,
  },
  top: {
    borderBottomColor: '#4b422f',
    borderBottomWidth: 2,
    flexDirection: "column",
    alignItems: "center",
    width: '85%',
  },
  bottom: {
    alignItems: 'center',
    width: '93%',
  },
  txt: {
    marginTop: 5,
    color: '#fff',
    textAlign: "center",
  },
})
import React, { Component } from 'react'

import { View, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native'

export default class Enviar1 extends Component {
  render() {
    return (
      <View style={stl.main}>

        <View style={stl.row1}>
        <TouchableOpacity style={{ width: 45 }} onPress={ () => this.props.navigation.navigate('Home')}>
            <Image style={stl.btnHome} source={require('../assets/home.png')}/>
          </TouchableOpacity>
        </View>

        <View style={stl.row2}>
          <ImageBackground style={stl.parchment} source={require('../assets/escrever.png')}>
            <TextInput style={stl.input} multiline numberOfLines={16} editable={false} value={ this.props.navigation.state.params.msg }/>
          </ImageBackground>
        </View>

      </View>
    )
  }
}

const stl = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#58503d",
    width: '100%',
  },
  btnHome: {
    width: 45,
    height: 45,
  },
  row1: {
    marginTop: 5,
    marginLeft: 5,
    width: '100%',
  },
  row2: {
    marginLeft: 10,
    marginTop: 40,
    width: '100%',
  },
  parchment: {
    width: 330,
    height: 350,
  },
  input: {
    textAlignVertical: "top",
    // backgroundColor: '#fff',
    fontFamily: 'IndieFlower',
    marginLeft: 73,
    marginTop: 20,
    width: 225,
    maxHeight: 287.5,
  },
})
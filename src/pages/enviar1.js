import React, { Component } from 'react'

import { View, StyleSheet, TouchableOpacity, Image, Text, ImageBackground, TextInput } from 'react-native'

import KeyboardShift from '../components/KeyboardShift'

export default class Enviar1 extends Component {
  state ={
    text: '',
    warning: '',
    controller: true,
  }
  
  send = () => {
    if (this.state.text !== '') {
      this.props.navigation.navigate('Enviar2', { text: this.state.text })
    } else {
      this.setState({ warning: 'Pergaminho vazio!' })
    }
  }

  render() {
    return (
      <KeyboardShift>{(isOpen) => (
      <View style={stl.main}>

        <View style={[stl.row1]}>
        <TouchableOpacity style={{ width: 45 }} onPress={ () => this.props.navigation.navigate('Home')}>
            <Image style={ stl.btnHome } source={require('../assets/home.png')}/>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', alignItems: "flex-end" }}>
          {isOpen === 'true'  && <TouchableOpacity style={{  }} onPress={() => this.send()}>
            {/* <Text>{this.state.warning}</Text> */}
            {/* <Image style={{ width: 50, height: 50, marginBottom: 3 }} source={require('../assets/_btnEnviar2.png')} /> */}
          </TouchableOpacity>}
        </View>

        <View style={stl.row2}>
          <ImageBackground style={[stl.parchment, { alignItems: "flex-start", flexDirection: "row" }]} source={require('../assets/escrever.png')}>
            <TextInput  style={[stl.input, { backgroundColor: '#fff' }]} multiline numberOfLines={16} onChangeText={text => {
              this.setState({ text })
            }} />
            {/* onFocus={this.handleInputFocus} onBlur={ this.handleInputBlur }/> */}
            {isOpen === 'true' && <Image style={{ width: 50, height: 50, marginBottom: 0, top: 0, left: -10, }} source={require('../assets/_btnEnviar2.png')} />}
          </ImageBackground>
        </View>

        <View style={stl.row3}>
          <TouchableOpacity style={stl.btnEnv} onPress={() => this.send()}>
            <Image style={stl.btnImg} source={require('../assets/btnEnviar.png')} />
          </TouchableOpacity>
        </View>
        <Text>{this.state.controller}</Text>

        <Text>{this.state.warning}</Text>

      </View>
      )}</KeyboardShift>
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
    marginBottom: 37,
    width: '100%',
  },
  row2: {
    marginLeft: 10,
    marginTop: 3,
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
    // marginLeft: 30,
    // marginTop: 20,
    marginTop: 20,
    width: 225,
    maxHeight: 287.5,
  },
  row3: {
    alignItems: "center",
    marginTop: 30,
    width: '100%',
  },
  btnEnv: {
    marginLeft: 40,
  },
  btnImg: {
    width: 90,
    height: 45,
  }
})
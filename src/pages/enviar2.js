import React, {Component } from 'react'

import { View, StyleSheet, Clipboard, TouchableOpacity, Image, Text, ImageBackground } from 'react-native'

import firebase from 'react-native-firebase'
import timer from 'react-native-timer'

export default class Enviar2 extends Component {

  state = {
    pos: 100,
    code: '',
    enviado: false,
    error: null,
  }

  componentDidMount() {
    let newCode = ''
    for (let i = 0; i < 4; i++) {
      newCode += (Math.floor(Math.random() * 10 + 1 - 1)).toString()
    }
    this.setState({ code: newCode })

    this.send(newCode)
    
    const posFinal = 1+ -70
    const fps = 60

    timer.setInterval('raven', () => {
      if (this.state.pos >= posFinal) {
        this.setState({ pos: this.state.pos -1 })
      }

      if (this.state.enviado === false && this.state.pos === posFinal) {
        this.setState({ pos: 100 })
      } else if (this.state.enviado === true && this.state.pos === posFinal) {
        this.props.navigation.navigate('Home')
      }
    }, fps)

  }

  send = (code) => {
    //Nome da pasta no Banco de Dados
    const dbName = 'dados' //'inTest' //'dados'

    // if (this.props.navigation.state.params.text !== '' && code.length === 4) {
    if (true) {
      firebase.database().ref(dbName).push({
        'ID': code,
        'Mensagem': this.props.navigation.state.params.text,
      }).then(data => {
        this.setState({ enviado: true })
      }).catch(error => {
        this.setState({ error })
      })
      
    }
  }

  componentWillUnmount() {
    timer.clearInterval('raven')
  }

  render () {
    const { code, pos, error, enviado } = this.state
    return (
      <View style={stl.main}>

        <View style={stl.row1}>
        <TouchableOpacity style={{ width: 45 }} onPress={ () => this.props.navigation.navigate('Home')}>
            <Image style={stl.btnHome} source={require('../assets/home.png')}/>
          </TouchableOpacity>
        </View>

        <View style={stl.row2}>
          <Image style={{ width: 90, height: 90, marginLeft: `${pos}%` }} source={require('../assets/ravenToLeft.gif')} />
        </View>

        <View style={[stl.row3, { alignItems: "center" }]}>
          <Text style={stl.txt}>Seu código:</Text>
          <ImageBackground style={stl.fundoCod} source={require('../assets/fundoCod.png')}>
            <Text style={stl.txtCod}>{code[0]}</Text>
            <Text style={stl.txtCod}>{code[1]}</Text>
            <Text style={stl.txtCod}>{code[2]}</Text>
            <Text style={stl.txtCod}>{code[3]}</Text>
          </ImageBackground>

          <TouchableOpacity style={{ backgroundColor: null }} onPress={() => Clipboard.setString(code)}>
            <Image style={{ width: 50, height: 50 }} source={require('../assets/_copy.png')} />
          </TouchableOpacity>

        </View>

        <Text style={ stl.txt2 }>{!enviado || 'Enviado com sucesso!'}</Text>
        {/* <Text>{!error && error}</Text> */}

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
    marginTop: 80,
  },
  raven: {
    width: 90,
    height: 90,
    marginLeft: '-33%',
  },
  row3: {
    bottom: -160,
  },
  fundoCod: {
    width: 125,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtCod: {
    fontFamily: 'IndieFlower',
    marginLeft: 11,
    marginRight: 11,
    fontSize: 18,
  },
  txt: {
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  },
  txt2: {
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'IndieFlower',
  }
})
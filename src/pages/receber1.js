import React, {Component } from 'react'

import { View, StyleSheet, TouchableOpacity, Image, Text, ImageBackground } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import firebase from 'react-native-firebase'
import timer from 'react-native-timer'

export default class Enviar2 extends Component {

  state = {
    pos: -73,
    code: '',
    msg: '',
    recebido: false,
    error: null,
  }

  receive = () => {
    //Nome da pasta no Banco de Dados
    const dbName = 'dados' //'inTest' //'dados'

    var naoEncontrado = true

    // if (this.props.navigation.state.params.text !== '' && code.length === 4) {
    if (true) {
      var query = firebase.database().ref(dbName).orderByKey()
      query.once("value").then(snapshot => {

        snapshot.forEach(childSnapshot => {
          var db = childSnapshot.val()
          var buscId = this.state.code

          if (db.ID == buscId) {
            this.setState({ msg: db.Mensagem })
            this.setState({ error: null })

            // Apaga a mensagem do banco
            firebase.database().ref(dbName).child(childSnapshot.key).remove()

            this.state.recebido = true
            naoEncontrado = false
            
            if (this.state.recebido) {      
              const posFinal = 1+ 100
              const fps = 40

              timer.setInterval('raven', () => {
                if (this.state.pos <= posFinal) {
                  this.setState({ pos: this.state.pos +1 })
                }

                if (this.state.recebido === false && this.state.pos === posFinal) {
                  this.setState({ pos: -70 })
                } else if (this.state.recebido === true && this.state.pos === posFinal) {
                  this.props.navigation.navigate('Receber2', { msg: this.state.msg })
                }
              }, fps)  

            }

          }
        })

        if (naoEncontrado) {
          this.setState({ error: 'Não encontrado' })
        }
      })
      
    }
  }

  componentWillUnmount() {
    timer.clearInterval('raven')
  }

  render () {
    const { code, msg, pos, error } = this.state
    return (
      <View style={stl.main}>

        <View style={stl.row1}>
          <TouchableOpacity style={{ width: 45 }} onPress={ () => this.props.navigation.navigate('Home')}>
            <Image style={stl.btnHome} source={require('../assets/home.png')}/>
          </TouchableOpacity>
        </View>

        <View style={stl.row2}>
          <Image style={{ width: 90, height: 90, marginLeft: `${pos}%` }} source={require('../assets/ravenToRight.gif')} />
        </View>

        <View style={stl.row3}>
          <Text style={stl.txt}>Informe seu código:</Text>
          <ImageBackground style={stl.fundoCod} source={require('../assets/fundoCod.png')}>
            <TextInputMask
              type={'custom'}
              editable={!this.state.recebido}
              keyboardType={'number-pad'}
              options={{
                mask: '9  9  9  9',
              }}
              value={
                this.state.code
              }
              onChangeText={text => {

                let newText = ''
                if (text[text.length -1] == ' ') {
                  for (let i = 0; i <= text.length -3; i++) {
                    newText += text[i]
                  }

                  // Pelo visto não precisa dessa parte que estava comentada
                  // mas, caso esteja comentado ele não funfa
                  this.setState({
                    code: newText.replace(/\D/g, '')
                  })

                  // if (newText.replace(/\D/g, '').length == 4) {
                  //   this.receive()
                  // }

                } else {
                  this.setState({
                    code: text.replace(/\D/g, '')
                  })

                  if (text.replace(/\D/g, '').length == 4) {
                    this.receive()
                  }
                }

              }}
              style={stl.txtCod}
            />
          </ImageBackground>
        </View>

        <Text style={{
          color: 'red', 
          fontFamily: 'IndieFlower',
          bottom: 110,
        }}>{!error || error}</Text>

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
    marginTop: 60,
  },
  raven: {
    width: 90,
    height: 90,
    marginLeft: '-33%',
  },
  row3: {
    bottom: -25,
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
    width: '85%',
    // backgroundColor: '#777'
  },
  txt: {
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  }
})
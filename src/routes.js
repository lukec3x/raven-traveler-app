import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/main'
import Enviar1 from './pages/enviar1'
import Enviar2 from './pages/enviar2'
import Receber1 from './pages/receber1'
import Receber2 from './pages/receber2'

const Routes = createAppContainer(
    createSwitchNavigator({
        Home: Main,
        Enviar1,
        Enviar2,
        Receber1,
        Receber2,
    })
)

export default Routes
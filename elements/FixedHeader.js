import React from 'react'
import {Header} from 'react-native-elements'


const FixedHeader = () => (
  <Header
    leftComponent={{ 		icon: 'menu', color: '#fff' }}
    centerComponent={{	text: 'COURSE MANAGER',
      style: { color: '#fff' } }}
    rightComponent={{ icon: 'home', color: '#fff' , onPress: () => {}}}/>
)

export default FixedHeader
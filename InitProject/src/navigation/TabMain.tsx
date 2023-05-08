import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import Wishlist from './screens/Wishlist';
import Profile from './screens/Profile';
import Cart from './screens/Cart';
import ProductStack from './stacks/ProductStack';
import SvgHome from '../components/icons/Home';
import SvgHeart from '../components/icons/Heart';
import SvgProfile from '../components/icons/Profile';
import SvgBuy from '../components/icons/Buy';
import Basket from './screens/Basket';


const Tab = createBottomTabNavigator();

const TabMain = () => {
      return (
            <>
                  <Tab.Navigator>
                        <Tab.Screen
                              name='home'
                              component={ProductStack}
                              options={{
                                    tabBarShowLabel: false,
                                    headerShown: false,
                                    tabBarIcon: ({ focused }) => (
                                          <SvgHome
                                                name="person"
                                                size={32}
                                                fill={focused ? '#5956E9' : 'white'}
                                                stroke={focused ? '#5956E9' : '#200E32'}
                                          />
                                    )
                              }}
                        />
                        <Tab.Screen
                              name='wishlist'
                              component={Wishlist}
                              options={{
                                    tabBarShowLabel: false,

                                    headerShown: false,
                                    tabBarIcon: ({ focused }) => (
                                          <SvgHeart
                                                name="person"
                                                size={32}
                                                fill={focused ? '#5956E9' : 'white'}
                                                stroke={focused ? '#5956E9' : '#200E32'}
                                          />
                                    )
                              }} />
                        <Tab.Screen
                              name='profile'
                              component={Profile}
                              options={{
                                    tabBarShowLabel: false,

                                    headerShown: false,
                                    tabBarIcon: ({ focused }) => (
                                          <SvgProfile name="person" stroke={focused ? '#5956E9' : '#200E32'} size={32} fill={focused ? '#5956E9' : 'white'} />
                                    )
                              }} />
                        <Tab.Screen
                              name='basket'
                              component={Basket}
                              options={{
                                    tabBarShowLabel: false,

                                    headerShown: false,
                                    tabBarIcon: ({ focused }) => (
                                          <SvgBuy name="person" stroke={focused ? '#5956E9' : '#200E32'} size={32} fill={focused ? '#5956E9' : 'white'} />
                                    )
                              }} />

                  </Tab.Navigator>
            </>
      )
}

export default TabMain

const styles = StyleSheet.create({})
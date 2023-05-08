import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Splash = ({ navigation }: any) => {
      return (
            <SafeAreaView style={styles.container}>
                  <View style={styles.textWrapper}>
                        <Text style={styles.headerText}>Find Your</Text>
                        <Text style={styles.headerText}>Gadget</Text>
                  </View>
                  <View>
                        <Image style={styles.splash} source={require('../../../assets/splash.png')} />
                        <Image style={styles.ss} source={require('../../../assets/Rect.png')} />
                  </View>
                  <View >

                  </View>
                  <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={() => navigation.navigate('Tab')} style={styles.getStartedWrapper}>
                              <Text style={styles.getStarted}>Get Started</Text>
                        </TouchableOpacity>
                  </View>
            </SafeAreaView>
      )
}

export default Splash

const styles = StyleSheet.create({
      container: {
            height: "100%",
            backgroundColor: '#5956E9',
      },
      headerText: {
            fontWeight: "800",
            fontSize: 65,
            color: "white"
      },
      textWrapper: {
            margin: 50
      },
      splash: {
            width: 470,
            height: 470,
            alignSelf: "center",
            transform: [{ translateY: -100 }],
            marginBottom: 50
      },
      getStarted: {
            color: "#5956E9",
            fontWeight: "700",
            fontSize: 20,
            textAlign: "center",
      },
      getStartedWrapper: {
            backgroundColor: "#fff",
            width: 314,
            height: 70,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: -60 }],
            borderRadius: 10,
      },
      buttonWrapper: {
            justifyContent: "center",
            flexDirection: "row",
      },
      ss: {
            width: 454,
            height: 100,
            position: "absolute",
            bottom: 100,
      }
})
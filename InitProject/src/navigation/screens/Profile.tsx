import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SvgLocation from '../../components/icons/Location'

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.avatarWrapper}>
            <Image style={styles.avatar} source={require('../../../assets/avatar.png')} />
          </View>
          <View style={styles.nameWapper}>
            <Text style={styles.name}>Rosina Doe</Text>
          </View>
          <View style={styles.adressWrapper}>
            <SvgLocation style={{marginRight: 15}} />
            <Text style={styles.adress}>
              Address: 43 Oxford Road
              M13 4GR {"\n"}
              Manchester, UK
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    margin: 25
  },
  headerTextWrapper: {
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 60
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700"
  },
  cardWrapper: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  card: {},
  avatarWrapper: {
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 50,
    transform: [{ translateY: -25 }],
  },
  nameWapper: {
    marginBottom: 10
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center"
  },
  adressWrapper: {
    flexDirection: "row",
    width: 184,
    marginBottom: 25,
    marginLeft: 40
  },
  adress: {
    fontWeight: "300",
    fontSize: 15,
  }
})
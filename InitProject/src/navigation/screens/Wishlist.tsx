import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { productsURL } from '../../../actions/baseURL';
import { FlatList } from 'react-native-gesture-handler';

const Wishlist = ({ navigation }: any) => {
  const [items, setItems] = useState<any>([]);

  useFocusEffect(() => {
    AsyncStorage.getItem('wishlist')
      .then(data => {
        let wishlistItem = JSON.parse(data ?? '[]');
        if (wishlistItem.length != 0) {
          axios.get(productsURL).then(res => {
            let arr = res.data.filter((item: any) => wishlistItem.includes(item.id))
            setItems(arr);
          })
        }
      })
  })

  const renderProducts = ({ item }: any) => {
    return <>
      <View style={styles.card}>
        <View style={styles.prodImgWrapper}>
          <Image style={styles.prodImg} source={{
            uri: item.image,
          }} />
        </View>
        <View style={styles.itemsWrapper}>
          <Text style={styles.common}>{item.brand}</Text>
          <Text style={styles.common}>{item.model}</Text>
          <Text style={styles.itemPrice}>$ {item.price}</Text>
        </View>
      </View>
    </>
  }
  return (

    <>
      {
        items?.length > 0 ? <>
          <SafeAreaView style={styles.container}>
            <View style={styles.headerTextWrapper1}>
              <Text style={styles.headerText1}>Favorites</Text>
              {
                <FlatList
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  data={items}
                  renderItem={renderProducts}
                />
              }
            </View>
          </SafeAreaView>
        </> : <SafeAreaView style={styles.container}>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Favorites</Text>
          </View>
          <View>
            <Image style={styles.cactus} source={require('../../../assets/cactus.png')} />
            <Image resizeMode='contain' style={styles.wishlist} source={require('../../../assets/wishlishkeko.png')} />
          </View>
          <View style={styles.bodyTextWrapper}>
            <Text style={styles.bodyText}>No favorites yet</Text>
            <Text style={styles.bodyDesc}>Hit the orange button down
              below to Create an order</Text>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.button}>
              <Text style={styles.buttonText}>
                Start ordering
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      }
    </>
  )
}

export default Wishlist

const styles = StyleSheet.create({
  headerTextWrapper: {
    alignItems: 'center',
    marginTop: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  cactus: {
    width: 50,
    height: 70,
    position: 'absolute',
    left: 85,
    top: 230,
  },
  wishlist: {
    width: 246,
    height: 352,
    position: 'absolute',
    right: 35,
    top: 100,
  },
  bodyTextWrapper: {
    alignItems: 'center',
    transform: [{ translateY: 430 }],
  },
  bodyText: {
    fontSize: 28,
    fontWeight: '600',
  },
  bodyDesc: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
    width: 218,
    color: '#9B9B9B',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#58C0EA',
    width: 224,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 17,
    fontWeight: '700',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 156,
    height: 212,
    marginVertical: 30,
    marginHorizontal: 10,
  },
  prodImg: {
    width: 117,
    height: 145,
    transform: [{ translateY: -50 }],
    resizeMode: "contain",

  },
  headerTextWrapper1: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 100,
  },
  container: {
    margin: 20,
  },
  itemsWrapper: {
    alignItems: 'center',
    transform: [{ translateY: -50 }],
  },
  common: {
    fontWeight: '500',
    fontSize: 20,
  },
  itemPrice: {
    color: '#5956E9',
    fontWeight: '700',
    fontSize: 17,
    marginTop: 10,
  },
  headerText1: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 50,
  },
  prodImgWrapper: {
    width: 117,
    height: 145,
  }
})
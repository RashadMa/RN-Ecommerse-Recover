import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { productsURL } from '../../actions/baseURL';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgHeart from '../../src/components/icons/Heart';
import SvgArrowLeft from '../../src/components/icons/ArrowLeft';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const ProductDetail = ({ navigation, route }: any) => {
      const [detail, setDetail] = useState<any>({});
      const [loading, setloading] = useState(true)
      const [wishlist, setWishlist] = useState([])
      const [color, setColor] = useState("white")
      const [isInWishlist, setIsInWishlist] = useState(false);
      let { id } = route.params;

      useEffect(() => {
            AsyncStorage.getItem('wishlist')
                  .then(data => {
                        let wishlist = JSON.parse(data ?? '[]');
                        setWishlist(wishlist)
                  })
      }, [])

      const wishlistOperations = async (id: any) => {
            const data = await AsyncStorage.getItem('wishlist');
          

            if (data) {
                  
                  const parsedData = JSON.parse(data);
                  const existingItem = parsedData.find((item: any) => item === id);
                  if (existingItem) {
                        let filteredProducts = wishlist.filter((removed: { id: number; }) => removed != id);
                        AsyncStorage.setItem('wishlist', JSON.stringify([...filteredProducts]));
                        setWishlist([...filteredProducts]);
                  }
                  else {
                        setIsInWishlist(true);
                        setColor('#5956E9');
                        
                        let newWishlist: any = [...wishlist, id];
                        await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
                        setWishlist(newWishlist);
                  }
            }
            else{
                   setIsInWishlist(true);
                        setColor('#5956E9');
                        
                        let newWishlist: any = [...wishlist, id];
                        await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
                        setWishlist(newWishlist);

            }
      }

      useEffect(() => {
            axios.get(productsURL + id)
                  .then(res => {
                        setDetail(res.data);
                        setloading(false);
                  })
      }, [])

      const handleAddBasket = async () => {
            let basket : any = await AsyncStorage.getItem('basket');
            
            if(!basket){
                 basket = [];
                  let basketItem={
                        product:detail,
                        count:1
                  }
                  basket.push(basketItem);
                  await AsyncStorage.setItem('basket', JSON.stringify(basket));
            }
            else{
                  let parsedData = JSON.parse(basket);
                  let basketItem =parsedData.find((item: any) => item.product.id === detail.id) ;    
                  if(basketItem){
                        basketItem.count++;
                        await AsyncStorage.setItem('basket', JSON.stringify(parsedData));
                  }
                  else{
                        let basketItem={
                              product:detail,
                              count:1
                        }
                        parsedData.push(basketItem);
                        await AsyncStorage.setItem('basket', JSON.stringify(parsedData));
                  }         
            }

      }
      return (
            <>
                  <ActivityIndicator style={styles.loading} animating={loading} />
                  {
                        loading ? <></> : <SafeAreaView style={styles.container}>
                              <ScrollView style={styles.mainWrapper}>
                                    <View style={styles.navigator}>
                                          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                                                <SvgArrowLeft />
                                          </TouchableOpacity>
                                          <TouchableOpacity>
                                                <SvgHeart fill={isInWishlist ? color : "white"} stroke={isInWishlist ? color : "#200E32"} onPress={() => wishlistOperations(detail.id)} />
                                          </TouchableOpacity>
                                    </View>
                                    <View style={styles.detailCardWrapper}>
                                          <View>
                                                <View style={styles.imageWrapper}>
                                                      <Image style={styles.productIcon} source={{
                                                            uri: detail.image,
                                                      }} />
                                                </View>
                                          </View>
                                          <View style={{ backgroundColor: "white" }}>
                                                <View style={styles.detailTextWrapper}>
                                                      <Text style={styles.detailText}>{detail.brand} {detail.model}</Text>
                                                </View>
                                                <Text style={styles.colors}>Colors</Text>
                                                <View style={styles.colorsWrapper}>
                                                      <View style={styles.colorWrapper}>
                                                            <View style={styles.color}></View>
                                                            <Text style={styles.colorText}>Sky Blue</Text>
                                                      </View>
                                                      <View style={styles.colorWrapper}>
                                                            <View style={[styles.color, styles.midColor]}></View>
                                                            <Text style={styles.colorText}>Rose Gold</Text>
                                                      </View>
                                                      <View style={styles.colorWrapper}>
                                                            <View style={[styles.color, styles.endColor]}></View>
                                                            <Text style={styles.colorText}>Green</Text>
                                                      </View>
                                                </View>
                                                <View style={styles.futureWrapper}>
                                                      <Text style={styles.futureText}>Get Apple TV+ free for a year</Text>
                                                </View>
                                                <View style={styles.descriptionWrapper}>
                                                      <Text style={styles.description}>{detail.description}</Text>
                                                </View>
                                                <View style={styles.priceWrapper}>
                                                      <Text style={styles.priceText}>Price</Text>
                                                      <Text style={styles.price}>${detail.price}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.buttonWrapper} onPress={handleAddBasket}>
                                                      <Text style={styles.buttonText}>Add to basket</Text>
                                                </TouchableOpacity>
                                          </View>
                                    </View>
                              </ScrollView>
                        </SafeAreaView>
                  }
            </>
      )
}

export default ProductDetail

const styles = StyleSheet.create({
      loading: {
            color: '#5956E9',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateY: 450 }],
      },
      container: {
            flex: 1,
            backgroundColor: '#fff',
      },
      detailCardWrapper: {
            margin: 25,

      },
      imageWrapper: {

      },
      productIcon: {
            width: "100%",
            height: 394.17,
            resizeMode: "cover",
      },
      detailTextWrapper: {},
      detailText: {
            fontWeight: "600",
            fontSize: 28,
            height: 52,
      },
      colorWrapper: {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0.5,
            padding: 12,
            borderRadius: 10,
            borderColor: "#E3E3E3"
      },
      color: {
            width: 16,
            height: 16,
            backgroundColor: "#7485C1",
            marginRight: 10,
            borderRadius: 50,
      },
      colorText: {
            fontWeight: "700",
            fontSize: 12,
      },
      colors: {
            fontWeight: "700",
            fontSize: 17,
            marginBottom: 10,
      },
      colorsWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
      },
      midColor: {
            backgroundColor: "#C9A19C",
      },
      endColor: {
            backgroundColor: "#A1C89B",
      },
      futureWrapper: {
            marginVertical: 10,
      },
      futureText: {
            fontWeight: "700",
            fontSize: 17,
      },
      descriptionWrapper: {
            marginBottom: 20,
      },
      description: {
            fontWeight: "400",
            fontSize: 15,
            color: "#808080"
      },
      priceWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 13,
      },
      priceText: {
            fontWeight: "300",
            fontSize: 17,
      },
      price: {
            fontWeight: "700",
            fontSize: 22,
            color: "#5956E9"
      },
      buttonWrapper: {
            borderRadius: 10,
            padding: 15,
            backgroundColor: "#5956E9",
      },
      buttonText: {
            fontWeight: "700",
            fontSize: 20,
            color: "#fff",
            textAlign: "center",
      },
      mainWrapper: {},
      navigator: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginHorizontal: 25
      },
})
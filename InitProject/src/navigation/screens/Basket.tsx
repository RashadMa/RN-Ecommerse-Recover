import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import SvgNotification from '../../components/icons/Notification'
import SvgDelete from '../../components/icons/Delete'

const Basket = () => {

      const [basket, setBasket] = useState<any>([])
      const [total, setTotal] = useState(0)
      const isFocused = useIsFocused()
      useEffect(() => {
            if (isFocused) {
                  getBasket()
            }
      }, [isFocused])

      let totalPrice = () => {
            let total = 0
            if (basket.length > 0) {

                  basket.forEach((item: any) => {
                        total += item.product.price * item.count
                  });
            }
            return total
      }
      const getBasket = async () => {
            let basket: any = await AsyncStorage.getItem('basket')
            setBasket(JSON.parse(basket))
      }
      const handleDecrease = async (id: number) => {
            let item: any = basket.find((pr: any) => pr.product.id === id)

            if (item.count >= 1) {
                  item.count--;
                  console.log(basket);

                  await AsyncStorage.setItem('basket', JSON.stringify(basket))
                  setBasket([...basket])
            }
      }
      const handleIncrease = async (id: number) => {
            let item: any = basket.find((pr: any) => pr.product.id === id)

            item.count++;
            console.log(basket);

            await AsyncStorage.setItem('basket', JSON.stringify(basket))
            setBasket([...basket])
      }

      const handleDelete = async (id: number) => {
            let newBasket: any = basket.filter((pr: any) => pr.product.id !== id)
            await AsyncStorage.setItem('basket', JSON.stringify(newBasket))
            setBasket([...newBasket])
      }
      return (
            <View style={{ flex: 1 }}>
                  <SafeAreaView style={styles.container}>
                        <View style={styles.headerTextWrapper}>
                              <Text style={styles.headerText}>Basket</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                              <View style={styles.basketHeader}>
                                    <View>
                                          <SvgNotification />
                                    </View>
                                    <Text style={styles.basketHeaderText}>
                                          Delivery for FREE until the end of the month
                                    </Text>
                              </View>
                        </View>

                        {
                              basket && basket.length > 0 ?
                                    <FlatList
                                          data={basket}
                                          // keyExtractor={(item:any)=>item.product?.id}
                                          renderItem={({ item }: any) => (
                                                <View style={styles.cardWrapper}>
                                                      <TouchableOpacity style={styles.btnDelete} onPress={() => handleDelete(item.product.id)}>
                                                            <SvgDelete />
                                                      </TouchableOpacity>
                                                      <View>
                                                            <Image style={styles.prodImg} source={{
                                                                  uri: item.product.image,
                                                            }} />
                                                      </View>
                                                      <View>
                                                            <View>
                                                                  <Text style={styles.brandText}>{item.product.brand} {item.product.model}</Text>
                                                            </View>
                                                            <View>
                                                                  <Text style={styles.priceTag}>$ {item.product.price}</Text>
                                                            </View>
                                                            <View style={styles.quantityWrapper}>
                                                                  <Text>
                                                                        Quantity
                                                                  </Text>
                                                                  <TouchableOpacity style={styles.btn} onPress={() => handleDecrease(item.product.id)}>
                                                                        <Text style={{ color: "#fff" }}>-</Text>
                                                                  </TouchableOpacity>
                                                                  <Text>
                                                                        {item.count}
                                                                  </Text>
                                                                  <TouchableOpacity style={styles.btn} onPress={() => handleIncrease(item.product.id)}>
                                                                        <Text style={{ color: "#fff" }}>+</Text>
                                                                  </TouchableOpacity>
                                                            </View>
                                                      </View>
                                                </View>
                                          )}
                                    /> : <Text>There is no item in basket</Text>
                        }
                        {
                              basket && <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.totalPrice}>Total: </Text>
                                    <Text style={styles.price}>${totalPrice()}</Text>
                              </View>
                        }
                  </SafeAreaView>
            </View>

      )
}

export default Basket

const styles = StyleSheet.create({
      btn: {
            backgroundColor: "#7DCCEC",
            borderRadius: 100,
            width: 20,
            height: 20,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 5
      },
      container: {
            marginHorizontal: 50,
            marginTop: 20,
      },
      headerTextWrapper: {
            alignItems: "center",
            marginBottom: 40
      },
      headerText: {
            fontSize: 18,
            fontWeight: "700"
      },
      basketHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#D3F2FF",
            width: 256,
            height: 39,
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            marginBottom: 30
      },
      basketHeaderText: {
            fontSize: 10,
            fontWeight: "600",
            alignItems: "center",
            justifyContent: "center"
      },
      cardWrapper: {
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            flexDirection: "row",
            padding: 15,
            alignItems: "center",
            marginBottom: 20,
      },
      prodImg: {
            width: 80,
            height: 105,
            marginRight: 20,
      },
      brandText: {
            fontWeight: "600",
            fontSize: 16,
            marginBottom: 5
      },
      priceTag: {
            color: "#5956E9",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 5
      },
      quantityWrapper: {
            flexDirection: "row",
      },
      btnDelete: {
            position: "absolute",
            right: 10,
            top: 10,
      },
      totalPrice: {
            // position: "absolute",
            // bottom: 10,
            fontWeight: "400",
            fontSize: 17,
      },
      price: {
            color: "#5956E9",
            fontWeight: "700",
            fontSize: 17,
      }
})
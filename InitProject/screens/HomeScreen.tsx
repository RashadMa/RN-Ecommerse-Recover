import { SafeAreaView, StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { categoriesURL, productsURL } from '../actions/baseURL'
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgSearch from '../src/components/icons/Search';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setloading] = useState(true)
  const [originalDatas, setOriginalDatas] = useState([]);
  useEffect(() => {
    axios.get(productsURL).then(response => {
      setProducts(response.data)
      setOriginalDatas(response.data)
      setloading(false);
    })
  }, [])
  useEffect(() => {
    axios.get(categoriesURL).then(response => {
      setCategories(response.data)
    })
  }, [])

  const search = (value: string) => {
    let filteredProducts = originalDatas.filter((q: { brand: string; }) => q.brand.toLowerCase().includes(value.toLowerCase()));
    setProducts([...filteredProducts]);
  }

  const renderProducts = ({ item }: any) => {
    return <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item.id })}>
      <View style={styles.productCard}>
        <View style={styles.productImageWrapper}>
          <Image style={styles.productIcon} source={{
            uri: item.image,
          }} />
        </View>
        <View style={styles.productTexts}>
          <View style={styles.productBrandWrapper}>
            <Text style={styles.productBrand}>{item.brand}</Text>
          </View>
          <View style={styles.productModelWrapper}>
            <Text style={styles.productModel}>{item.model}</Text>
          </View>
          <View style={styles.productPriceWrapper}>
            <Text style={styles.productPrice}>$ {item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  }

  const renderCategories = ({ item }: any) => {
    return <View style={styles.categoriesWrapper}>
      <Text style={styles.categories}>{item.categoryName}</Text>
    </View>
  }

  return (
    <>
      <ActivityIndicator style={styles.loading} animating={loading} />
      {
        loading ? <></> : <SafeAreaView style={styles.container}>
          <View style={styles.mainWrapper}>
            <View>
              <SvgSearch style={styles.search} />
              <TextInput onChangeText={search} style={styles.input} placeholder='Search' placeholderTextColor={"grey"} />
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerText}>Order online collect in store</Text>
            </View>
            {
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={categories}
                renderItem={renderCategories}
                ItemSeparatorComponent={() => <View style={{ width: 50 }} />}
              />
            }
            {
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={products}
                renderItem={renderProducts}
              />
            }
          </View>
        </SafeAreaView>
      }
    </>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#C9C9C9",
    padding: 17,
  },
  mainWrapper: {
    margin: 15,
  },
  headerWrapper: {
    marginTop: 30,
    marginBottom: 80,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 30,
    width: 243,
    height: 80,
  },
  categoriesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categories: {
    fontWeight: "400",
    fontSize: 15,
    color: "#9A9A9D",
  },
  productCard: {
    backgroundColor: "white",
    marginVertical: 120,
    width: 220,
    height: 270,
    borderRadius: 20,
    shadowColor: "#393939",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  productImageWrapper: {
    borderRadius: 100,
    alignItems: "center",
  },
  productBrandWrapper: {
    marginBottom: 10,
  },
  productModelWrapper: {},
  productPriceWrapper: {
    borderRadius: 30,
  },
  productIcon: {
    width: 160,
    height: 160,
    transform: [{ translateY: -50 }],
    borderRadius: 100,
    resizeMode: "contain",
  },
  productTexts: {
    alignItems: "center",
    transform: [{ translateY: -30 }],
  },
  productBrand: {
    fontWeight: "400",
    fontSize: 20,
  },
  productModel: {
    fontWeight: "400",
    fontSize: 15,
    color: "#868686",
    marginBottom: 20,
  },
  productPrice: {
    fontWeight: "500",
    fontSize: 16,
    color: "#5956E9",
  },
  loading: {
    color: '#5956E9',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 450 }],
  },
  search: {
    position: 'absolute',
    right: 20,
    top: 14,
  }
})

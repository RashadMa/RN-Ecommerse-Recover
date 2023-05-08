import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

const Basket = () => {

  const [basket,setBasket]= useState<any>([])
  const [total,setTotal]= useState(0)
  const isFocused= useIsFocused()
      useEffect(() => {
           if(isFocused){
                    getBasket()
           }
      },[isFocused])

      let totalPrice = ()=>{
            let total = 0
            if(basket.length>0){

                  basket.forEach((item:any) => {
                        total+=item.product.price*item.count
                  });
            }
            return total
      }
const getBasket = async () => {
      let basket :any= await AsyncStorage.getItem('basket')
      setBasket(JSON.parse(basket))
}
const handleDecrease= async(id:number)=>{
    let item :any= basket.find((pr:any)=>pr.product.id===id )

      if(item.count>=1){
      item.count--;
      console.log(basket);
      
           await AsyncStorage.setItem('basket',JSON.stringify(basket))
           setBasket([...basket])
      }
}
const handleIncrease=async(id:number)=>{
      let item :any= basket.find((pr:any)=>pr.product.id===id )   
       
             item.count++;
             console.log(basket);
             
                  await AsyncStorage.setItem('basket',JSON.stringify(basket))
                  setBasket([...basket])
}

const handleDelete=async(id:number)=>{
      let newBasket :any= basket.filter((pr:any)=>pr.product.id!==id )   
                  await AsyncStorage.setItem('basket',JSON.stringify(newBasket))
                  setBasket([...newBasket])
}
  return (
    <SafeAreaView>
      {
  basket&&  basket.length>0?
     <FlatList
      data={basket}
      // keyExtractor={(item:any)=>item.product?.id}
      renderItem={({item}:any)=>(
            <View style={{flexDirection:"row", padding:20,backgroundColor:"#e3e3e3",marginBottom:16,alignItems:"center",justifyContent:"center",gap:8}}> 
                  <Text style={{color:"red",fontSize:22}}>{item.product.brand} </Text>
                  <TouchableOpacity style={styles.btn} onPress={()=>handleDecrease(item.product.id)}>
                  <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{item.count}</Text>
                  <TouchableOpacity style={styles.btn} onPress={()=>handleIncrease(item.product.id)}>
                  <Text>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn} onPress={()=>handleDelete(item.product.id)}>
                  <Text>X</Text>
                  </TouchableOpacity>
            </View>
      )}
     />:<Text>yoxdur</Text>
      }
      {
    basket&& <Text>Total Price: {totalPrice()}</Text>

      }
    </SafeAreaView>
  )
}

export default Basket

const styles = StyleSheet.create({
      btn:{
            backgroundColor:"red",
            borderRadius:100,
            width:30,
            height:30,
            alignItems:"center",
            justifyContent:"center",
      }
})
import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Minus from '../../assets/svg/Minus';
import Plus from '../../assets/svg/Plus';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase/firebase';

interface OrderProps {
  route: any;
}

interface OrderItem {
  title: string;
  subTitle: string;
  price: number;
  count: number;
}

const Order: React.FC<OrderProps> = ({ route }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { user, orders } = route.params;
  console.log(orders)
  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      orders.forEach((order) => {
        totalPrice += order.price * order.count;
      });
      return totalPrice.toFixed(2);
    };
  
    const total = calculateTotalPrice();
    setTotalPrice(parseFloat(total));
  }, [orders]);

  const handleMinusPress = async (orderItem: OrderItem) => {
    if (orderItem.count > 1) {
      const newCount = orderItem.count - 1;
      const orderDocRef = doc(db, 'users', user.uid, 'order', orderItem.title);
      await updateDoc(orderDocRef, { count: newCount });
    } else {
      const orderDocRef = doc(db, 'users', user.uid, 'order', orderItem.title);
      await deleteDoc(orderDocRef);
    }
  };
  const handlePlusPress = async (orderItem: OrderItem) => {
    const newCount = orderItem.count + 1;
    const orderDocRef = doc(db, 'users', user.uid, 'order', orderItem.title);
    await updateDoc(orderDocRef, { count: newCount });
  };





  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {orders.map((order: OrderItem, index: number) => (
          <LinearGradient key={index} colors={['rgba(34, 143, 98, 0.5)', 'rgba(34, 143, 98, 0.5)', 'rgba(34, 143, 98, 0.2)']} locations={[0, 0.5, 1]} style={styles.orderBlock}>
            <View style={styles.blockImg}>
              <Image source={require('../../assets/test2.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
            </View>
            <View style={styles.blockInfo}>
              <Text style={styles.blockInfoTitle}>{order.title}</Text>
              <Text style={styles.blockInfoSubTitle}>{order.subTitle}</Text>
              <View style={styles.BlockInfoBtns}>
                <Text style={styles.btnPrice}>{order.price}</Text>
                <View style={styles.btns}>
                  <TouchableOpacity onPress={() => handleMinusPress(order)}>
                    <Minus />
                  </TouchableOpacity>
                  <Text style={styles.btnsNum}>{order.count}</Text>
                  <TouchableOpacity onPress={() => handlePlusPress(order)}>
                    <Plus />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        ))}
        <LinearGradient colors={['rgba(34, 143, 98, 0.5)', 'rgba(34, 143, 98, 0.5)', 'rgba(34, 143, 98, 0.2)']} locations={[0, 0.5, 1]} style={styles.totalPrice}>
          <View style={styles.totalPriceSubtotal}>
            <Text style={styles.subTotalTite}>Subtotal</Text>
            <Text style={styles.subTotalPrice}>{totalPrice}</Text>
          </View>
          <View style={styles.totalPriceTotal}>
            <Text style={styles.TotalTite}>Total amount</Text>
            <Text style={styles.TotalPrice}>$31.50</Text>
          </View>
        </LinearGradient>
      </View>
      <TouchableOpacity style={styles.totalBtn}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Заказать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: '10%',
    paddingBottom: '10%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  totalPriceTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalPrice: {
    borderRadius: 15,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'column',
  },
  totalPriceSubtotal: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subTotalTite: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subTotalPrice: {
    fontSize: 18,
  },
  TotalTite: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  TotalPrice: {
    fontSize: 18,
  },
  orderBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  totalBtn: {
    height: 50,
    width: '100%',
    backgroundColor: '#20B25D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockImg: {
    width: 88,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  blockInfo: {
    flex: 1,
  },
  blockInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blockInfoSubTitle: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 5,
  },
  BlockInfoBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  btnsNum: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
});

export default Order;

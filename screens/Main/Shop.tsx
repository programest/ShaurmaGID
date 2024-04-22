
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import ProductLikeImg from '../../assets/svg/ProductLikeImg';
import { Ionicons } from '@expo/vector-icons';
import {  setDoc, Firestore } from 'firebase/firestore';

import ProductImg from '../../assets/svg/ProductImg';
import { useNavigation } from '@react-navigation/native';
import { doc,addDoc, getDoc, DocumentSnapshot, DocumentData, getDocs, collection, QuerySnapshot } from 'firebase/firestore';
import { db } from "../../firebase/firebase";
import RatingStars from '../../components/RatingStars';
import Back from '../../assets/svg/Back';

interface OrderItem {
    adress: string;
    name: string;
    coordinates: {
      latitude: number;                 
      longitude: number;                
    };
  }

  interface ProductionItem {
    adress: string;
    name: string;
    coordinates: {
      latitude: number;                 
      longitude: number;                
    };
  }



const Shop: React.FC = ({ route }: any) => {
    const navigation = useNavigation();
    const { markerData } = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [productions, setProductions] = useState<OrderItem[]>([]); // Массив маркеров
    const [selectedCategory, setSelectedCategory] = useState<string>();


    const handleCategoryPress = (categoryTitle: string) => {
      setSelectedCategory(categoryTitle);
    };
    const userId = 'JqS5sm6j1BZ4higvQ0tWeglQKa92';

    // Путь к коллекции заказов пользователя
    const userOrderCollectionPath = `users/${userId}/order`;
    
   
    
    // Функция для записи данных заказа в коллекцию "order" пользователя
    const addOrderToFirestore = async (db: Firestore, userOrderCollectionPath: string, orderName: string, orderData: any) => {
      try {
        const orderDocRef = doc(db, userOrderCollectionPath, orderName); // Получаем ссылку на документ в коллекции "order" пользователя
        await setDoc(orderDocRef, orderData); // Записываем данные заказа в этот документ
        navigation.navigate('OrderTab');
        console.log('Данные заказа успешно записаны в Firestore');
      } catch (error) {
        console.error('Ошибка записи данных заказа в Firestore:', error);
      }
    };
    


    useEffect(() => {
      const fetchData = async () => {
        try {
          const shopRef = doc(db, 'shops', markerData.name); // Получаем ссылку на документ магазина
          const productionQuerySnapshot = await getDocs(collection(shopRef, 'production')); // Получаем подколлекцию 'production' для этого магазина
      
          const productionsData: ProductionItem[] = [];
          productionQuerySnapshot.forEach((productionDoc) => {
            if (productionDoc.exists()) {
              const productionData = productionDoc.data() as ProductionItem;
              productionsData.push(productionData);
            }
          });
          if (!selectedCategory && productionsData.length > 0) {
            setSelectedCategory(Object.keys(productionsData[0])[0]);
          }
          setProductions(productionsData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      
        fetchData();
      }, []);
      
      


      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Загрузка...</Text>
          </View>
        );
      }
  
      if (!loading && productions.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.title}>К сожилению на данный момент магазин не доступен</Text>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
              <Text style={styles.goBackText}>Вернуться назад</Text>
            </TouchableOpacity>
          </View>
        );
      }


  return (
    <View style={styles.container}>
    
      {/* Shop Details */}
      <View style={styles.shopDetails}>
        <ImageBackground source={require('../../assets/BGShop.jpg')} style={styles.shopBackground}>
              <View style={styles.header}>
                  <TouchableOpacity style={styles.headerButton}  onPress={() => { navigation.goBack(); }}>
                    <Back />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerButton}>
                      <ProductLikeImg height='45' width='45' />
                  </TouchableOpacity>
              </View>
              <View style={{    marginLeft: 20, marginRight: 20,}}>
                <Text style={styles.shopName}>{markerData.name}</Text>
                <Text style={styles.shopAddress}>{markerData.adress}</Text>
                <RatingStars rating={markerData.grade} />
                
              </View>
                
        </ImageBackground>
      </View>



      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalScrollContainer}>
              {productions.map((item, index) => {
                const categoryTitle = Object.keys(item)[0];
                return (
                  <TouchableOpacity key={index} style={styles.category} onPress={() => handleCategoryPress(categoryTitle)} >
                    <Text style={styles.categoryText}>{categoryTitle}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.largeBlocksContainer}>
        {productions.map((item, index) => {
          const categoryTitle = Object.keys(item)[0];
          const productInfo = Object.values(item)[0];

          // Проверяем, соответствует ли текущая категория выбранной категории
          if (selectedCategory === categoryTitle) {
            return (
              <View style={styles.categoryNews} key={index} >
                                    
              <ImageBackground source={require('../../assets/BGShop.jpg')} style={styles.categoryNewsImg}>
              <View style={{paddingLeft: 20, paddingRight: 20, }}> 
                  <Text style={styles.categoryNewsTitle}>{productInfo.title}</Text>
                  <Text style={styles.categoryNewsText}>{productInfo.SubTitle}</Text>
                  {/* <Text style={styles.categoryNewsButton}>Адрес</Text> */}
                  </View>
              </ImageBackground>
          </View>
            );
          } else {
            return null; // Пропускаем отображение продуктов из других категорий
          }
        })}
      </View>
    </ScrollView>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.largeBlocksContainer}>
        {productions.map((item, index) => {
          const categoryTitle = Object.keys(item)[0];
          const productInfo = Object.values(item)[0];
          
          // Проверяем, соответствует ли текущая категория выбранной категории
          if (selectedCategory === categoryTitle) {
            return (
            
              <TouchableOpacity style={styles.categoryProduct} key={index} onPress={() => {
                    
                    const orderData = { // Создаем объект orderData
                      title: productInfo.title,
                      subTitle: productInfo.subTitle,
                      price: productInfo.price,
                      count: 1,
                    };
                        (db, userOrderCollectionPath,productInfo.title ,  orderData); // Передаем orderData в функцию addOrderToFirestore
                  }}>
              <View style={styles.categoryProductInner}>
                  <View style={[styles.coloredBlock, styles.greenBlock]} />
                  <View style={[styles.coloredBlock, styles.whiteBlock]} />
                  <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}> 
                          <ProductLikeImg height='30' width='30' />
                  </TouchableOpacity>
                      <View style={styles.productInfo}>   
                          <View style={{height: 91, width: 129}}>                 
                              <Image source={require('../../assets/productImg.png')} style={styles.productImg} />
                          </View>  
                          <Text style={styles.productInfoTitle}>{productInfo.title}</Text>
                          <Text style={styles.productInfoText}>{productInfo.subTitle}</Text>
                          <View style={styles.productInfoBlock}> 
                              <Text style={styles.productInfoPrice}>${productInfo.price}</Text>
                          </View>
                          <View style={{position: 'absolute', right: -40, bottom: -55}}>                 
                              <Image source={require('../../assets/ProductImgPlus.png')}  />
                          </View>  
                      </View>
                  </View>
          </TouchableOpacity>
            );
          } else {
            return null; // Пропускаем отображение продуктов из других категорий
          }
        })}
      </View>
    </ScrollView>

   
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#20B25D',
    borderRadius: 10,
  },
  goBackText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
    productImg: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',

    },
    productInfoBlock: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    categoryProductInner: {
        borderRadius: 20,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productInfo: {
        marginTop: '40%',
        alignItems: 'center',
       
        justifyContent: 'center'
      },
      productInfoImg: {
        width: 100,
        height: 100,
        
      },
      productInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    
      },
      productInfoText: {
        fontSize: 14,
        marginBottom: 30,
      },
      priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      productInfoPrice: {
        fontSize: 15,
        textAlign: 'left',
        alignItems: 'flex-start',
        fontWeight: 'bold',
        justifyContent: 'flex-start',

      },
      productInfoPlus: {
        width: 30,
        height: 30,
      },
  container: {
    flex: 1,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  headerButton: {
    
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shopDetails: {
    alignItems: 'center',
    marginBottom: 20,
  
  },
  shopBackground: {
    width: '100%',
    
    height: 250,
    resizeMode: 'cover',
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  shopRating: {
    fontSize: 16,
    marginTop: 5,
  },
  shopAddress: {
    marginBottom:5,
    fontSize: 16,
    marginTop: 5,
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  largeBlocksContainer: {
    flexDirection: 'row',
    position: 'relative',
    paddingHorizontal: 10,
  },
  category: {
    marginLeft: 5,
    marginRight: 5,
    height: 40, 
    marginBottom: 30,
    backgroundColor: '#228F62',
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 20,
    justifyContent: 'center'
  },
  categoryText: {

  },
  categoryNews: {
    marginRight: 40,
    marginBottom: 30,
    width: 300,

    borderRadius: 20,
    justifyContent: 'center'
  },
  categoryNewsText: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: '400',
  },
  categoryNewsButton: {
    fontSize: 17,
    fontWeight: '700',
  },
  categoryNewsTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  categoryNewsImg: {
    borderRadius: 30,
    width: '100%',
    resizeMode: 'cover',
    

  },coloredBlock: {
    width: '50%',
    height: '50%',
    position: 'absolute',
   
  },
  greenBlock: {
    backgroundColor: '#228F62',
    top: 0,
    width: '100%',
    
  },
  whiteBlock: {
    backgroundColor: '#fff',
    bottom: 0,
    width: '100%'
  },
  categoryProduct: {
    marginRight: 15,
    marginBottom: 40,
    backgroundColor:'#228F62',
    width: 160,
    borderRadius: 20,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default Shop;

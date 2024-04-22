import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert , Text, TouchableOpacity , FlatList, StyleSheet} from 'react-native';
import MapView, { Marker,Callout } from 'react-native-maps';
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc , getDocs, collection} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import Search from '../../assets/svg/Search';
import RatingStars from '../../components/RatingStars';
import DraggableBlock from '../../components/DraggableBlock';
interface Location {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  grade: number;
  adress: string;
  time: string;
}

export default function MapSearch({ route }: any) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Состояние для отслеживания загрузки данных
  const { markers } = route.params;
  
  const navigation = useNavigation();

  function SearchFunc() {
    
      const filteredMarkers = markers.filter(marker =>
        marker.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filteredMarkers);
    
   
  }


  return (
    
    <View style={{ flex: 1 }}>
      
      <MapView style={{ flex: 1 }} initialRegion={{ latitude: 46.8411, longitude: 29.6349,  latitudeDelta: 0.1, longitudeDelta: 0.1 }}>
  {markers.map((marker, index) => (
    marker.coordinates && (
      <Marker
        key={index}
        coordinate={{ latitude: marker.coordinates.latitude, longitude: marker.coordinates.longitude }}
        title={marker.name}
      >
        <Callout style={styles.calloutContainer} onPress={() => navigation.navigate('Shop', { markerData: marker })}>
          <View>
            <Text style={styles.calloutName}>{marker.name}</Text>
            <Text style={styles.calloutAdress}>{marker.adress}</Text>
            
            <View style={{flexDirection:'row' , justifyContent: 'space-between'}}>
                        <RatingStars rating={marker.grade} />
                        <Text style={styles.searchTime}>{marker.time}</Text>
                      </View>
          </View>
        </Callout>
      </Marker>
    )
  ))}
      </MapView>
      <DraggableBlock > 
      <View style={{marginLeft: 10, marginRight: 10, marginBottom: 35 }}>
        <View style={{  borderRadius: 30, backgroundColor: 'lightgray',marginTop: 20, paddingLeft: 10, paddingRight: 10 , }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, borderRadius: 20,  }}>
                <TextInput
                  placeholder="Поиск"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={{ flex: 1, marginLeft: 10 }}
                />
                <TouchableOpacity onPress={() => SearchFunc()}>
                  <Search color={'#228F62'} style={{ marginTop: 0 }} size={40} />  
                </TouchableOpacity>
                
              </View>
            
          </View>
          
          <View style={styles.searchInfo}> 
          
                <FlatList
                  data={filteredLocations}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('Shop', { markerData: item })}>
                      <Text style={styles.searchTitle}>{item.name}</Text>
                      <Text style={styles.searchSubTitle}>{item.adress}</Text>
                      <View style={{flexDirection:'row' , justifyContent: 'space-between', }}>
                        <RatingStars rating={item.grade} />
                       
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', }}>
                        <Text style={styles.searchTime}>{item.time}</Text>
                      </View>
                      </View>
                    
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                />
          </View>
          
      </View>
    </DraggableBlock>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInfo: {
    width: '100%',
   
  },
  searchBtn: {
    width: '100%',

    padding: 10,
    justifyContent: 'center',
    marginBottom: 15,

  },
  searchTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5
  },
  searchSubTitle: {
    fontSize: 12,
    marginBottom: 9, 
  

  },
  searchTime: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '300',
    color: '#252733',
    flexWrap: 'wrap',
    
  },
  calloutName: {
    fontSize: 16,
    fontWeight: '600',
  },
  calloutAdress:{
    fontSize: 12,
    fontWeight: '400',
  },
    calloutGrade: {
      fontSize: 14,
      fontWeight: '300',
    },
  calloutTime: {
    fontSize: 11,
    fontWeight: '200',
  },
  calloutContainer: {
    width: 250
  }
})
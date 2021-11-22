import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Button } from 'native-base';

const LocationExample = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});;
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';
    var coords = {};
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = location.coords;
      coords = location.coords;
    }
    const saveCoords = async ()=>{
      const formData = new FormData();
      formData.append('latitude',coords.latitude);
      formData.append('longitude',coords.longitude);
      const response = await axios.post('http://192.168.1.71:80/AplicacionesMoviles/index.php',
      formData,
      {headers:{'Content-type':'multipart/form-data'}})
      console.log(response)
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Latitud: {text.latitude}</Text>
        <Text style={styles.paragraph}>Longitud: {text.longitude}</Text>
        <Button onPress={saveCoords}>Guardar coordenadas</Button>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
    },
  });
export default LocationExample;

import { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const nearbyLocations = [
  { id: "0", latitude: -22.581500, longitude: -49.404000, },
  { id: "1", latitude: -22.576200, longitude: -49.393500, },
  { id: "2", latitude: -22.574800, longitude: -49.412300, },
  { id: "3", latitude: -22.568900, longitude: -49.401700, },
  { id: "4", latitude: -22.579700, longitude: -49.394200, },
  { id: "5", latitude: -22.577000, longitude: -49.413100, },
  { id: "6", latitude: -22.571100, longitude: -49.405600, },
  { id: "7", latitude: -22.582000, longitude: -49.407800, },
  { id: "8", latitude: -22.573500, longitude: -49.398300, },
  { id: "9", latitude: -22.570200, longitude: -49.400900 }
];


export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      // if (Platform.OS === 'android') {
      //   setErrorMsg(
      //     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      //   );
      //   return;
      // }
      let { status, canAskAgain, expires, granted } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location)

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09
        }, 1000)
      }
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  // 
  let text = 'Waiting...';

  if (errorMsg) {
    text = errorMsg;
  }
  // 
  return (
    <View style={styles.container}>
      <MapView
        ref={
          mapRef
        }
        style={styles.map}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {
          location && nearbyLocations.map(item => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item?.latitude,
                longitude: item?.longitude
              }}
            >
              <AntDesign name="car" size={24} color="black" />
            </Marker>
          ))
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

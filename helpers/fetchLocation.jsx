import * as Location from "expo-location"

// export const fetchLocation = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         return ('Permission to access location was denied');
//       }

//       let locationData = await Location.getCurrentPositionAsync({});
//       return (locationData);
//     } catch (error) {
//       console.log('Error fetching location', error.message);
//     }
//   };

export const fetchLocation = new Promise(async (resolve, reject) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      reject('Permission to access location was denied');
    }

    let locationData = await Location.getCurrentPositionAsync({});
    resolve(locationData);

})
const collageLongitude = 12.2618706
const collageLatitude = 79.6593992

export const collageLocationRadius = (userLatitude, userLongitude) => {

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371000;

        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const lat1Rad = lat1 * Math.PI / 180;
        const lat2Rad = lat2 * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    }

    const distance = calculateDistance(collageLatitude, collageLongitude, userLatitude, userLongitude);

    return distance

}
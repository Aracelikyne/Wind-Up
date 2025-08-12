// The coffee shop's fixed location (latitude, longitude) and maximum delivery distance.
const COFFEE_SHOP_COORDINATES = { lat: 29.5502, lon: -98.3089 }; // Universal City, TX
const MAX_DELIVERY_DISTANCE_KM = 40; // Approx. 25 miles

/**
 * Converts a street address into geographic coordinates using Mapbox API.
 * @param {string} address The address to geocode.
 * @returns {Promise<object|null>} An object with lat and lon, or null on error.
 * To test use zip code 78233 or one in 25 miles for TRUE outside of 25 miles for FALSE
 */
async function getCoordinatesForAddress(address) {
  const API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
  if (!API_KEY) {
    console.error('Mapbox API key is missing. Check your .env file.');
    return null;
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=${API_KEY}&limit=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].center;
      return { lat, lon };
    }
    return null; // Address not found
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

/**
 * Calculates the straight-line distance between two points on Earth using the Haversine formula.
 * @param {object} coord1 First coordinate { lat, lon }.
 * @param {object} coord2 Second coordinate { lat, lon }.
 * @returns {number} The distance in kilometers.
 */
function calculateDistance(coord1, coord2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLon = ((coord2.lon - coord1.lon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Checks if a customer's address is within the delivery radius.
 * @param {string} customerAddress The address to check.
 * @returns {Promise<boolean>} A promise that resolves to true if deliverable, false otherwise.
 */
export async function checkDeliveryRange(customerAddress) {
  const customerCoordinates = await getCoordinatesForAddress(customerAddress);

  if (!customerCoordinates) {
    return false; // Could not find the address
  }

  const distanceInKm = calculateDistance(
    COFFEE_SHOP_COORDINATES,
    customerCoordinates,
  );

  return distanceInKm <= MAX_DELIVERY_DISTANCE_KM;
}
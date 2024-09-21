
export const formatTime = (timer: number) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

/*
 * Copyright (c) 2024 홍정민
 * All rights reserved.
 */

// async function searchBusiness(
//   businessType: string,
//   query: string,
//   useReverseGeocode: boolean,
//   lat: number,
//   lon: number,
//   page = 1,
// ) {
//   const url = 'https://pcmap-api.place.naver.com/graphql';
//   console.log(
//     `Searching for ${businessType} with query: ${query}, lat: ${lat}, lon: ${lon}`,
//   );
//   let params;

//   switch (businessType) {
//     case 'restaurant':
//       params = {
//         operationName: 'getRestaurants',
//         variables: {
//           input: {
//             query: query,
//             x: lon.toString(),
//             y: lat.toString(),
//             start: (page - 1) * 70 + 1,
//             display: 70,
//             deviceType: 'pcmap',
//             sortingOrder: 'precision',
//           },
//           isNmap: true,
//           useReverseGeocode: true,
//         },
//         query: `
//           query getRestaurants($input: RestaurantListInput, $isNmap: Boolean!, $useReverseGeocode: Boolean!) {
//               restaurants: restaurantList(input: $input) {
//                 total
//                 items {
//                   id
//                   name
//                   category
//                   roadAddress
//                   address
//                   phone
//                   virtualPhone
//                   x
//                   y
//                   imageUrl
//                   reviewCount
//                   bookingReviewCount
//                   totalReviewCount
//                   visitorReviewCount
//                   bookingReviewScore
//                   visitorReviewScore
//                   description
//                   options
//                   businessHours
//                   microReview
//                   imageMarker @include(if: $isNmap) {
//                     marker
//                     markerSelected
//                   }
//                   markerId @include(if: $isNmap)
//                   markerLabel @include(if: $isNmap) {
//                     text
//                     style
//                   }
//                 }
//               }
//               ${
//                 useReverseGeocode
//                   ? `
//               reverseGeocodingAddr(input: {x: "${lon}", y: "${lat}"}) @include(if: $useReverseGeocode) {
//                 rcode
//                 region
//               }
//               `
//                   : ''
//               }
//             }
//         `,
//       };
//       break;
//     case 'beauty':
//       params = {
//         operationName: 'getBeautyList',
//         variables: {
//           input: {
//             query: query,
//             x: lon.toString(),
//             y: lat.toString(),
//             start: (page - 1) * 63 + 1,
//             display: 63,
//             deviceType: 'pcmap',
//             sortingOrder: 'precision',
//           },
//           isNmap: true,
//           useReverseGeocode: true,
//         },
//         query: `
//           query getBeautyList($input: BeautyListInput, $isNmap: Boolean!, $useReverseGeocode: Boolean!) {
//               businesses: hairshops(input: $input) {
//                 total
//                 items {
//                   id
//                   name
//                   category
//                   roadAddress
//                   address
//                   phone
//                   virtualPhone
//                   x
//                   y
//                   imageUrl
//                   blogCafeReviewCount
//                   bookingReviewCount
//                   visitorReviewCount
//                   bookingReviewScore
//                   visitorReviewScore
//                   description
//                   options
//                   businessHours
//                   imageMarker @include(if: $isNmap) {
//                     marker
//                     markerSelected
//                   }
//                   markerId @include(if: $isNmap)
//                   markerLabel @include(if: $isNmap) {
//                     text
//                     style
//                   }
//                 }
//               }
//               ${
//                 useReverseGeocode
//                   ? `
//               reverseGeocodingAddr(input: {x: "${lon}", y: "${lat}"}) @include(if: $useReverseGeocode) {
//                 rcode
//                 region
//               }
//               `
//                   : ''
//               }
//             }
//         `,
//       };
//       break;
//     default:
//       throw new Error('Unsupported business type');
//   }

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Referer: 'https://map.naver.com/',
//     },
//   };

//   try {
//     console.log(`Sending request for ${businessType} search...`);
//     const response = await axios.post(url, params, config);
//     console.log(`Received response for ${businessType} search.`);

//     if (businessType === 'restaurant') {
//       return response.data.data.restaurants;
//     } else {
//       return response.data.data.businesses;
//     }
//   } catch (error) {
//     console.error(
//       `Error in searchBusiness for ${businessType}:`,
//       error.message,
//     );
//     return null;
//   }
// }

// // 사용
// export async function main() {
// const type = 'restaurant';
// const query = '강남대학교 맛집';
// const latitude = 37.2718378;
// const longitude = 127.1276313;
// const userReverseGeocode = true;
//   const results = await searchBusiness(
//     type,
//     query,
//     userReverseGeocode,
//     latitude,
//     longitude,
//   );
//   if (results && results.items) {
//     console.log(`Found ${results.items.length} ${type}s`);
//     results.items.forEach(item => {
//       console.log(`Name: ${item.name}`);
//       console.log(`Address: ${item.address}`);
//       console.log(`Phone: ${item.phone || item.virtualPhone}`);
//       console.log('---');
//     });
//   } else {
//     console.log(`No results found for ${type} search.`);
//   }
// }

// main().catch(console.error);

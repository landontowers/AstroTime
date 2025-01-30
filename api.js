// const base_url = 'https://json.freeastrologyapi.com';
// const headers = {
//     'Content-Type': 'application/json',
//     'x-api-key': process.env.API_KEY
// }
//
// const test_data = {
//     "year": 1998,
//     "month": 4,
//     "date": 3,
//     "hours": 15,
//     "minutes": 13,
//     "seconds": 0,
//     "latitude": 34.4331568,
//     "longitude": -119.8128382,
//     "timezone": -7,
//     "settings": {
//         "observation_point": "topocentric",
//         "ayanamsha": "lahiri"
//     }
// }
//
// async function getPlanets(data) {
//     axios({
//         method: 'post',
//         url: base_url + '/planets',
//         data: data,
//         headers: headers
//     })
//     .then(response => {
//         return response.data;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }
//
// export { getPlanets };
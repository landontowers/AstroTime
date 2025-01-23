const test = require("node:test");
const axios = require('axios').default;
const base_url = 'https://json.freeastrologyapi.com';

const test_headers = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
}
const test_data = {
    "year": 1998,
    "month": 4,
    "date": 3,
    "hours": 15,
    "minutes": 13,
    "seconds": 0,
    "latitude": 34.4331568,
    "longitude": -119.8128382,
    "timezone": -7,
    "settings": {
        "observation_point": "topocentric",
        "ayanamsha": "lahiri"
    }
}

axios({
    method: 'post',
    url: base_url + '/planets',
    data: test_data,
    headers: test_headers
})
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
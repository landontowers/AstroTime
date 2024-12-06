function getLocation()
{
    let location = null;

    function success(position) {
        location = position.coords;
        const latitude  = 40.2789396 // position.coords.latitude;
        const longitude = -111.7107391 // position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // Now you have the user's latitude and longitude!
        // Use this data to calculate LAT as described earlier
    }

    function error(err) {
        console.error(`Error getting geolocation: ${err.message}`);
    }

    const options = {
        enableHighAccuracy: true, // Try to get the most accurate position
        timeout: 5000, // Wait up to 5 seconds for a response
        maximumAge: 0 // Don't use cached position data
    };

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error, options);
        return location;
    } else {
        // Geolocation API is not available in this browser
        console.error('Geolocation is not available.');
    }
}

function getLocation_spoof()
{
    return [40.2789396, -111.7107391];
}
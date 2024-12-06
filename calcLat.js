function calculateEquationOfTime(date) {
    // Get the day of the year (1 to 365)
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

    // Calculate the "B" value used in the formula
    const B = (360 * (dayOfYear - 81)) / 365;

    // Calculate the Equation of Time in minutes
    const equationOfTimeMinutes =
        9.87 * Math.sin(2 * (B * Math.PI / 180)) -
        7.53 * Math.cos((B * Math.PI / 180)) -
        1.5 * Math.sin((B * Math.PI / 180));

    return equationOfTimeMinutes;
}

function calculateLAT(longitude, standardTime, equationOfTime) {
    // 1.  No need to parse the time string, standardTime is already a Date object

    // 2. Calculate Time Difference Due to Longitude (same logic as before)
    const standardMeridian = Math.floor(longitude / 15) * 15;
    const longitudeDifference = longitude - standardMeridian;
    const timeDifferenceMinutes = longitudeDifference * 4;

    // 3. Adjust for Longitude (using Date object's methods)
    let adjustedTime = new Date(standardTime); // Create a copy to avoid modifying the original
    if (longitudeDifference > 0) {  // East of meridian
        adjustedTime.setMinutes(adjustedTime.getMinutes() + timeDifferenceMinutes);
    } else {                       // West of meridian
        adjustedTime.setMinutes(adjustedTime.getMinutes() - timeDifferenceMinutes);
    }

    // 4. Apply Equation of Time (using Date object's methods)
    adjustedTime.setMinutes(adjustedTime.getMinutes() + equationOfTime);

    // 5. Format the output (you can customize this)
    const options = { hour: '2-digit', minute: '2-digit' };
    const latTime = adjustedTime.toLocaleTimeString('en-US', options); // Example formatting
    return latTime;
}

function test(){
    const longitude = -111.7224858; //
    const standardTime = new Date(); //'April 3, 1998 15:13 PDT'
    const equationOfTime = calculateEquationOfTime(standardTime);

    const lat = calculateLAT(longitude, standardTime, equationOfTime);
    console.log("Local Apparent Time:", lat);
}

test();
const locationInput = document.getElementById('location');
const startDateInput = document.getElementById('check-in');
const endDateInput = document.getElementById('check-out');
const guestInput = document.getElementById('guests');
const searchBtn = document.getElementById('search');

// getting data with location,check-in,check-out,guests input values(dateVal = yy-mm-dd)
async function searchListings(loc,checkIn,checkOut,guest){
    let cIn = new Date(checkIn);
    let cOut = new Date(checkOut);
    let month;
    switch(cOut.getMonth()){
      case 1: month = 'Jan';
        break;
      case 2: month = 'Feb';
        break;
      case 3: month = 'March';
        break;
      case 4: month = 'April';
        break;
      case 5: month = 'May';
        break;
      case 6: month = 'June';
        break;
      case 7: month = 'July';
        break;
      case 8: month = 'Aug';
        break;
      case 9: month = 'Sep';
        break;
      case 10: month = 'Oct';
        break;
      case 11: month = 'Nov';
      break;
      default: month = 'Dec';
    }

    let str = month + ' ' + cIn.getDate() + " - " + cOut.getDate();

    const searchDetails = {
      'location':loc,
      'date' : str,
      'guest' : guest
      
    };
    const url =  `https://airbnb13.p.rapidapi.com/search-location?location=${loc}&checkin=${checkIn}&checkout=${checkOut}&adults=${guest}&children=0&infants=0&pets=0&page=1&currency=INR`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a6aa700013mshc3740b2b2ff5e49p1de008jsnd963e6912f36',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      if(localStorage.getItem("data")){
        localStorage.removeItem("data");
      }
      localStorage.setItem('data',result);
      if(!result.error){
          if(localStorage.getItem("searchDetails")){
            localStorage.removeItem("searchDetails");
          }
          localStorage.setItem("searchDetails", JSON.stringify(searchDetails))
          window.location.href = 'search.html';
      }
    } catch (error) {
      console.error(error);
    }
}
searchBtn.addEventListener('click',()=>{
    let location = locationInput.value;
    let checkIn = startDateInput.value;
    let checkOut = endDateInput.value;
    let guest = guestInput.value;

    if(location && checkIn && checkOut && guest && checkOut > checkIn){
        searchListings(location,checkIn,checkOut,guest);
    }

});
// searchListings();




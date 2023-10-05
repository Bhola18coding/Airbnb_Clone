const roomData = JSON.parse(localStorage.getItem('roomId'));
console.log(roomData);
const {result} = roomData.result;
console.log(result);

function handleHeader() {
    document.querySelector('#title').innerText = result.name;
    document.querySelector('#rating').innerText = result.rating;
    document.querySelector('#review').innerText = result.reviewsCount + " reviews";
    if(result.isSuperhost){
        document.querySelector('#isSupHost').innerText = "Super Host";
    }
    document.querySelector('#address').innerText = result.address;
}
handleHeader();

function handleImages() {
    let i;
    let char = 97;
    const imageCont = document.querySelector('.hero'); 
   for (i = 0;  i < 5; i++) {
       let img = document.createElement('img');
       img.className = String.fromCharCode(char);
       img.src = result.images[i];
       char++;
       imageCont.appendChild(img);
   }
}
handleImages();

function handlePrice() {
    document.querySelector('.price').innerText = `${result.price.rate} ₹ / night`
    document.querySelector('#rate').innerText = `${result.rating}`
    document.querySelector('#rev').innerText = `${result.reviewsCount} reviews`
    let price_cont = document.querySelector('.price-details');
    let total = 0;
    for (let i = 0; i < result.price.priceItems.length; i++) {
        const div = document.createElement('div');
        div.className = 'row2';
        div.innerHTML = `
                        <div class="weekly-discount">${result.price.priceItems[i].title}</div>
                        <div class="weekly-discount-price">₹${result.price.priceItems[i].amount}</div>`;
        total += result.price.priceItems[i].amount;
        price_cont.appendChild(div);
    }

    const div = document.createElement('div');
    div.className = 'row2';
    div.innerHTML = `<div class="total">Total</div>
    <div id="tot">₹${total}</div>`
    price_cont.appendChild(div);
    
}
handlePrice();


function addColor(event) {
    if(event.target.style.color === 'red'){
        event.target.style.color = 'black';
    }else{
        event.target.style.color = 'red';
    }
}

async function getRoomDetails() {
    const url = `https://airbnb19.p.rapidapi.com/api/v1/getPropertyDetails?propertyId=${roomData.id}&currency=INR`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f883b90791msha59eee7d63130abp1b6ef4jsn68f1a6a10240',
            'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    
}
// getRoomDetails();


// Creating a map object
 var map = L.map('map').setView([result.lat, result.lng], 13);
mapLink =
  '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
  }).addTo(map);

 
 // Creating a Layer object
 var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
 map.addLayer(layer);         // Adding layer to the map
 var marker = L.marker([result.lat, result.lng]);    // Creating a Marker
 
 // Adding popup to the marker
 marker.bindPopup('You will be exactly here').openPopup().addTo(map);
 marker.addTo(map); // Adding marker to the map

  

function showBookingCostBreakdown(listing) {
    // Calculate additional fees and total cost
    const additionalFees = listing.price * 0.10; // Assuming additional fees are 10% of base price
    const totalCost = listing.price + additionalFees;

    // Create a modal dialog box
    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.width = "300px";
    modal.style.height = "200px";
    modal.style.backgroundColor = "#fff";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.padding = "20px";
    modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

    // Add booking cost breakdown to the modal
    modal.innerHTML = `
        <h2>Booking Cost Breakdown</h2>
        <p>Base Rate: $${listing.price.toFixed(2)}</p>
        <p>Additional Fees: $${additionalFees.toFixed(2)}</p>
        <p>Total Cost: $${totalCost.toFixed(2)}</p>
    `;

    // Add a close button to the modal
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", () => modal.style.display = "none");
    modal.appendChild(closeButton);

    // Add the modal to the body
    document.body.appendChild(modal);
}


let obj = {
    "status": true,
    "message": "Success",
    "timestamp": 1693907325149,
    "data": {
      "title": "Rental unit in Paris · ★4.72 · 1 bedroom · 2 beds · 1 shared bath",
      "propertyType": "Private room in rental unit",
      "location": "Paris",
      "personCapacity": 4,
      "imageUrl": "https://a0.muscache.com/pictures/miso/Hosting-674435638582589710/original/29365047-bd64-4f3d-b195-90cf670c86fc.jpeg",
      "descriptionLanguage": "fr",
      "listingLat": 48.84266,
      "listingLng": 2.39273,
      "homeTier": 1,
      "roomType": "Private room",
      "visibleReviewCount": "18",
      "valueRating": 4.56,
      "locationRating": 4.78,
      "pictureCount": 5,
      "communicationRating": 4.72,
      "checkinRating": 4.89,
      "accuracyRating": 4.67,
      "cleanlinessRating": 4.5,
      "guestSatisfactionOverall": 4.72,
      "allowsChildren": true,
      "allowsInfants": true,
      "allowsPets": false,
      "hostId": "307001449",
      "hostName": "Charlotte",
      "hostProfilePhotoUrl": "https://a0.muscache.com/im/pictures/user/79cccbaa-3258-4379-b98d-a642587d63e7.jpg?aki_policy=profile_x_medium",
      "isHotelRatePlanEnabled": false,
      "isSuperhost": true,
      "maxNights": 365,
      "minNights": 3,
      "reviewsCount": "18",
      "reviewsRating": "4.72",
      "roomAndPropertyType": "Private room in rental unit",
      "barPrice": null,
      "canInstantBook": false,
      "price": {
        "barPrice": {},
        "price": {},
        "structuredDisplayPrice": {
          "accessibilityLabel": "$52 per night",
          "price": "$52",
          "qualifier": "night"
        }
      },
      "cancellationPolicies": [
        {
          "__typename": "LegacyPdpCancellationSection",
          "cancellationPolicyId": 4,
          "linkText": "Learn more",
          "milestones": [],
          "cancellationOverrideRules": null,
          "subtitle": "Add your trip dates to get the cancellation details for this stay.",
          "subtitles": [
            "For a full refund, the guest must cancel at least 5 full days before the listing’s local check-in time (shown in the confirmation email).",
            "If the guest cancels less than 5 days before check-in, the first night plus 50% of all nights after that, and the Airbnb service fee, are non-refundable.",
            "If the guest arrives and decides to leave early, 50% of the nightly rate for the nights not spent 24 hours after the cancellation occurs are refunded.",
            "Cleaning fees are always refunded if the reservation is canceled before check-in.",
            "The Airbnb service fee is refundable up to 3 times per year if the guest cancels at least 5 days before check-in. It isn't refundable if the guest cancels a reservation that overlaps with any part of an existing reservation.",
            "Accommodation fees (the total nightly rate you’re charged) are refundable in certain circumstances as outlined below.",
            "If there is a complaint from either party, notice must be given to Airbnb within 24 hours of check-in.",
            "Airbnb will mediate when necessary, and has the final say in all disputes.",
            "A reservation is officially canceled when the guest clicks the cancellation button on the cancellation confirmation page, which they can find in Dashboard > Your Trips > Change or Cancel.",
            "Cancellation policies may be superseded by the Guest Refund Policy, extenuating circumstances, or cancellations by Airbnb for any other reason permitted under the Terms of Service. Please review these exceptions."
          ],
          "title": "Add your trip dates to get the cancellation details for this stay.",
          "localizedCancellationPolicyName": "Moderate",
          "cancellationPolicyPriceType": null,
          "cancellationPolicyPriceFactor": 0,
          "highlightedCancellationTip": null
        }
      ],
      "defaultDescription": {},
      "overview": [
        "4 guests",
        "1 bedroom",
        "2 beds",
        "1 shared bath"
      ],
      "images": [
        "https://a0.muscache.com/pictures/miso/Hosting-674435638582589710/original/29365047-bd64-4f3d-b195-90cf670c86fc.jpeg",
        "https://a0.muscache.com/pictures/miso/Hosting-674435638582589710/original/a88fbf84-9873-446f-bbc4-a8043b9c97c2.jpeg",
        "https://a0.muscache.com/pictures/miso/Hosting-674435638582589710/original/14a08868-dd45-4c9d-afb1-32b716598ea7.jpeg",
        "https://a0.muscache.com/pictures/miso/Hosting-674435638582589710/original/a89f1c7a-a1e9-4396-8539-4e4ad9ecec1e.jpeg"
      ],
      "details": [
        {
          "title": "What this place offers",
          "amenities": [
            {
              "title": "Bathroom",
              "amenities": [
                {
                  "title": "Cleaning products",
                  "subtitle": "",
                  "available": true,
                  "image": null,
                  "images": []
                },
                {
                  "title": "Timotei shampoo",
                  "subtitle": "",
                  "available": true,
                  "image": null,
                  "images": []
                },
                {
                  "title": "Hot water",
                  "subtitle": "",
                  "available": true,
                  "image": null,
                  "images": []
                },
                {
                  "title": "Shower gel",
                  "subtitle": "",
                  "available": true,
                  "image": null,
                  "images": []
                }
              ]
            },
            {
              "title": "Bedroom and laundry",
              "amenities": [
                {
                  "title": "Washer",
                  "subtitle": "",
                  "available": true,
                  "image": null,
                  "images": []
                },
                {
                  "title": "Essentials",
                  "subtitle": "Towels, bed sheets, soap, and toilet paper",
                  "available": true,
                  "image": null,
                  "images": []
                },
                {
                  "title": "Bed linens",
                  "subtitle": "Cotton linens",
                  "available": true,
                  "image": null,
                  "images": []
                },
                {
                  "title": "Drying rack for clothing",
                  "subtitle": "",
                  "available": true,
                  "image": null,
                  "images": []
                },
                {
                  "title": "Clothing storage: closet",
                  "subtitle": "",
                  "available": true,
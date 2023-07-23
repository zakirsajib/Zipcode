# Dynamic Location Popup for Service Areas

## Description

The "Dynamic Location Popup for Service Areas" is a JavaScript-based solution that displays a popup to users based on their location data. The popup is triggered when the user clicks on a designated button, and it provides relevant information based on the user's city and region. This implementation is ideal for businesses or organizations that want to offer specific information to users from certain service areas.

## Requirements

To use this solution, you'll need the following:

- WordPress (with admin access to add custom JavaScript code).
- jQuery library (usually included in WordPress).
- Access to IP geolocation APIs (for fetching location data based on the user's IP address). ipinfo and zippopotam

## Installation

1. Ensure that you have WordPress installed and have access to the theme files.
2. Create a new JavaScript file (e.g., `zipcode.js`) and place it in your theme's `/js/` directory.
3. Add the provided JavaScript code to `zipcode.js` or the custom JavaScript file you created.

## Usage

1. In your WordPress theme, locate the header menu where you want to add the "My Home Location" button.
2. Add the following HTML code for the button:

``
<a href="javascript.void(0)" id="home-location-btn"> My Home Location</a>
``


## AJAX Endpoint

The AJAX endpoint, `get_location_info`, is responsible for fetching the user's location data and nearest postal code using the provided APIs. It returns the data as a JSON response, which is then used to display the popup.


## Customization
You can customize the specific service areas by modifying the specificRegions array in the JavaScript code. Add or remove city/region names as needed to match your desired service areas.

Additionally, you can change the URLs for each service area by updating the specificURL variable inside the showLocationPopup function.

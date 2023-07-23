# Dynamic Location Popup for Service Areas

## Description

The "Dynamic Location Popup for Service Areas" is a JavaScript-based solution that displays a popup to users based on their location data. The popup is triggered when the user clicks on a designated button, and it provides relevant information based on the user's city and region. This implementation is ideal for businesses or organizations that want to offer specific information to users from certain service areas.

## Requirements

To use this solution, you'll need the following:

- WordPress (with admin access to add custom JavaScript code).
- jQuery library (usually included in WordPress).
- Access to IP geolocation APIs (for fetching location data based on the user's IP address: ipinfo and zippopotam. Please note: ipinfo offer 50k api requests per month on free account. zippopotam does not require any api.

## Installation

1. Ensure that you have WordPress installed and have access to the theme files.
2. Create a new JavaScript file (e.g., `zipcode.js`) and place it in your theme's `/js/` directory.
3. Add the provided JavaScript code to `zipcode.js` or the custom JavaScript file you created.
4. Add the provided php code to `functions.php` file.

## Usage

1. In your WordPress theme, locate the header menu where you want to add the "My Home Location" button.
2. Add the following HTML code for the button:

``
<a href="javascript.void(0)" id="home-location-btn"> My Home Location</a>
``


## AJAX Endpoint

The AJAX endpoint, `get_location_info`, is responsible for fetching the user's location data and nearest postal code using the provided APIs. It returns the data as a JSON response, which is then used to display the popup.

## functions.php Code

The `functions.php` file in your WordPress theme plays a crucial role in handling the backend functionalities of the "Dynamic Location Popup for Service Areas." Below is an overview of the code added to the `functions.php` file to facilitate the popup functionality.

1. `get_location_info_ajax_handler()`: This function serves as the AJAX handler for fetching location information based on the user's IP address. It calls the `get_location_info()`, `get_client_ip()`, and `get_nearest_postal_code()` functions to gather the necessary data. The function returns the location data in JSON format using the `wp_send_json()` function.

2. `get_client_ip()`: This function is responsible for determining the user's IP address. It checks various server variables to identify the IP address and returns it as a string.

3. `get_location_info()`: This function uses an external API (ipinfo.io) to fetch location information based on the user's IP address. The function sends a request to the API and receives the response in JSON format. It then decodes the JSON response and returns the location data as an associative array.

4. `get_nearest_postal_code()`: This function uses the "Zippopotam" API to fetch the nearest postal code information based on the user's country and postal code. The function sends a request to the API and receives the response in JSON format. It checks if the "places" key exists in the response and extracts the "place name" data. The function returns the nearest postal code data as an associative array.

These functions work together to provide the necessary location data required for displaying the popup on the frontend. The JavaScript code utilizes the `ajaxurl` variable to communicate with the `get_location_info_ajax_handler()` function and fetch the relevant location data dynamically.

Feel free to modify these functions as needed to suit your specific requirements or integrate other location-based APIs for gathering location information.


## Customization
You can customize the specific service areas by modifying the `specificRegions` array in the JavaScript code. Add or remove city/region names as needed to match your desired service areas.

Additionally, you can change the URLs for each service area by updating the `specificURL` variable inside the `showLocationPopup` function.

## Demo
https://legacyplumbdev.wpengine.com/

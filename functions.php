<?php

function hello_elementor_child_enqueue_scripts() {

  wp_enqueue_script('location-popup', get_stylesheet_directory_uri() . '/js/zipcode1.js', array('jquery'), '1.0', true);

  // Pass AJAX URL to the script
  wp_localize_script('location-popup', 'ajaxurl', admin_url('admin-ajax.php'));
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts', 20 );

// AJAX handler to get location information
add_action('wp_ajax_get_location_info', 'get_location_info_ajax_handler');
add_action('wp_ajax_nopriv_get_location_info', 'get_location_info_ajax_handler');

function get_location_info_ajax_handler() {

  error_log('get_location_info_ajax_handler called.');

	// Include the necessary functions to fetch location and nearest postal code
  $ip_address = get_client_ip();
  $ipinfo_api_key = 'aPI_KEY'; // Replace with your actual API key for ipinfo.io

  // Get location information
  $location_info = get_location_info($ip_address, $ipinfo_api_key);

  // Assuming 'country_code' is the 2-letter ISO country code (e.g., 'US' for United States)
  $country = $location_info['country'];
  $postal_code = $location_info['postal'];

  // Get nearest postal code
  $nearest_postal_code_info = get_nearest_postal_code($country, $postal_code);

  // Combine location and nearest postal code data
  $location_data = array(
    'ip_address' => $ip_address,
    'country' => $location_info['country'],
    'city' => $location_info['city'],
    'region' => $location_info['region'],
    'postal_code' => $location_info['postal'],
    'nearest_postal_code' => isset($nearest_postal_code_info['post code']) ? $nearest_postal_code_info['post code'] : '',
    'place_name' => isset($nearest_postal_code_info['place_name']) ? $nearest_postal_code_info['place_name'] : '',
  );

  // Send the location data as a JSON response
  wp_send_json($location_data);
}


function get_client_ip() {
	$ipaddress = '';
	if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
	else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
	else if(isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
	else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
	else if(isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
	else if(isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
	else
			$ipaddress = 'UNKNOWN';

	return $ipaddress;
}

function get_location_info($ip, $api_key) {
	$url = "https://ipinfo.io/{$ip}?token={$api_key}";
	$response = file_get_contents($url);
	return json_decode($response, true);
}

function get_nearest_postal_code($country, $postal_code) {
	$url = "http://api.zippopotam.us/{$country}/{$postal_code}";
  $response = file_get_contents($url);
	$decoded_response = json_decode($response, true);

	// Check if the 'places' key exists in the response and if it has data
    if (isset($decoded_response['places']) && !empty($decoded_response['places'])) {
        // Get the first element from 'places' array
        $place_data = $decoded_response['places'][0];
        // Add the 'place name' to the response data
        $decoded_response['place_name'] = isset($place_data['place name']) ? $place_data['place name'] : '';
    } else {
        // If 'places' key is not present or is empty, set place_name as empty string
        $decoded_response['place_name'] = '';
    }

    return $decoded_response;
}

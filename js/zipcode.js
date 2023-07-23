jQuery(document).ready(function($) {
  // Function to display the location popup
  function showLocationPopup(locationData) {

  // Check if the region or city is in the specified regions
  var specificRegions = ['Dhaka', 'Addison', 'Allen', 'Aubrey', 'Carrollton', 'Celina', 'Corinth', 'Coppell', 'Cross Roads', 'Denton', 'Fairview', 'Farmers Branch', 'Flower Mound', 'Frisco', 'Highland Village', 'Lake Dallas', 'Lakewood Village', 'Las Colinas', 'Lewisville', 'Little Elm', 'Lucas', 'Mckinney', 'Melissa', 'Murphy', 'Melissa', 'North Dallas', 'North Garland', 'North Irving' ,'Oak Point', 'Parker', 'Plano', 'Prosper', 'Providence Village', 'Richardson', 'Rowlet', 'Shady Shores', 'Sachse', 'South Aubrey', 'The Colony', 'Wylie'];

    var specificURL = '';

    if (locationData.region === 'Dhaka' && locationData.place_name === 'Shantinagr TSO') {
        specificURL = window.location.origin + '/service-area' + '/dhaka/';
    } else if (locationData.region === 'Texas' || locationData.place_name === 'Addison') {
        specificURL = window.location.origin + '/service-area' + '/addison/';
    } else if (locationData.region === 'Texas' || locationData.place_name === 'Allen') {
      specificURL = window.location.origin + '/service-area' + '/allen/';
    } else {
      specificURL = window.location.origin + '/service-area';
    }

    var popupContent = `
      <div id="location-popup">
        <span class="close-icon">&times;</span>
        <p>My Home Location</p>
        <h4><a href="${specificURL}" class="location-link">${locationData.place_name}, ${locationData.region}, ${locationData.country} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true" class="icon text-size-30 css-1ukaq79 etig9ot0" focusable="false" height="1em" width="1em" style="margin-inline-start: 0.375rem; transform: translateY(0.125em);"><path d="M0 256a256 256 0 1 0 512 0 256 256 0 1 0-512 0zm241 121c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"></path></svg></a></h4>
      </div>
    `;

    // Add the class to the body to apply the black background
    $('body').addClass('popup-open').append(popupContent);

    // Close the popup when the user clicks on the close icon
    $(document).on('click', '.close-icon', function() {
      $('#location-popup').remove();
      // Remove the class from the body to remove the black background
      $('body').removeClass('popup-open');
    });

      // Close the popup when the user clicks outside the popup
      $(document).on('click', function(event) {
        if (!$(event.target).closest('#location-popup').length) {
          $('#location-popup').remove();
          // Remove the class from the body to remove the black background
          $('body').removeClass('popup-open');
        }
      });

} // end showLocationPopup

function handlePopupButtonClick() {
  console.log('Button clicked.');

  var $button = $('#home-location-btn'); // Get the button element
  var originalButtonText = $button.find('.elementor-button-text').text(); // Store the original button text

  // Show the "Please wait" message when the AJAX request starts
  $button.find('.elementor-button-text').text('Please wait...');

  $.ajax({
    url: ajaxurl, // WordPress AJAX URL
    type: 'post',
    data: {
      action: 'get_location_info', // AJAX action name for backend processing
    },
    dataType: 'json',
    success: function(response) {
      console.log('AJAX request successful:', response);
      showLocationPopup(response); // Corrected function call
      // Restore the original button text
      $button.find('.elementor-button-text').text(originalButtonText);
    },
    error: function(xhr, status, error) {
      console.error('Error fetching location data:', error);
      // Restore the original button text
      $button.find('.elementor-button-text').text(originalButtonText);
    }
  });
}

// Add click event handler to the button in the header menu
  $('#home-location-btn').on('click', function(e) {
    e.preventDefault();
    handlePopupButtonClick();
  });

});

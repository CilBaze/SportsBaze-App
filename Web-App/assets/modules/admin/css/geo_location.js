var placeSearch, autocomplete;

var componentForm = {
  premise: 'short_name',
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'long_name',
  country: 'long_name',
  postal_code: 'long_name'
};
function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  //autocomplete = new google.maps.places.Autocomplete(document.getElementsByClassName('autocomplete'), {types: ['geocode']});
  var autoCompleteAddress = document.getElementsByClassName('autocomplete');
 
  for (i = 0; i < autoCompleteAddress.length; i++) {
     var autocomplete = new google.maps.places.Autocomplete(autoCompleteAddress[i], {types: ['geocode', 'establishment']});
  	 autocomplete.closesDiv = autoCompleteAddress[i].closest('.address-row');
  	 autocomplete.setComponentRestrictions({'country': ['in', 'aus', 'us', 'uk' ]});
  	 autocomplete.addListener('place_changed', fillInAddress);
  }
  
  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
 // autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  
}
function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = this.getPlace();  
  var lat = place.geometry.location.lat();
  var lng = place.geometry.location.lng();
  $(this.closesDiv).find('.lat').val(lat);
  $(this.closesDiv).find('.lng').val(lng);
  //var 
  var city = "                  ";
 
  

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  /*for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      if(addressType == 'locality'){
      	$(this.closesDiv).find('.city').val(place.address_components[i][componentForm[addressType]]);
      	city = place.address_components[i][componentForm[addressType]];
      }
      else if(addressType == 'country')
      	$(this.closesDiv).find('.country').val(place.address_components[i][componentForm[addressType]]);
      else if(addressType == 'administrative_area_level_1')
      	$(this.closesDiv).find('.state').val(place.address_components[i][componentForm[addressType]]);
      else if(addressType == 'postal_code')
      	$(this.closesDiv).find('.postal_code').val(place.address_components[i][componentForm[addressType]]);
      
    }
  }
 
  if(place.formatted_address.indexOf(city) > 3)
  	$(this.closesDiv).find('.address').val(place.formatted_address.substr(0, place.formatted_address.indexOf(city)-2));*/
}

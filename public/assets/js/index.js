$(document).ready(function() {
	
	$(".navbar-burger").on("click", function() {
		$(".navbar-burger").toggleClass("is-active");
		$(".dropdown").toggle();
		$(".dropdown").toggleClass("is-open");
	});

	// Grab the articles as a json
	$.getJSON("/articles", function(data) {
	  // For each one
	  for (var i = 0; i < data.length; i++) {
	    // Display the apropos information on the page
	    $("#scrape-results").prepend("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br>" + data[i].description + "</p>");
	  }
	});







});



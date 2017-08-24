$(document).ready(function() {
	// Display saved articles on page load
	$.getJSON("/articles", function(data) {
	  // For each one
	  for (var i = 0; i < data.length; i++) {
	  	// if article has been marked as saved
	  	if (data[i].saved === true) {
	  		console.log(data[i].saved);
	  		console.log("true");
				// Display the information on the page
	   		$("#saved-results").append("<div class='saved-div'><p class='saved-text'>" + data[i].title + "<br>" + data[i].description +
  																	"</p><a class='unsave-button button is-danger is-medium' data-id='" +
																		data[i]._id + "'>Remove</a><a class='comments-button button is-info is-medium' data-id='" + data[i]._id +
																		"'><span class='icon'><i class='fa fa-comments'></i></span>Comments</a></div>");
	  	}
	  }
	});

	// Comment button opens the comments modal
	$(document).on("click", ".comments-button", function() {
		// Open the comments modal
		$(".modal").toggleClass("is-active");
		// Get article by article ID
		var articleID = $(this).attr("data-id");
		// Now make an ajax call for the Article
	  $.ajax({
	    method: "GET",
	    url: "/articles/" + articleID
	  }).done(function(data) {
	  	// Display all comments
	  	console.log("data: ", data);
	  	// Update modal header
	  	$("#comments-header").html("Article Comments (ID: " + data._id + ")");
	  	// If the article has comments
	  	if (data.comments.length !== 0) {
	  		// Clear out the comment div
	  		$("#comments-list").empty();
	  		for (i = 0; i < data.comments.length; i++) {
	  			// Append all article comments
					$("#comments-list").append("<div class='comment-div'><p class='comment'>" + data.comments[i] + "</p></div>");
	  		}
	  	}
	  });
	});

	// Modal X button closes modal
	$(document).on("click", ".delete", function() {
		$(".modal").toggleClass("is-active");
	});

	// // Saving Comments
	// $(document).on("click", "#save-comment", function() {
	//   // Grab the id associated with the article from the submit button
	//   var articleID = $(this).attr("data-id");
	//   // Run a POST request to add a comment, using what's entered in the inputs
	//   $.ajax({
	//     method: "POST",
	//     url: "/articles/" + articleID,
	//     data: {
	//       // Value taken from body input
	//       body: $("#body-input").val()
	//     }
	//   });

	//   // Also, remove the values entered in the inputs for comment entry
	//   $("#username-input").val("");
	//   $("#body-input").val("");
	//   // Close comment modal
	//   $(".modal").toggleClass("is-active");
	// });

	// Removing Saved Articles
	$(document).on("click", ".unsave-button", function() {
	
	});

});

var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");
var router = express.Router();

// A GET request to scrape the NPR website
router.get("/scrape", function(req, res) {
  // First, grab the body of the html with request
  request("http://www.npr.org/sections/news/archive", function(error, response, html) {
    // Then, load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Finally, grab every article tag within a div with class archivelist, and do the following:
    $("div.archivelist > article").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(element).children("div.item-info").children("h2.title").html();
      // above saves entire a tag as it appears on NPR website
      console.log(result.title);
			result.description = $(element).children("div.item-info").children("p.teaser").children("a").text();
      console.log(result.description);
      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

    });
  });
  // Reload the page so that newly scraped articles will be shown on the page
  res.redirect("/");
});


// This will get the articles we scraped from the mongoDB
router.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


module.exports = router;

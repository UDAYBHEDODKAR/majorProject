const express = require("express");
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const { isloggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listings.js');



//index Route
//Create New Listing
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isloggedIn, validateListing, wrapAsync(listingController.createListing));


//New Listing route
router.get("/new", isloggedIn, listingController.renderNewForm);


//Show Route
//Update Route
//Delete Route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isloggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    .delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing));



//Edit Route
router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;
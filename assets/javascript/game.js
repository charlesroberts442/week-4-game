/***********************************************************************
 * Copyright (c) 2017 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains the global variables and methods for the "Crystals
 * Collector homework assignment."
 * @author Charles Roberts
 * @copyright Charles Roberts 2017
 */

/**
 * targetNumberGenerator is the random number generator that is
 * used to generate the target numbers for the CrystalsCollector
 * game.
 * @type {Object}
 */
targetNumberGenerator = new RandomNumberGenerator(19,120);

/**
 * crystalNumberGenerator is the random number generator that is
 * used to generate the crystals' numbers for the CrystalsCollector
 * game.
 * @type {Object}
 */
crystalNumberGenerator = new RandomNumberGenerator(1,12);
/**
 * targetNumber is the random number that the player is trying to match.
 * @type {Number}
 */
targetNumber = 0;

/**
 * rubyNumber is the random number that is assigned to the ruby
 * crystal.
 * @type {Number}
 */
rubyNumber = 0;

/**
 * diamondNumber is the random number that is assigned to the
 * diamond crystal.
 * @type {Number}
 */
diamondNumber = 0;

/**
 * topazNumber is the random number that is assigned to the
 * topaz crystal.
 * @type {Number}
 */
topazNumber = 0;

/**
 * emeraldNumber is the random number that is assigned to the
 * emerald crystal.
 * @type {Number}
 */
emeraldNumber = 0;

/**
 * winCount is the number of times the player has won since
 * the webpage loaded
 * @type {Number}
 */
winCount = 0;

/**
 * lossCount is the number of times the player has lost since
 * the webpage loaded
 * @type {Number}
 */
lossCount = 0;

/**
 * currentCount is the current sum that has resulted from the
 * player clicking on the crystals.
 * @type {Number}
 */
currentCount = 0;

/**
 * htmlForTextWithEmbeddedNewlines is a function I found through
 * "google-fu" for displaying multiple lines of text in a div.
 * @param  {String} text the string (including "\n") to be displayed.
 */
function htmlForTextWithEmbeddedNewlines(text) {
    var htmls = [];
    var lines = text.split(/\n/);
    // The temporary <div/> is to perform HTML entity encoding reliably.
    //
    // document.createElement() is *much* faster than jQuery('<div></div>')
    // http://stackoverflow.com/questions/268490/
    //
    // You don't need jQuery but then you need to struggle with browser
    // differences in innerText/textContent yourself
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}

/**
 * clickHandler is the event handler for all the crystal button clicks.
 * @param  {Object} event the click event
 */
function clickHandler(event)
{	
	// Add the crystal's value to the current count
	switch(event.target.name)
	{
		case "ruby":
		currentCount += rubyNumber;
		break;

		case "diamond":
		currentCount += diamondNumber;
		break;

		case "topaz":
		currentCount += topazNumber;
		break;

		case "emerald":
		currentCount += emeraldNumber;

	} // End of switch(event.target.name)

	// Check for a win
	if(currentCount === targetNumber) // A win!! ;)
	{
		++winCount;
		jQuery('.win_lose_field').html(htmlForTextWithEmbeddedNewlines("\nYou won!!\n\nWins: " +
		 winCount.toString() +"\n\nLosses: " + lossCount.toString()));
		newGame();
	}

	// Check for a loss
	else if(currentCount >= targetNumber) // A loss :(
	{
		++lossCount;
		jQuery('.win_lose_field').html(htmlForTextWithEmbeddedNewlines("\nYou lose\n\nWins: " +
		 winCount.toString() +"\n\nLosses: " + lossCount.toString()));
		newGame();
	}

	else // The game continues
	{
		jQuery('.win_lose_field').html(htmlForTextWithEmbeddedNewlines("\nWins: " +
		 winCount.toString() +"\n\nLosses: " + lossCount.toString()));
	}

	// Update the current count that has resulted from crystal clicks
	jQuery('.current_total_field').html(currentCount).toString();

} // End of function clickHandler(event)

/**
 * Initialize initializes the web page (Duh!)
 */
function Initialize()
{
	// Set the event listener for the gem buttons
	let ruby_btn = document.getElementById("ruby_button");
	ruby_btn.addEventListener("click", clickHandler);

	let diamond_btn = document.getElementById("diamond_button");
	diamond_btn.addEventListener("click", clickHandler);

	let topaz_btn = document.getElementById("topaz_button");
	topaz_btn.addEventListener("click", clickHandler);

	let emerald_btn = document.getElementById("emerald_button");
	emerald_btn.addEventListener("click", clickHandler);

	// Update the win/lost div text
	jQuery('.win_lose_field').html(htmlForTextWithEmbeddedNewlines("\nWins: " + 
		winCount.toString() +"\n\nLosses: " + lossCount.toString()));

} // End of function Initialize()

/**
 * newGame resets the global variables and the text displays for another game
 */
function newGame()
{
	// Reset some global variables
	rubyNumber    = crystalNumberGenerator.getRandomNumber();
	diamondNumber = crystalNumberGenerator.getRandomNumber();
	topazNumber   = crystalNumberGenerator.getRandomNumber();
	emeraldNumber = crystalNumberGenerator.getRandomNumber();
	targetNumber  = targetNumberGenerator.getRandomNumber();
	currentCount  = 0;

	// Reset some text displays
	$('.target_number_field').text(targetNumber); 
	jQuery('.total_score_field').html(htmlForTextWithEmbeddedNewlines("Your total score is:"));
	jQuery('.current_total_field').html(htmlForTextWithEmbeddedNewlines(currentCount.toString()));
	
} // End of function newGame()

// OK, initialize the page and start a new game!!
Initialize();
newGame();
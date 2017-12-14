/***********************************************************************
 * Copyright (c) 2017 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains the class definition of the RandomNumberGenerator
 * class.
 * @author Charles Roberts
 * @copyright Charles Roberts 2017
 */

/**
 * @classdesc RandomNumberGenerator objects generate random numbers
 * within a range defined in the constructor.
 */
class RandomNumberGenerator 
{
	constructor(lower_bound, upper_bound)
	{
		"use strict";
		const _lower_bound = lower_bound;
		const _upper_bound = upper_bound;

		/**
		 * Gets a random number in the range defined in the constructor
		 * @return {Number} A random number in the range defined in the constructor
		 */
		this.getRandomNumber = function()
		{

			return Math.floor((Math.random() * _upper_bound) + _lower_bound);

		}; // End of this.getRandomNumber = function()

	} // End of constructor(lower_bound, upper_bound)

} // End of class RandomNumberGenerator




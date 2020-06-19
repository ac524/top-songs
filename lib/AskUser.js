const inquirer = require("inquirer");

class AskUser {

    /**
     * Prompt the user for an action to perfom.
     * @returns {Promise}
     */
    forAction() {

        /**
         * Return a new inquirer prompt asking the user which action they would like to perform
         * 
         * They should be able to choose from the following list
         * - "Find songs by artist",
         * - "Find all artists who appear more than once",
         * - "Find data within a specific range",
         * - "Search for a specific song",
         * - "exit"
         */

    }

    /**
     * Prompt the user for an artist.
     * @returns {Promise}
     */
    forArtist() {
        /**
         * Return a new inquirer prompt asking the user for an artist.
         */
    }

    /**
     * Prompt the user for an artist.
     * @returns {Promise}
     */
    forSong() {
        /**
         * Return a new inquirer prompt asking the user for an artist.
         */
    }

    /**
     * Prompt the user for a range.
     * @returns {Promise}
     */
    forRange() {
        /**
         * Return a new inquirer prompt asking the user for an start and end position.
         */
    }

}

module.exports = AskUser;
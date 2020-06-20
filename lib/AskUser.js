const inquirer = require("inquirer");
const questions = require("./questions");

class AskUser {

    /**
     * Prompt the user for the given question set
     * @param {string} questionSet 
     */
    for( questionSet ) {
        return inquirer.prompt( questions[ questionSet ] );
    }

    /**
     * Prompt the user for an action to perfom.
     * @returns {Promise}
     */ 
    forAction() {
        return this.for( "action" );
    }

    /**
     * Prompt the user for an artist.
     * @returns {Promise}
     */
    forArtist() {
        return this.for( "artist" );
    }

    /**
     * Prompt the user for a song.
     * @returns {Promise}
     */
    forSong() {
        return this.for( "song" );
    }

    /**
     * Prompt the user for a range.
     * @returns {Promise}
     */
    forRange() {
        return this.for( "range" );
    }

}

module.exports = AskUser;
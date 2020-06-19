const inquirer = require("inquirer");

class AskUser {

    /**
     * Prompt the user for an action to perfom.
     * @returns {Promise}
     */ 
    forAction() {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'How would you like to search the database?',
                    choices: [
                        'Find songs by artist',
                        'Find all artists who appear more than once', 
                        'Find data within a specific range',
                        'Search for a specific song',
                        'Get songs with top hit albums in the same year',
                        'exit'
                    ]
                }
            ]);
    }

    /**
     * Prompt the user for an artist.
     * @returns {Promise}
     */
    forArtist() {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'artist',
                    message: 'Please enter an Artist name:  ',
                    
                }
            ]);
    }

    /**
     * Prompt the user for a song.
     * @returns {Promise}
     */
    forSong() {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'song',
                    message: 'Please enter an Song name:  ',
                    
                }
            ]);
    }

    /**
     * Prompt the user for a range.
     * @returns {Promise}
     */
    forRange() {
        return inquirer
            .prompt([
                {
                    type: 'number',
                    name: 'startPosition',
                    message: 'Please choose a starting position number:  ',
                    
                },
                {
                    type: 'number',
                    name: 'endPosition',
                    message: 'Please choose an ending position number:  '
                }
            ]);
    }

}

module.exports = AskUser;
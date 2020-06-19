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
                name: 'findByArtist',
                message: 'How would you like to search the database?',
                choices: ['Find songs by artist', 'Find all artists who appear more than once', 
                        'Find data within a specific range', 'Search for a specific song', 'exit']
            }


        ])
        
    }

    /**
     * Prompt the user for an artist.
     * @returns {Promise}
     */
    forArtist() {
        /**
         * Return a new inquirer prompt asking the user for an artist.
         */
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
     * Prompt the user for an artist.
     * @returns {Promise}
     */
    forSong() {
        /**
         * Return a new inquirer prompt asking the user for an artist.
         */
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
        //Return a new inquirer prompt asking the user for an start and end position.
         
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
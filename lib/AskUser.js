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
                        { name: "Find songs by artist", value: "findSongsByArtist" },
                        { name: "Find all artists who appear more than once", value: "findDuplicateArtists" },
                        { name: "Find data within a specific range", value: "getSongRange" },
                        { name: "Search for a specific song", value: "getSong" },
                        { name: "Get songs with top hit albums in the same year", value: "getSongsWithTopHitAlbums" },
                        { name: "Exit search utility", value: false }
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
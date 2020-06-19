const store = require("./store");
const AskUser = require("./AskUser");

class SearchUtility {

    constructor() {

        // Create and store a new instance of AskUser
        this.askUser = new AskUser()


    }

    run() {

        // Connect the store to the database
        store
            .connect()
            .then( () => {
        
                // Add test to store query method here.
                return this.doNextAction();

            } )
            .catch( err => console.log() )
            .finally( () => {

                console.log( "leave app" );
                store.close();

            } );

        // Then perform the next action

        // After user has finished performing actions, close the database

    }

    /**
     * Get an action from the user and do it, then ask for the next action unless they choose to exit
     * @returns {Promise}
     */
    doNextAction() {

        // Ask the user for an action
        return this.askUser.forAction().then( (response) => {

            if( response.action === 'Find songs by artist' ) {

                return this.findSongsByArtist();

            }

            // ,
            // 'Find all artists who appear more than once', 
            // 'Find data within a specific range',
            // 'Search for a specific song',
            // 'exit'

            // ;

            console.log( response );

        });

        // If the user selects 'exit', then exit the action loop

        // Else, do that action and ask the user for the next action they would like to perform

    }

    /**
     * @returns {Promise}
     */
    findSongsByArtist() {

        // Use the store to search for songs by the given artist

        // Then display them

    }

    /**
     * @returns {Promise}
     */
    findDuplicateArtists() {

        // Use the store to find artists with multiple songs

        // Then display them

    }

    /**
     * @param {*} artist
     * @returns {Promise}
     */
    getSongRange( start, end ) {

        // Use the store to get a range of songs by position

        // Then display them

    }

    /**
     * @param {*} artist
     * @returns {Promise}
     */
    getSong( start, end ) {

        // Use the store to get a specific song

        // Then display it

    }

}

module.exports = SearchUtility;
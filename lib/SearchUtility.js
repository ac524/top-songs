const store = require("./store");
const AskUser = require("./AskUser");

class SearchUtility {

    constructor() {

        // Create and store a new instance of AskUser.
        this.askUser = new AskUser()

    }

    run() {

        store
            // Connect the store to the database
            .connect()
            // Do the action loop.
            .then( () => this.doNextAction() )
            // Catch and display errors.
            .catch( err => console.log( err ) )
            // And finally, ensure the connection is closed out after all actions have been resolved.
            .finally( () => store.close() );

    }

    /**
     * Get an action from the user and do it, then ask for the next action unless they choose to exit
     * @returns {Promise}
     */
    doNextAction() {

        // Ask the user for an action
        return this.askUser.forAction().then( (response) => {

            let promise;

            // Make a request based on the selected action.

            if( response.action === 'Find songs by artist' ) {

                promise = this.findSongsByArtist();

            } else if( response.action === 'Find all artists who appear more than once' ) {

                promise = this.findDuplicateArtists();

            } else if( response.action === 'Find data within a specific range' ) {

                promise = this.getSongRange();

            } else if( response.action === 'Search for a specific song' ) {

                promise = this.getSong();

            } else if( response.action === 'Get songs with top hit albums in the same year' ) {

                promise = this.getSongsWithTopHitAlbums();

            }

            // If we got a promise to complete a request.
            if( promise )

                // Pass the promise up the chain so the code outside can also wait for it to complete.
                return promise
                    // After the promise has 'resolved', display the results.
                    .then( (result) => this.displayResults(result) )
                    // And the ask the user for another action
                    .then( () => this.doNextAction() );

            // Else do nothing and exit the promise loop.

        });

    }

    /**
     * @returns {Promise}
     */
    findSongsByArtist() {

        // Use the store to search for songs by the given artist
        return this
            .askUser
            .forArtist()
            .then( ({ artist }) => {

                return store.getSongsByArtist( artist );

            });

    }

    /**
     * @returns {Promise}
     */
    findDuplicateArtists() {

        return store
            .getArtistsWithMultipleTopSongs();

    }

    /**
     * @returns {Promise}
     */
    getSongRange() {

        return this
            .askUser
            .forRange()
            .then( ({ startPosition, endPosition }) => {

                return store.getTopSongsRange( startPosition, endPosition );

            });

    }

    /**
     * @returns {Promise}
     */
    getSong() {

        return this
            .askUser
            .forSong()
            .then( ({ song }) => {

                return store.getSong( song );

            });

    }

    /**
     * @returns {Promise}
     */
    getSongsWithTopHitAlbums() {

        return this
            .askUser
            .forArtist()
            .then( ({ artist }) => {
                return store.getSongsWithTopHitAlbums( artist );
            });

    }

    displayResults( results ) {
        
        // Add a space to the output
        console.log(" ");

        results.forEach( (result) => {
            const displayParts = [];
            for( let prop in result ) displayParts.push( `${prop} - ${result[prop]}` );
            console.log( displayParts.join(" || ") );
        });

    }

}

module.exports = SearchUtility;
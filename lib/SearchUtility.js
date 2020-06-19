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
        return this.askUser.forAction().then( ({ action }) => {

            // If the user chose to exit, return false to break the Promise chain and exit the application.
            if( !action ) return false;

            /**
             * Execute the selected action and pass the returned Promise up the
             * chain so the code outside can also wait for it to complete.
             */ 
            return this[ action ]()
                // After the Promise has 'resolved', display the results.
                .then( (result) => this.displayResults(result) )
                // And then ask the user for another action.
                .then( () => this.doNextAction() );

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
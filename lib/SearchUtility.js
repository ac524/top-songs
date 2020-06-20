const store = require("./store");
const AskUser = require("./AskUser");

class SearchUtility {

    constructor() {

        // Create and store a new instance of AskUser.
        this.askUser = new AskUser()

    }

    async run() {

        try {
            
            // Connect the store to the database
            await store.connect();

            // Do the action loop.
            await this.doNextAction();

        } catch( err ) {

            // Catch and display errors.
            console.log( err );

        }

        // And finally, ensure the connection is closed out after all actions have been resolved.
        store.close();

    }

    /**
     * Get an action from the user and do it, then ask for the next action unless they choose to exit
     * @returns {Promise}
     */
    async doNextAction() {

        // Ask the user for an action
        const { action } = await this.askUser.forAction();
        
        // If the user chose to exit, return false to break the Promise chain and exit the application.
        if( !action ) return false;

        // Await the result of the action.
        const result = await this[ action ]();

        // Display the results.
        this.displayResults(result);

        // And then ask the user for another action to restart the chain.
        await this.doNextAction();

    }

    /**
     * @returns {Promise}
     */
    async findSongsByArtist() {

        const { artist } = await this.askUser.forArtist();

        return store.getSongsByArtist( artist );

    }

    /**
     * @returns {Promise}
     */
    findDuplicateArtists() {

        return store.getArtistsWithMultipleTopSongs();

    }

    /**
     * @returns {Promise}
     */
    async getSongRange() {

        const { startPosition, endPosition } = await this.askUser.forRange();

        return store.getTopSongsRange( startPosition, endPosition );

    }

    /**
     * @returns {Promise}
     */
    async getSong() {

        const { song } = await this.askUser.forSong();

        return store.getSong( song );

    }

    /**
     * @returns {Promise}
     */
    async getSongsWithTopHitAlbums() {

        const { artist } = await this.askUser.forArtist();

        return store.getSongsWithTopHitAlbums( artist );

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
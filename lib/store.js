const mysql = require("mysql");
const config = require("./config");

class Store {

    constructor() {

        if( ! config.DB_PASSWORD ) throw new Error(`Missing database password. Please run 'node init'`);

        // Create a new mysql connection object and store it as an object property
        this.connection = mysql.createConnection( {
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME
        } );

    }

    /**
     * Connect the the database server using a Promise
     * @returns {Promise}
     */
    connect() {
        return new Promise((resolve, reject) => {

            this.connection.connect((err) => {
                if(err) reject(err);
                else resolve();
            });

        });
    }

    close() {
        // Close the connection to the database
        this.connection.end();
    }

    /**
     * Return songs from the by an artist from the top5000 table
     * @param {string} artist
     * @returns {Promise}
     */
    getSongsByArtist( artist ) {
        return new Promise((resolve, reject) => {

            // Query the top5000 table and select all songs that match an artist
            // Pass the results to resolve() if it succeeds
            // If there is an err, call reject() and pass it the error

        });
    }

    getArtistsWithMultipleTopSongs() {
        return new Promise((resolve, reject) => {

            // Query the top5000 table for artists with multiple songs
            // Pass the results to resolve() if it succeeds
            // If there is an err, call reject() and pass it the error

        });
    }

    getTopSongsRange( start, end ) {
        return new Promise((resolve, reject) => {

            // Query the top5000 table for range of songs
            // Pass the results to resolve() if it succeeds
            // If there is an err, call reject() and pass it the error

        });
    }

    getSong( song ) {
        return new Promise((resolve, reject) => {

            // Query the top5000 table for specific song
            // Pass the results to resolve() if it succeeds
            // If there is an err, call reject() and pass it the error

        });
    }

}

module.exports = new Store;
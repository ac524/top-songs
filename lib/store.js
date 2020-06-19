const mysql = require("mysql");
const config = require("./config");

class Store {
  constructor() {
    if (!config.DB_PASSWORD)
      throw new Error(`Missing database password. Please run 'node init'`);

    // Create a new mysql connection object and store it as an object property
    this.connection = mysql.createConnection({
      host: config.DB_HOST,
      port: config.DB_PORT,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
    });
  }

  /**
   * Connect the the database server using a Promise
   * @returns {Promise}
   */
  connect() {
    // Return a promise to complete the request.
    return new Promise((resolve, reject) => {
        // Attempt to establish a connection to the database
        this.connection.connect( (err, results) => {
          // If there is an err, call reject() to execute the next chained .catch() and pass it the error.
          if (err) reject(err);
          // Else, call resolve() to execute the next chained .then().
          else resolve();
        } );
    });
  }

  close() {
    // Close the connection to the database
    this.connection.end();
  }

  /**
   * Query handler to simplify query execution as a Promise.
   * @param {string} query 
   * @param {*} data 
   */
  query( query, data ) {
    // Return a promise to complete the request.
    return new Promise((resolve, reject) => {

      // Build our list of arguments for the query method.
      const args = [query];
      // Add in data if provided.
      if( data ) args.push( data );
      // Add the query response handler
      args.push( (err, results) => {
        // If there is an err, call reject() to execute the next chained .catch() and pass it the error.
        if (err) reject(err);
        // Else, call resolve() to execute the next chained .then() and pass it successful results.
        else resolve(results);
      } );

      this.connection.query( ...args );

    });
  }

  /**
   * Return songs from the by an artist from the top5000 table.
   * @param {string} artist
   * @returns {Promise}
   */
  getSongsByArtist(artist) {
    // Query the top5000 table for songs that belong to an artist
    return this.query(
      "SELECT position, song, year FROM top5000 WHERE ?",
      { artist } // <-- Replaces the ? with artists="artistValue"
    );
  }

  /**
   * Request artists with multiple top songs.
   * @returns {Promise}
   */
  getArtistsWithMultipleTopSongs() {
    // Query the top5000 table for artists with multiple songs
    return this.query(
      "SELECT artist, COUNT(*) as count from top5000 GROUP BY artist HAVING count > 1",
    );
  }

  /**
   * Request a range of songs by position.
   * @param {number} start 
   * @param {number} end 
   * @returns {Promise}
   */
  getTopSongsRange(start, end) {
    // Query the top5000 table for range of songs.
    return this.query(
      "SELECT position, artist, song, year FROM top5000 WHERE position BETWEEN ? AND ? ORDER BY position",
      [
        start, // <-- Replaces the first ? in the query string
        end // <-- Replaces the second ? in the query string
      ]
    );
  }

  /**
   * Get a specific song.
   * @param {string} song 
   * @returns {Promise}
   */
  getSong(song) {
    // Query the top5000 table for range of a song by name.
    return this.query(
      "SELECT position, artist, song, year FROM top5000 WHERE ?",
      { song } // <-- Replaces the ? with song="songValue"
    );
  }

  getSongsWithTopHitAlbums(artist) {
    // Query the top5000 table JOINed with the top_albums table.
    return this.query(
      `SELECT top_albums.position as album_position, top_albums.artist, album, song, top_albums.year
      FROM top5000 JOIN top_albums
        ON top5000.artist = top_albums.artist AND top5000.year = top_albums.year
      WHERE ?`,
      { 'top5000.artist': artist } // <-- Replaces the ? with top5000.artist="artistValue"
    );
  }

}

module.exports = new Store();

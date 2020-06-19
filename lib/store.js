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
        this.connection.connect((err) => {
            // If there is an err, call reject() to execute the next chained .catch() and pass it the error.
            if (err) reject(err);
            // Else, call resolve() to execute the next chained .then().
            else resolve();
        });
    });
  }

  close() {
    // Close the connection to the database
    this.connection.end();
  }

  /**
   * Return songs from the by an artist from the top5000 table.
   * @param {string} artist
   * @returns {Promise}
   */
  getSongsByArtist(artist) {
    // Return a promise to complete the request.
    return new Promise((resolve, reject) => {
        // Query the top5000 table for songs that belong to an artist
        this.connection.query(
            "SELECT position, song, year FROM top5000 WHERE ?",
            { artist }, // <-- Replaces the ? with artists="artistValue"
            (err, results) => {
                // If there is an err, call reject() to execute the next chained .catch() and pass it the error.
                if (err) reject(err);
                // Else, call resolve() to execute the next chained .then() and pass it successful results.
                else resolve(results);
            }
        );
    });
  }

  /**
   * Request artists with multiple top songs.
   * @returns {Promise}
   */
  getArtistsWithMultipleTopSongs() {
    // Return a promise to complete the request.
    return new Promise((resolve, reject) => {
        // Query the top5000 table for artists with multiple songs
        this.connection.query(
            "SELECT artist from top5000 GROUP BY artist HAVING COUNT(*) > 1",
            (err, results) => {
                // If there is an err, call reject() to execute the next chained .catch() and pass it the error.
                if (err) reject(err);
                // Else, call resolve() to execute the next chained .then() and pass it successful results.
                else resolve(results);
            }
        );
    });
  }

  /**
   * Request a range of songs by position.
   * @param {number} start 
   * @param {number} end 
   * @returns {Promise}
   */
  getTopSongsRange(start, end) {
    // Return a promise to complete the request.
    return new Promise((resolve, reject) => {
        // Query the top5000 table for range of songs.
        this.connection.query(
            "SELECT position, artist, song, year FROM top5000 WHERE position BETWEEN ? AND ? ORDER BY position", 
            [
                start, // <-- Replaces the first ? in the query string
                end // <-- Replaces the second ? in the query string
            ],
            (err, res) => {
                // If there is an err, call reject() to execute the next chained .catch() and pass it the error.
                if(err) reject(err);
                // Else, call resolve() to execute the next chained .then() and pass it successful results.
                else resolve(res);
            }
        );
    });
  }

  /**
   * Get a specific song.
   * @param {string} song 
   * @returns {Promise}
   */
  getSong(song) {
    // Return a promise to complete the request.
    return new Promise((resolve, reject) => {
        // Query the top5000 table for range of a song by name.
        this.connection.query(
          "SELECT position, artist, song, year FROM top5000 WHERE ?",
          { song }, // <-- Replaces the ? with song="songValue"
          (err, results) => {
            // If there is an err, call reject() to execute the next chained .catch() and pass it the error.
            if (err) reject(err);
            // Else, call resolve() to execute the next chained .then() and pass it successful results.
            else resolve(results);
          }
        );
    });
  }

  getSongsWithTopHitAlbums(artist) {
    // Return a promise to complete the request.
    return new Promise((resolve, reject) => {
      // Query the top5000 table JOINed with the top_albums table.
      this.connection.query(
        `SELECT top_albums.position as album_position, top_albums.artist, album, song, top_albums.year
        FROM top5000 JOIN top_albums
          ON top5000.artist = top_albums.artist AND top5000.year = top_albums.year
        WHERE ?`,
        { 'top5000.artist': artist },
        (err, results) => {
          // If there is an err, call reject() to execute the next chained .catch() and pass it the error.
          if (err) reject(err);
          // Else, call resolve() to execute the next chained .then() and pass it successful results.
          else resolve(results);
        }
      );
  });
  }
}

module.exports = new Store();

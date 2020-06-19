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
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) reject(err);
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
  getSongsByArtist(artist) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM top5000 WHERE ?",
        {
          artist,
        },
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  }

  getArtistsWithMultipleTopSongs() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT artist from top5000 GROUP BY artist HAVING COUNT(*) > 1",
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
      // Query the top5000 table for artists with multiple songs
      // Pass the results to resolve() if it succeeds
      // If there is an err, call reject() and pass it the error
    });
  }

  getTopSongsRange(start, end) {
    return new Promise((resolve, reject) => {
      // Query the top5000 table for range of songs
      this.connection.query(
            "SELECT * FROM top5000 WHERE position BETWEEN ? AND ? ORDER BY position", 
            {
                start,
                end
            },
            (err, res) => {
                if(err) reject(err);
                else resolve(res);
            }
        );
      // Pass the results to resolve() if it succeeds
      // If there is an err, call reject() and pass it the error
    });
  }

  getSong(song) {
    return new Promise((resolve, reject) => {
        this.connection.query(
          "SELECT * FROM top5000 WHERE ?",
          {
            song,
          },
          (err, results) => {
            if (err) reject(err);
            else resolve(results);
          }
        );
    });
  }
}

module.exports = new Store();

module.exports = {
    action: {
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
    },
    artist: {
        type: 'input',
        name: 'artist',
        message: 'Please enter an Artist name:  '
    },
    song: {
        type: 'input',
        name: 'song',
        message: 'Please enter an Song name:  ',
        
    }
};
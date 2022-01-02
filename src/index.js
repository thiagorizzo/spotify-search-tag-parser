'use strict';

const spotifySearchTags = {
    ARTIST: 'artist',
    ALBUM: 'album',
    TRACK: 'track',
    LABEL: 'label',
    ISRC: 'isrc',
    UPC: 'upc',
    YEAR: 'year',
    TAG: 'tag'
}

function SpotifySearchTagParser() { }

SpotifySearchTagParser.prototype = {

    getSpotifySearchTagMatch: function(albumText, spotifySearchTag) {
        let tagsSpotifyRegex = new RegExp(`(?<tag>(${spotifySearchTag}:))(\s+?)?(?<tagValue>.*?)(?=artist:|album:|track:|label:|isrc:|upc:|year:|tag:|;|\n|$)`, "g");

        let matchesFound = [];

        let match = tagsSpotifyRegex.exec(albumText);
        while (match != null) {
            matchesFound.push({
                text: match[0],
                tagValue: match.groups.tagValue.trim(),
                tag: spotifySearchTag  
            });

            match = tagsSpotifyRegex.exec(albumText);
        }    

        return matchesFound;
    },

    getSpotifySearchTagMatches: function(albumText) {
        const spotifySearchTagMatches = [];

        for (const [_, tagValue] of Object.entries(spotifySearchTags)) {
            let matchesFound = this.getSpotifySearchTagMatch(albumText, tagValue);
            if (matchesFound.length > 0) {
                spotifySearchTagMatches.push(...matchesFound);
            }
        }

        console.log(spotifySearchTagMatches);
        return spotifySearchTagMatches;
    },

    removeSpotifySearchTag: function(albumText, spotifySearchTag) {
        let matchesFound = this.getSpotifySearchTagMatch(albumText, spotifySearchTag);

        matchesFound.forEach(m => {
            albumText = albumText.replace(m.text, m.tagValue + ' ');
        });
        
        return albumText.trim();
    },
    
    removeSpotifySearchTags: function(albumText, onlyKeepTags = undefined) {
        let matchesFound = this.getSpotifySearchTagMatches(albumText);

        matchesFound
            .forEach(m => {
                if (onlyKeepTags === undefined || onlyKeepTags.find(x => x == m.tag) !== undefined) {
                    albumText = albumText.replace(m.text, m.tagValue + ' ');
                } else {
                    albumText = albumText.replace(m.text, '');    
                }
            });
        
        return albumText.trim();
    }
}

module.exports = SpotifySearchTagParser;
module.exports.spotifySearchTags = spotifySearchTags;
# Spotify Search Tag Parser

This is a Spotify search tag parser. It does extract or remove search tags from a text.

## Table of contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)

## Features

The library includes functions to do the following:

    - Remove Spotify search tags from text
    - Extract Spotify search tags from text

## Installation

    $ npm install spotify-search-tag-parser --save

## Usage

First, instantiate.

```javascript
var SpotifySearchTagParser = require('spotify-search-tag-parser');
var spotifySearchTagParser = new SpotifySearchTagParser();
```

Lastly, use the `spotifySearchTagParser` object's methods to remove or extract spotify search tags.

```javascript
// remove artist tag from text
let result = spotifySearchTagParser.removeSpotifySearchTag(
    "album: inhale/exhale artist: nasum",
    SpotifySearchTagParser.spotifySearchTags.ARTIST
);
```

### Spotify Search Tags

 - artist
 - album
 - track
 - label
 - isrc
 - upc
 - year
 - tag

### Separator

Its necessary to include a `;` separator in text when there is no spotify tag separator, examples:

- `artist: Guns N' Roses; Appetite for Destruction`
- `artist: Guns N' Roses album: Appetite for Destruction; 1987`

### Extract Spotify search tags result

When extracting search tags the parser gonna return:

- `text`: matched text
- `tagValue`: matched tag value in text
- `tag`: matched tag type 

Example:

```javascript
var result = spotifySearchTagParser.getSpotifySearchTagMatches(
    "album:inhale/exhale artist:nasum year:1998"
);
```

Result:

```javascript
[
    { 
        text: 'artist:nasum ',
        tagValue: 'nasum',
        tag: 'artist'
    },
    {
        text: 'album:inhale/exhale ',
        tagValue: 'inhale/exhale',
        tag: 'album'
    },
    {
        text: 'year:1998',
        tagValue: '1998',
        tag: 'year'
    }
]
``` 

### Functions 

Below are examples for all functions.

```javascript
var SpotifySearchTagParser = require('spotify-search-tag-parser');
var spotifySearchTagParser = new SpotifySearchTagParser();

/**
 * Remove Tag Functions
 */

// Remove specific tag, album one
var result = spotifySearchTagParser.removeSpotifySearchTag(
    "album: inhale/exhale ; nasum",
    SpotifySearchTagParser.spotifySearchTags.ALBUM
);

// Remove every tag
var result = spotifySearchTagParser.removeSpotifySearchTags(
    "artist: nasum album:inhale/exhale year:1998"
);

/**
 * Extract Tag Functions
 */

// Extract only one tag 
var result = spotifySearchTagParser.getSpotifySearchTagMatch(
    "album:inhale/exhale artist:nasum year:1998",
    SpotifySearchTagParser.spotifySearchTags.ARTIST
);


// Extract every tag 
var result = spotifySearchTagParser.getSpotifySearchTagMatches(
    "album:inhale/exhale artist:nasum year:1998"
);

```
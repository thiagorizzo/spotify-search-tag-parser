const SpotifySearchTagParser = require('../src/index');

test('remove only one tag with only one tag in album text', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.removeSpotifySearchTag(
        "artist: nasum",
        SpotifySearchTagParser.spotifySearchTags.ARTIST
    );
    expect(result).toBe("nasum");
});

test('remove only one tag with two tags in album text and separator', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.removeSpotifySearchTag(
        "album: inhale/exhale ; nasum",
        SpotifySearchTagParser.spotifySearchTags.ALBUM
    );
    expect(result).toBe("inhale/exhale ; nasum");
});

test('remove only one tag with two tags in album text', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.removeSpotifySearchTag(
        "album: inhale/exhale artist: nasum",
        SpotifySearchTagParser.spotifySearchTags.ARTIST
    );
    expect(result).toBe("album: inhale/exhale nasum");
});

test('remove only one tag with multiple tags in album text', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.removeSpotifySearchTag(
        "artist: nasum album: inhale/exhale year:1998",
        SpotifySearchTagParser.spotifySearchTags.ARTIST
    );
    expect(result).toBe("nasum album: inhale/exhale year:1998");
});

test('remove all tags', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.removeSpotifySearchTags(
        "artist: nasum album:inhale/exhale year:1998"
    );
    expect(result).toBe("nasum inhale/exhale 1998");
});

test('remove all tags with only keep options', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.removeSpotifySearchTags(
        "artist: nasum album:inhale/exhale year:1998",
        [ 
            SpotifySearchTagParser.spotifySearchTags.ARTIST,
            SpotifySearchTagParser.spotifySearchTags.ALBUM
        ] 
    );
    expect(result).toBe("nasum inhale/exhale");
});

test('get only one tag match', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.getSpotifySearchTagMatch(
        "album:inhale/exhale artist:nasum year:1998",
        SpotifySearchTagParser.spotifySearchTags.ARTIST
    );
    expect(result[0].tagValue).toBe("nasum");
});

test('get only one tag match with separator', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.getSpotifySearchTagMatch(
        "album:inhale/exhale artist:nasum ;1998",
        SpotifySearchTagParser.spotifySearchTags.ARTIST
    );
    expect(result[0].tagValue).toBe("nasum");
});

test('get all tag matches', () => {
    let spotifySearchTagParser = new SpotifySearchTagParser();
    var result = spotifySearchTagParser.getSpotifySearchTagMatches(
        "album:inhale/exhale artist:nasum year:1998"
    );

    result.forEach(r => {
        switch(r.tag) {
            case SpotifySearchTagParser.spotifySearchTags.ALBUM:
                expect(r.tagValue).toBe("inhale/exhale");
                break;

            case SpotifySearchTagParser.spotifySearchTags.ARTIST:
                expect(r.tagValue).toBe("nasum");
                break;

            case SpotifySearchTagParser.spotifySearchTags.YEAR:
                expect(r.tagValue).toBe("1998");
                break;

            default:
                throw new Error('not expected tag');
        }
    });
});
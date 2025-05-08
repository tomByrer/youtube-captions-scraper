# v2.2.2

* replaced he with custom HTML excaped decoder for smaller package size
* moved test demos into their own folder

# v2.2.1

* removed eslint

# v2.2.0

* added upstream change; allow JS `fetch` to be used if avalable
* removed flow & prettier, updated other deps
* removed ava test; `dist-demo.js` has a default test

# v2.1.0

* fixed YouTube API URL

# v2.0.0

* BREAKING CHANGE: output includes videoID, language code, & datetime stamp of when script was ran
* BREAKING CHANGE: timeed text output has shortend key names for **s**tart, **d**uration, & **t**ext to save a few k.
* added CLI script: `node cli VIDEO-ID` to run, outputs in home dir as `VIDEO-ID.captions.json`.
* dropped lodash
* updated axios

# v1.1.0

* leave most HTML tags except `<font>` which is usally spammy.


# v1.0.1

* strip HTML tags from captions

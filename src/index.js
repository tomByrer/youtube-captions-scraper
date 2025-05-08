import he from 'he';
import axios from 'axios';

const fetchData = typeof fetch === 'function'
  ? async function fetchData(url) {
    console.log('using fetch')
    const response = await fetch(url);
    return await response.text();
  }
  : async function fetchData(url) {
    console.log('using axios')
    const { data } = await axios.get(url);
    return data;
  }

export async function getSubtitles({
  videoID = '9W0Dy1nM-zU',
  lang = 'en',
}) {
  const data = await fetchData(
    `https://youtube.com/watch?v=${videoID}`
  )
  // * ensure we have access to captions data
  if (!data.includes('captionTracks'))
    throw new Error(`Could not find captions for video: ${videoID}`);

  const regex =  /"captionTracks":(\[.*?\])/
  const [match] = regex.exec(data)
  console.log(match)
  const { captionTracks } = JSON.parse(`{${match}}`)
  console.log(captionTracks)
  const subtitle = captionTracks.find( ({ vssId }) => vssId && vssId.match(`.${lang}`) )

  // * ensure we have found the correct subtitle lang
  if (!subtitle || (subtitle && !subtitle.baseUrl))
    throw new Error(`Could not find ${lang} captions for ${videoID}`);

  const transcript = await fetchData(subtitle.baseUrl);

  let timedtext = []
  const startRegex = /start="([\d.]+)"/;
  const durRegex = /dur="([\d.]+)"/
  transcript
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
    .replace(/&lt;font color=&quot;#......&quot;&gt;/gi, '')
    .replace(/&lt;\/font&gt;/gi, '')
    .replace(/&amp;/gi, '&')
    .replace('</transcript>', '')
    .split('</text>')
    .filter(line => line && line.trim())
    .map( (line, i) =>{
      let cue = {}
      const [, start] = startRegex.exec(line)
      cue.s = parseFloat(start)
      const [, dur] = durRegex.exec(line)
      cue.d = parseFloat(dur)
      const htmlText = line.replace(/<text.+>/, '')
      cue.t = he.decode(htmlText)
      timedtext[i] = cue
    })

  return {
    videoID,
    lang,
    datePull:  Date.now(),
    timedtext,
  }
}

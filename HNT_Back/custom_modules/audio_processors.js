//* Methods to process audio.
let mp3Duration = require('mp3-duration'); //https://www.npmjs.com/package/mp3-duration
let NormalizeVolume = require('normalize-volume'); //https://www.npmjs.com/package/normalize-volume

//* Calculate duration (length) of audio in seconds
exports.getAudioLength = async function( mp3_audio ) {

  mp3Duration( mp3_audio, (err, duration) => {
    if (err) return err.message;
    return duration;
  })
}

//todo Normalize volume  To be built in version 2??
exports.normalizeVolume = async ( audio ) => {
  let output_audio = await NormalizeVolume(audio , output_file[, options]);
  return output_audio;
}
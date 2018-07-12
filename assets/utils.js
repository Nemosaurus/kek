/*
	//Coverting computers to art.
*/

(function () {
	var Utils = function (audioContext) {

		/*****
		 * Gets you the durration of one beat based on the BPM of the project
		 * ex: 60 bpm -> 1s
		 * ex: 120 bpm -> .5s
		 *
		 *    @param   {number} - BPM 
		 *    @returns {number} - Seconds 
		 */
		//TODO: RENAME TO BEAT DURRATION ( more accurate)
		this.bpmToNoteDurration = function (bpm) {
			return 60 / bpm
		}

		/****
		 * Gets time in seconds from formal time 
		 * [6,1,1] = 5 completed bars = 16 beats in 4/4
		 * 16 beats over the bpm = time in seconds
		 *
		 *   @param   {Array}  - formal Time [1,1,1] = initial state, no leading zeros
		 *   @param   {number} - how many beats are in each bar or measure 
		 *   @param   {number} - tempo of the formal time to convert
		 *   @returns {number} - time in seconds since 0  
		 */

		this.getBeatTime = function (fTime, beatsPerBar, bpm) {
			let measures = fTime[0] - 1
			//              measures * (top of Time Signature) +   beats   + extra 64th notes
			let beats = (measures * beatsPerBar) + fTime[1] - 1 + ((fTime[2] - 1) / 64)
			//             ( # of Beats * 60 sec ) / BPM
			let beatTime = (beats * 60) / bpm
			return beatTime
		}

		/****
		 * Gets formal time from Time in seconds
		 * 4 seconds in 4/4 @ 120 bpm = [3,1,1] aka 3rd measure, very start (NOT ZERO BASED)
		 * 
		 *   @param   {number} - how many beats are in each bar or measure 
		 *   @param   {number} - tempo of the formal time to convert
		 *   @param   {number} - (Optional) time in seconds. Defaults to currentTime
		 *   @returns {array}  - Formal Time   
		 */
		this.getFancyTime = function (beatsPerBar, bpm, time) {
			measures = parseInt((time / this.bpmToNoteDurration(bpm)) / 4)
			beats = parseInt((time / this.bpmToNoteDurration(bpm)) % 4)
			//			sixtyFourths = String(((time / this.bpmToNoteDurration(bpm)) / 4).toFixed(4)).split(",")
			let fTime = [measures, beats, 0]
			return fTime
		}
		/*
		 *
		 *WIP used to load new tracks
		 *Not sure if this should kick off scheduling or not. 
		 * Probably not. 
		 *
		 *
		 */
		this.loadTrack = function (trackPath) {
			console.log('new track inc' + trackPath)
			arrayBuffer = previewFile(trackPath)
			audioContext.decodeAudioData(arrayBuffer).then(function (audioBuffer) {
				source = new AudioBufferSourceNode(audioContext) //BuffAudio(audioContext, audioBuffer)
				source.buffer = audioBuffer
				source.connect(audioContext.destination)
				return source
			})

		}

		function previewFile(filePath) {
			var reader = new FileReader();
			reader.onloadend = function () {
				return (reader.result); //this is an ArrayBuffer
			}
			reader.readAsArrayBuffer(filePath);
		}



	}

	window.Utils = Utils

})()

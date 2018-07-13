/*
	//Coverting computers to art.
*/

(function () {
	//TODO Talk about passing in BPM Beats per Bar and other things as a constructor
	//take away dynamic changes to tempo and time signatures? 
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
			measures = parseInt(1 + (time / this.bpmToNoteDurration(bpm)) / 4)
			beats = parseInt(1 + (time / this.bpmToNoteDurration(bpm)) % 4)
			sixtyFourths = 1 + (parseInt(time / this.bpmToNoteDurration(bpm) * 64) % 64)
			//			console.log(sixtyFourths)
			let fTime = [measures, beats, sixtyFourths]
			return fTime
		}
		//1 - 1 - 1
		//1 - 1 - 2
		//1 - 1 - ..
		//1 - 1 - 64
		//1 - 2 - 1

		/****
		 *
		 * Adds two formal time arrays together
		 * Carries over the extra 64th notes and beats per bar
		 * 
		 *    @param    {array}  - First Formal Time 
		 *    @param    {array}  - Second Formal Time
		 *		@param    {number} - Number of Beats in one bar/measure
		 *		@returns  {array}  - Sum in Formal Time
		 */
		this.addBeats = function (fTime1, fTime2, beatsPerBar) {
			if (fTime1.length != 3 || fTime2.length != 3) {
				return new Error('Formal Time should only have a length of 3')
			}
			beats = fTime1[1] + (fTime2[1] - 1)
			barz = fTime1[0] + (fTime2[0] - 1)
			sixfour = fTime1[2] + (fTime2[2] - 1)
			while (sixfour > 64) {
				sixfour -= 64
				beats++
			}
			while (beats > beatsPerBar) {
				beats -= beatsPerBar
				barz++
			}
			console.log('addBeats returning ' + [barz, beats, sixfour] + " what we got is " + fTime1 + " : " + fTime2 + " : " + beatsPerBar)
			return [barz, beats, sixfour]
		}
		/*
		 *
		 *WIP used to load new tracks
		 *Not sure if this should kick off scheduling or not. 
		 * Probably not. 
		 *
		 *
		 */
		//		this.loadTrack = function (trackPath) {
		//			console.log('new track inc' + trackPath)
		//			arrayBuffer = openFile(trackPath)
		//			audioContext.decodeAudioData(arrayBuffer).then(function (audioBuffer) {
		//				source = new AudioBufferSourceNode(audioContext) //BuffAudio(audioContext, audioBuffer)
		//				source.buffer = audioBuffer
		//				source.connect(audioContext.destination)
		//				return source
		//			})
		//
		//		}

		function openFile(trackPath) {
			var reader = new FileReader();
			reader.onloadend = function () {
				return (reader.result); //this is an ArrayBuffer
			}

			reader.readAsArrayBuffer(trackPath);
		}



	}

	window.Utils = Utils

})()

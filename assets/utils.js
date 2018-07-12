/*
Use these for stuff
*/

(function () {
	var Utils = function (audioContext) {

		//TODO: RENAME TO BEAT DURRATION
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
		this.getFancyTime = function (beatsPerBar, bpm, optTime) {
			if (typeof optTime === undefined) {
				optTime = audioContext.currentTime;
				console.log("time " + optTime)
			}
			let measures = 1
			let beats = 1
			let sixtyFourths = 1
			measures = parseInt((optTime / this.bpmToNoteDurration(bpm)) / 4)
			beats = parseInt((optTime / this.bpmToNoteDurration(bpm)) % 4)
			//			console.log(beats)
			//sixtyFourths = everything after decimal place


			let fTime = [measures, beats, sixtyFourths]
			return fTime



		}

	}
	window.Utils = Utils

})()

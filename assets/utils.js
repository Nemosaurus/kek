/*
Use these for stuff
*/

(function () {
	var Utils = function (audioContext) {


		this.bpmToNoteDurration = function (bpm) {
			return 60 / bpm
		}

		/****
		 * Gets time in seconds from formal time 
		 * [6,1,1] = 5 completed bars = 16 beats in 4/4
		 * 16 beats over the bpm = time in seconds
		 * @param {Array} - formal Time [1,1,1] = initial state, no leading zeros
		 * @param {number} - how many beats are in each bar or measure 
		 * @param {number} - tempo of the formal time to convert
		 * @returns {number} - time in seconds since 0  
		 */
		function getBeatTime(fTime, beatsPerBar, bpm) {
			let measures = fTime[0] - 1
			//              measures * (top of Time Signature) +   beats   + extra 64th notes
			let beats = (measures * beatsPerBar) + fTime[1] - 1 + ((fTime[2] - 1) / 64)
			//             ( # of Beats * 60 sec ) / BPM
			let beatTime = (beats * 60) / bpm
			return beatTime
		}


		this.getBeatTime = function (bpm) {
			if (typeof audioContext === typeof undefined) {
				console.log("invalid audioContext scrub")
			} else {
				console.log(audioContext)

				console.log("BPM:" + bpm + " \n Time:" + audioContext.currentTime)

				return audioContext.currentTime

			}
		}
	}
	window.Utils = Utils

})()

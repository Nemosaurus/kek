/*
Use these for stuff
*/

(function () {
	var Utils = function (audioContext) {


		this.bpmToNoteDurration = function (bpm) {
			return 60 / bpm
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

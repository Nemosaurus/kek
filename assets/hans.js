/*
	Hans will Schedule and take care of playing the music. 
	Hans is conductor
	you is composor
*/
(function () {
	var Hans = function (audioContext) {

		//Variables here
		let bpm = 120
		let clickFreq = 2500
		let nextNotetime = audioContext.currentTime
		let utils = new Utils()
		let sampleHopper = []
		let metronomeMute = false

		//Private Functions
		function playSound(time) {
			let clickOsc = audioContext.createOscillator();
			clickOsc.connect(audioContext.destination);
			clickOsc.frequency.value = getClickFreq();
			clickOsc.start(time);
			clickOsc.stop(time + 0.01);
		}

		this.toggleMetronome = function () {
			metronomeMute = !metronomeMute
			console.log(metronomeMute)
			console.log(!metronomeMute)
		}

		this.schedule = function (track, startTime) {
			console.log(sampleHopper)
			console.log(track)
			sampleHopper.push({
				"track": track,
				"startTime": startTime
			})
		}
		let schedule = this.schedule

		//Public Functions
		this.getBPM = function () {
			return bpm
		}

		this.setBPM = function (bpmToSet) {
			bpm = bpmToSet
		}

		this.getClickFreq = function () {
			return clickFreq
		}
		let getClickFreq = this.getClickFreq

		this.setClickFreq = function (freq) {
			clickFreq = freq
		}

		this.scheduleLoop = function () {
			// Array of {obj.startTime & obj.track}
			//			sampleHopper.forEach(function (obj) {
			//				track = obj.track
			//				startTime = obj.startTime
			//set time for each element
			//loop through tracks left to schedule
			while (nextNotetime < audioContext.currentTime + 0.01) {
				nextNotetime += utils.bpmToNoteDurration(bpm); //set bpm here
				sampleHopper.forEach(function (obj) {
					track = obj.track
					startTime = obj.startTime
					//wait to schedule 
					if (audioContext.currentTime + 0.01 > startTime) {
						track.play(startTime);
					}
				})
				//				schedule(track, startTime)

				if (metronomeMute === false) {
					playSound(nextNotetime);
				}
			}
			timerID = window.setTimeout(scheduleLoop, 50.0);
			//			})
		}
		let scheduleLoop = this.scheduleLoop
	}

	window.Hans = Hans

})()

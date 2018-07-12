/*
	Hans will Schedule and take care of playing the music. 
	Hans is conductor
	you is composor
*/
(function () {
	var Hans = function (audioContext) {

		//Variables here
		let testData = []
		let bpm = 120
		let clickFreq = 2500
		let nextNotetime = audioContext.currentTime
		let utils = new Utils()
		let sampleHopper = []
		let metronomeMute = false

		let clickSample = audioContext.createAudioB

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

		//[1,1,1] Init to
		//[bar, beat, 64th beat]
		this.schedule = function (track, fTime) {
			let startTime = utils.getBeatTime(fTime, 4, bpm)
			sampleHopper.push({
				"track": track,
				"startTime": startTime
			})
			console.log(sampleHopper)
			console.log(track)
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
		this.getTestData = function () {
			let res = []
			testData.forEach(function (element, index, array) {
				console.log("tick @ " + element)
				if (typeof array[index + 1] != undefined) {
					res.push(array[index + 1] - array[index])
					console.log(res)
				}
			})
			return res
		}

		   //For the metronome.
		//Schedule it like everything else. 
		//use the new Ftime conversion 
		// yee boi

		this.scheduleLoop = function () {
			//			console.log(audioContext.currentTime)
			while (nextNotetime < audioContext.currentTime + 0.01) {
				nextNotetime += utils.bpmToNoteDurration(bpm); //set bpm here
				sampleHopper.forEach(function (obj, index) {
					track = obj.track
					startTime = obj.startTime
					sampleHopper.splice(index, 1)
					//wait to schedule 
					if (audioContext.currentTime + 0.01 > startTime) {
						track.start(startTime);
					}
				})
				//				schedule(track, startTime)

				if (metronomeMute === false) {
					testData.push(performance.now())
					this.schedule(utils.loadTrack('Click1.wav'), ) //finish this yo
					// schedule the click track dummy
					// dont just play it. 


					playSound(nextNotetime);
				}
			}
			timerID = window.setTimeout(scheduleLoop, 50.0);
		}
		let scheduleLoop = this.scheduleLoop
	}

	window.Hans = Hans

})()

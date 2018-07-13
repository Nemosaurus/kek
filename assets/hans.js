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
		let fTimeDisplay = document.getElementById('FancyTime')
		let clickSample = audioContext.createAudioBuffer
		let clickOsc = audioContext.createOscillator();
		clickOsc.connect(audioContext.destination);

		this.toggleMetronome = function () {
			metronomeMute = !metronomeMute
		}

		this.schedule = function (track, fTime) {
			let startTime = utils.getBeatTime(fTime, 4, bpm)
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
			console.log('hans')
			bpm = bpmToSet
		}

		this.getClickFreq = function () {
			return clickFreq
		}
		let getClickFreq = this.getClickFreq

		this.setClickFreq = function (freq) {
			clickFreq = freq
		}

		function click(time) {
			let clickOsc = audioContext.createOscillator();
			clickOsc.connect(audioContext.destination);
			clickOsc.frequency.value = getClickFreq();
			//			console.log(clickOsc.frequency.value)			
			clickOsc.start(time);
			clickOsc.stop(time + 0.01);
		}
		//		this.getTestData = function () {
		//			let res = []
		//			testData.forEach(function (element, index, array) {
		//				if (typeof array[index + 1] != undefined) {
		//					res.push(array[index + 1] - array[index])
		//					//					console.log(res)
		//				}
		//			})
		//			return res
		//		}
		this.currentFormalTime = function () {
			utils.getFancyTime(audioContext.currentTime, )
		}

		this.scheduleLoop = function () {
			while (nextNotetime < audioContext.currentTime + (utils.bpmToNoteDurration(120)) / 32) {
				nextNotetime += (utils.bpmToNoteDurration(120)) / 32; //set bpm here
				fTimeDisplay.innerHTML = utils.getFancyTime(4, document.getElementById('bpmInput').value, audioContext.currentTime)
				sampleHopper.forEach(function (obj, index) {
					track = obj.track
					startTime = obj.startTime
					sampleHopper.splice(index, 1)
					//schedule the next bar
					if ((audioContext.currentTime + (utils.bpmToNoteDurration(120)) / 32) > startTime) {
						track.start(startTime);
					}
				})

				if (metronomeMute === false) {
					//schedule next click.
					//TODO get a click buffer lol uncomment the next line and change the `cick` varaiable 
					//this.schedule(click, (utils.addBeats(utils.getFancyTime(4, document.getElementById('bpmInput').value, audioContext.currentTime), [1, 2, 1], 4)))
					//					testData.push(performance.now())    //use this with this.getTestData() 
					click(nextNotetime);
				}
			}
			timerID = window.setTimeout(scheduleLoop, 40.0);
		}
		let scheduleLoop = this.scheduleLoop
	}

	window.Hans = Hans

})()

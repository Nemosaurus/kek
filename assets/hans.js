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




		//Private Functions
		function playSound(time) {
			let clickOsc = audioContext.createOscillator();
			clickOsc.connect(audioContext.destination);
			clickOsc.frequency.value = getClickFreq();
			clickOsc.start(time);
			clickOsc.stop(time + 0.01);

		}

		this.schedule = function (track) {
			console.log(sampleHopper)
			console.log(track)
			sampleHopper.push(track)
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
			while (nextNotetime < audioContext.currentTime + 0.01) {
				nextNotetime += utils.bpmToNoteDurration(bpm); //set bpm here
				//nextNote.innerHTML = nextNotetime;
				playSound(nextNotetime);
			}
			timerID = window.setTimeout(scheduleLoop, 50.0);
		}
		let scheduleLoop = this.scheduleLoop





	}

	window.Hans = Hans

})()

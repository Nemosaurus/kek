document.addEventListener("DOMContentLoaded", function () {

	var audioContext = new AudioContext()
	audioContext.suspend()
	var utils = new Utils(audioContext)
	var hans = new Hans(audioContext)
	var debuger = new Debug(audioContext)

	debuger.createDebugTable()
	hans.scheduleLoop()

	function createTrack(file) {}


	var reader = new FileReader();

	function newTrack(trackNo, track, startTime) {

		console.log('new track inc' + trackNo)
		var fileReader = new FileReader()
		fileReader.onloadend = function (e) {
			var arrayBuffer = e.target.result
			audioContext.decodeAudioData(arrayBuffer).then(function (audioBuffer) {
				if (trackNo === 1) {
					source1 = new BuffAudio(audioContext, audioBuffer)
					hans.schedule(source1, startTime)
				} else if (trackNo === 2) {
					source2 = new BuffAudio(audioContext, audioBuffer)
					hans.schedule(source2, startTime)
				} else {
					console.error("this, shouldn't happen ever.. use 1 or two for your track number...")
				}
			})
		}
		fileReader.readAsArrayBuffer(track)
	}

	document.getElementById('newTrackButton').onclick = function () {
		let trackNo = document.getElementById('selectTrack').value
		let track = document.getElementById('trackMP3').files[0]
		let startTime = document.getElementById('startTime').value
		console.log("track No: " + trackNo + "\nFile: " + track + "\nStart at: " + startTime)
		console.log(track)
		newTrack(parseInt(trackNo), track, startTime)
	}

	document.getElementById('bpmInput').onchange = function () {
		hans.setBPM(document.getElementById('bpmInput').value)
		console.log("bpm: " + hans.getBPM)
	}

	document.getElementById('metronomeMute').onclick = function () {
		hans.toggleMetronome()
	}

	document.getElementById('clickFreq').onchange = function () {
		hans.setClickFreq(document.getElementById('clickFreq').value)
		console.log("click freq: " + hans.getClickFreq())
	}

	document.getElementById('susResBtn').onclick = function () {
		if (audioContext.state === 'running') {
			console.log('suspending Context')
			audioContext.suspend().then(function () {
				document.getElementById('susResBtn').textContent = 'Resume context';
			})
		} else if (audioContext.state === 'suspended') {
			console.log('resuming Context')
			audioContext.resume().then(function () {
				document.getElementById('susResBtn').textContent = 'Suspend context';
			})
		}
	}


})

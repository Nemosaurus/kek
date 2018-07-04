document.addEventListener("DOMContentLoaded", function () {

	var audioContext = new AudioContext()
	var utils = new Utils(audioContext)
	var hans = new Hans(audioContext)
	var debuger = new Debug(audioContext)
	debuger.createDebugTable()

	console.log(utils.bpmToNoteDurration(120))
	hans.setClickFreq(2500)
	console.log(hans.getClickFreq())





	document.getElementById('bpmInput').onchange = function () {
		hans.setBPM(document.getElementById('bpmInput').value)
		console.log("bpm: " + hans.getBPM)
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

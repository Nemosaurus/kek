/*
	Put a div with the id of debug on the page to see this.
	
	This is just a bunch of info for the audio context
	
	And tracks and stuff
	
*/
(function () {
	var Debug = function (audioContext) {

		var debugDiv = document.getElementById("debug")
		var debugItems = []

		var utils = new Utils()
		utils.bpmToNoteDurration(120)

		this.createDebugTable = function () {


			let table = document.createElement("table")
			let tBody = document.createElement("tbody")

			debugDiv.appendChild(table)
			table.appendChild(tBody)

			//		this.debugItems.forEach(function (item) {
			let tr1 = document.createElement("tr")
			let lab1 = document.createElement("td")
			let res1 = document.createElement("td")
			tr1.appendChild(lab1)
			tr1.appendChild(res1)
			lab1.innerHTML = "AudioContext CurrentTime:"
			tBody.appendChild(tr1)

			let tr2 = document.createElement("tr")
			let lab2 = document.createElement("td")
			let res2 = document.createElement("td")
			tr2.appendChild(lab2)
			tr2.appendChild(res2)
			lab2.innerHTML = "AudioContext State:"
			tBody.appendChild(tr2)

			let tr3 = document.createElement("tr")
			let lab3 = document.createElement("td")
			let res3 = document.createElement("td")
			tr3.appendChild(lab3)
			tr3.appendChild(res3)
			lab3.innerHTML = "AudioContext Base Latency:"
			tBody.appendChild(tr3)

			let tr4 = document.createElement("tr")
			let lab4 = document.createElement("td")
			let res4 = document.createElement("td")
			tr4.appendChild(lab4)
			tr4.appendChild(res4)
			lab4.innerHTML = "Inputs / Outputs / Chanels:"
			tBody.appendChild(tr4)

			let tr5 = document.createElement("tr")
			let lab5 = document.createElement("td")
			let res5 = document.createElement("td")
			tr5.appendChild(lab5)
			tr5.appendChild(res5)
			lab5.innerHTML = "Memory % Allocated :"
			tBody.appendChild(tr5)


			setInterval(function () {
				res1.innerHTML = audioContext.currentTime
				res2.innerHTML = audioContext.state
				res3.innerHTML = audioContext.baseLatency
				res4.innerHTML = audioContext.destination.numberOfInputs + " / " + audioContext.destination.numberOfOutputs + " / " +
					audioContext.destination.maxChannelCount
				res5.innerHTML = (performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize * 100).toFixed(2) + "%"
				document.getElementById('FancyTime').innerHTML = utils.getFancyTime(4, document.getElementById('bpmInput').value, audioContext.currentTime)
			}, 80);


		}
	}
	window.Debug = Debug

})()

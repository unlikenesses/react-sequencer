import React, { Component } from 'react';
import Pads from './components/Pads';
import Controls from './components/Controls';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.audioCx = new (window.AudioContext || window.webkitAudioContext)();
		this.gain = this.audioCx.createGain();
		this.gain.connect(this.audioCx.destination);
		this.gain.gain.value = 1;
		this.frequencies = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392];
		this.state = {
			pads: [
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0]
			],
			playing: false,
			pos: 0,
			bpm: 220
		}
		this.togglePlaying = this.togglePlaying.bind(this);
		this.toggleActive = this.toggleActive.bind(this);
		this.changeBpm = this.changeBpm.bind(this);
	}
	togglePlaying() {
		if (this.state.playing) {
			clearInterval(this.timerId);
			this.setState({ playing: false });
		} else {
			this.setTimer();
			this.setState({ playing: true });
		}
	}
	tick() {
		var pos = this.state.pos;
		pos++;
		if (pos > 7) {
			pos = 0;
		}
		this.setState({ pos: pos });
		this.checkPad();
	}
	checkPad() {
		this.state.pads.forEach((row, rowIndex) => {
			row.forEach((pad, index) => {
				if (index === this.state.pos && pad === 1) {
					this.playSound(rowIndex);
				};
			})
		});
	}
	playSound(rowIndex) {
		var freq = this.frequencies[rowIndex];
		var node = this.audioCx.createOscillator();
		var currentTime = this.audioCx.currentTime;
		node.frequency.value = freq;
		node.detune.value = 0;
		node.type = 'sine';
		node.connect(this.gain);
		node.start(currentTime);
		node.stop(currentTime + 0.2);
	}
	calculateTempo(bpm) {
		return 60000 / bpm;
	}
	changeBpm(bpm) {
		this.setState({ bpm: bpm.target.value });
		if (this.state.playing) {
			clearInterval(this.timerId);
			this.setTimer();
		}
	}
	setTimer() {
		this.timerId = setInterval(() => this.tick(), this.calculateTempo(this.state.bpm));
	}
	toggleActive(rowIndex, id) {
		var pads = [...this.state.pads];
		var padState = pads[rowIndex][id];
		if (padState === 1) {
			pads[rowIndex][id] = 0;
		} else {
			pads[rowIndex][id] = 1;
		}
		this.setState({ pads: pads });
	}
	render() {
		return (
		    <div className="App">
		        <Controls 
		        	bpm={this.state.bpm} 
		        	handleChange={this.changeBpm} 
		        	playing={this.state.playing} 
		        	togglePlaying={this.togglePlaying} />
		        <Pads 
		        	pos={this.state.pos} 
		        	pads={this.state.pads} 
		        	toggleActive={this.toggleActive} />
		        <p className="link">
		        	<a href="https://github.com/unlikenesses/react-sequencer">View the code on GitHub</a>
		        </p>
		    </div>
		);
	}
}

export default App;

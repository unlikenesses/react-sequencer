import React from 'react';

class Controls extends React.Component {
	render() {
		var buttonText = this.props.playing ? 'Stop' : 'Play';
		return (
			<div className="controls">
				<button onClick={() => this.props.togglePlaying()}>{buttonText}</button>
				<div className="bpm">
					<label>BPM:</label>
					<input 
						type="range" 
						id="bpm" 
						min="1" 
						max="420" 
						step="1" 
						defaultValue={this.props.bpm} 
						onChange={this.props.handleChange} />
					<output>
						{ this.props.bpm }
					</output>
				</div>
			</div>			
		);
	}
}

export default Controls;
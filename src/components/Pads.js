import React from 'react';
import Pad from './Pad';

class Pads extends React.Component {
	render() {
		return (
			<div className="pads">
				{this.props.pads.map((row, rowIndex) => {
					return (
						<div className="row" key={rowIndex}>
							{row.map((pad, index) => {
								return <Pad 
										key={index} 
										rowIndex={rowIndex} 
										id={index} 
										state={pad}
										pos={this.props.pos}
										toggleActive={() => this.props.toggleActive(rowIndex, index)} />
							})}
						</div>
					)
				})}
			</div>
		);
	}
}

export default Pads;
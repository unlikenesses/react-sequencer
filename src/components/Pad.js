import React from 'react';

class Pad extends React.Component {
	render() {
		return (
			<div 
				className={"pad " + (this.props.state === 1 ? 'active' : '') + (this.props.pos === this.props.id ? ' playing' : '')}
				onClick={() => this.props.toggleActive(this.props.rowIndex, this.props.id)}>
			</div>
		);
	}
}

export default Pad;
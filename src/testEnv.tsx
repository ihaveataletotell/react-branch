import * as React from 'react';
import * as ReactDom from 'react-dom';

export const TestEnv = (): React.ReactElement => {
	return (
		<div>
			{'app is working'}
		</div>
	);
}

ReactDom.render(<TestEnv />, document.getElementById('app'));
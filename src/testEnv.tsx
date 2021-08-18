import * as React from 'react';
import * as ReactDom from 'react-dom';
import test from 'src/index';

export const TestEnv = (): React.ReactElement => {
	test();

	return (
		<div>
			{'app is working'}
		</div>
	);
}

ReactDom.render(<TestEnv />, document.getElementById('app'));
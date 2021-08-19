import * as React from 'react';
import * as ReactDom from 'react-dom';
import {VC} from 'whip-jsx-vc';

export const TestEnv = (): React.ReactElement => {
	return (
		<VC.Full>
			{'app is working'}
		</VC.Full>
	);
}

ReactDom.render(<TestEnv />, document.getElementById('app'));
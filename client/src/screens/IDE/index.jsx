import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from 'screens/NotFound';

import IDE from './IDE';

class IDEIndex extends React.Component {
	render() {
		const path = '/ide';

		return (
			<Switch>
				<Route path={path} exact component={IDE} />
				<Route component={NotFound} />
			</Switch>
		);
	}
}

export default IDEIndex;

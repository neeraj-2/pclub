import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Componenet utilised to scroll to top whenever the route changes
 */
class ScrollToTop extends React.Component {
	componentDidUpdate({ location: prevLocation }) {
		const { location } = this.props;
		if (prevLocation !== location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		const { children } = this.props;
		return children;
	}
}

ScrollToTop.propTypes = {
	children: PropTypes.node,
	location: PropTypes.object,
};

export default withRouter(ScrollToTop);

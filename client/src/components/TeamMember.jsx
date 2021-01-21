/* eslint-disable react/sort-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';

const TeamMember = ({ data }) => (
	<div className="teamMember-border">
		<Image src="/media/images/undraw_coding.png" width="100%" height="12rem" />
		<h4>{data.name}</h4>
		<p className="designation">{data.designation}</p>
		<p className="bio">{data.bio}</p>
	</div>
);

TeamMember.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.string,
		designation: PropTypes.string,
		bio: PropTypes.string,
		links: PropTypes.shape({
			insta: PropTypes.string,
			linkedin: PropTypes.string,
			github: PropTypes.string,
		}),
	}),
};

export default TeamMember;

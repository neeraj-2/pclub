import React from 'react';
import Image from 'components/Image';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import TimeLine from 'components/Timeline';

const AboutUs = () => {
	const history = useHistory();
	return (
		<div className="about-container">
			<h2>What is Programming Club IIT-J?</h2>
			<div className="flex inner-container-1">
				<p className="text">
					Programming Club is a student-run technical group at IIT Jodhpur,
					which aims to encourage the development of technology and innovation
					in the campus and beyond. We believe in learning and sharing
					knowledge; collaboration and experimentation; and human interaction
					that matters the most.
				</p>
				<Image
					src="/media/images/undraw_coding.png"
					height="17rem"
					width="100%"
				/>
			</div>
			<div className="flex inner-container-2">
				<div className="flex right-container">
					<h2>What do we do?</h2>
					<p>
						We are involved in a lot of activities on the campus, off the campus
						and on the web. We conduct lectures and workshops on different
						fields of tech, organize hackathons, and also conduct online
						competitions on our various self developed applications.
					</p>
				</div>
				<Carousel width="25rem" infiniteLoop centerMode>
					<div key="slide1">
						<Image
							src="/media/images/undraw_coding.png"
							height="17rem"
							width="100%"
						/>
						<p className="legend">Legend 1</p>
					</div>
					<div key="slide2">
						<Image
							src="/media/images/undraw_coding.png"
							height="17rem"
							width="100%"
						/>
						<p className="legend">Legend 2</p>
					</div>
					<div key="slide3">
						<Image
							src="/media/images/undraw_coding.png"
							height="17rem"
							width="100%"
						/>
						<p className="legend">Legend 3</p>
					</div>
				</Carousel>
			</div>
			<div className="flex inner-container-1">
				<div>
					<h2>Team</h2>
					<p className="text">
						The amazing amalgamation of designers and developers along with a
						vast alumni base has always been an important part of our journey.
						Check out our team page to know more about our members.
					</p>
					<button
						className={classnames('btn open-team-button', {})}
						type="button"
						onClick={() => {
							history.push('/Team');
						}}
					>
						<div className="flex center" />
						Open Teampage
					</button>
				</div>
				<Image
					src="/media/images/undraw_team.png"
					height="17rem"
					width="100%"
				/>
			</div>
			<div className="flex Timeline">
				<h1>TimeLine</h1>
			</div>
			<TimeLine />
		</div>
	);
};

export default AboutUs;

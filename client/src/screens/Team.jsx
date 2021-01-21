import TeamMember from 'components/TeamMember';
import React from 'react';
import { Row, Col } from 'react-simple-flex-grid';
import 'react-simple-flex-grid/lib/main.css';

const TeamPage = () => {
	const team = [
		{
			name: 'Kunal Tawatia',
			designation: 'SWE @ Google',
			bio:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi unde aut incidunt dolor, assumenda odit. Possimus dolor iste necessitatibus ut odio quas quaerat minus aliquid.',
			links: {
				insta: '',
				linkedin: '',
				github: '',
			},
		},
		{
			name: 'Kunal Tawatia',
			designation: 'SWE @ Google',
			bio:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi unde aut incidunt dolor, assumenda odit. Possimus dolor iste necessitatibus ut odio quas quaerat minus aliquid.',
			links: {
				insta: '',
				linkedin: '',
				github: '',
			},
		},
		{
			name: 'Kunal Tawatia',
			designation: 'SWE @ Google',
			bio:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi unde aut incidunt dolor, assumenda odit. Possimus dolor iste necessitatibus ut odio quas quaerat minus aliquid.',
			links: {
				insta: '',
				linkedin: '',
				github: '',
			},
		},
		{
			name: 'Kunal Tawatia',
			designation: 'SWE @ Google',
			bio:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi unde aut incidunt dolor, assumenda odit. Possimus dolor iste necessitatibus ut odio quas quaerat minus aliquid. Culpa deleniti nisi quis quisquam.',
			links: {
				insta: '',
				linkedin: '',
				github: '',
			},
		},
	];
	return (
		<div>
			<h2 className="heading">Meet the Team</h2>
			<div className="team-border">
				<Row>
					{team.map((t) => {
						return (
							<Col
								key={t.name}
								lg={{ span: 4 }}
								sm={{ span: 6 }}
								xs={{ span: 12 }}
							>
								<TeamMember data={t} />
							</Col>
						);
					})}
				</Row>
			</div>
		</div>
	);
};

export default TeamPage;

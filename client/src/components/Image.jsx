import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Image = ({
	src,
	alt,
	style,
	imageStyle,
	size,
	clickable,
	width,
	height,
	circle,
	caption,
}) => {
	const [imageDescription, setImageDescription] = useState({
		containerHeight: 1,
		containerWidth: 1,
		naturalHeight: 1,
		naturalWidth: 1,
	});
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	const captionLocation = () => {
		let stickingSide = 'HEIGHT';
		const {
			containerHeight: ch,
			containerWidth: cw,
			naturalHeight: nh,
			naturalWidth: nw,
		} = imageDescription;
		if (cw / ch > nw / nh) {
			stickingSide = 'WIDTH';
		}
		if (stickingSide === 'HEIGHT') {
			return {
				right: 0,
				bottom: (ch - (nh * cw) / nw) / 2 - 24,
			};
		}
		return {
			right: (cw - (nw * ch) / nh) / 2,
			bottom: 0,
		};
	};

	const imageContainerStyle = circle
		? {
				...style,
				minWidth: size,
				width: size,
				height: size,
		  }
		: { ...style, width, height };

	return (
		<div
			className={classNames(
				'image-holder',
				{ loading: !loaded },
				{ clickable, circle },
			)}
			style={imageContainerStyle}
		>
			<img
				src={error ? '/media/brand/icon.png' : src}
				alt={alt}
				style={imageStyle}
				onLoad={(event) => {
					setLoaded(true);
					const {
						height: containerHeight,
						width: containerWidth,
						naturalHeight,
						naturalWidth,
					} = event.target;
					setImageDescription({
						containerHeight,
						containerWidth,
						naturalHeight,
						naturalWidth,
					});
				}}
				onError={() => setError(true)}
			/>
			{caption?.label && (
				<a
					className="caption"
					href={caption.link}
					target="_blank"
					style={captionLocation()}
				>
					{caption.label}
				</a>
			)}
		</div>
	);
};

Image.propTypes = {
	alt: PropTypes.string,
	caption: PropTypes.object,
	circle: PropTypes.bool,
	clickable: PropTypes.bool,
	height: PropTypes.string,
	imageStyle: PropTypes.object,
	size: PropTypes.string,
	src: PropTypes.string.isRequired,
	style: PropTypes.object,
	width: PropTypes.string,
};

Image.defaultProps = {
	alt: 'image',
	caption: { label: '', link: '' },
	style: {},
	imageStyle: {},
	clickable: false,
	circle: false,
};

export default Image;

import PropTypes     	from "prop-types";
import ReactPlayer 		from "react-player";

const YoutubeVideoPlayer = ({ loop, playing, url, width, height }) => (
	<>
		<ReactPlayer
			loop={loop}
			playing={playing}
			url={url}
			width={width}
			height={height}
		/>
	</>
);

YoutubeVideoPlayer.propTypes = {
	url     : PropTypes.string.isRequired,
	loop    : PropTypes.bool,
	playing : PropTypes.bool,
	width   : PropTypes.string,
	height  : PropTypes.string,
};

YoutubeVideoPlayer.defaultProps = {
	loop    : true,
	playing : true,
	width   : "100%",
	height  : "calc(45vw + 7vh)",
};

export default YoutubeVideoPlayer;

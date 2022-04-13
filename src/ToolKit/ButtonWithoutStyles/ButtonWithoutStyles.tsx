import { memo } from "react";

// Import Own Components
import useStyles from "./styles";

interface Props {
	className ?: string;
};

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

/**
 * Creates a button that acts as a container to handle user click actions 
 * or any button like action, usage is like a regular button element
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 */
const ButtonWithoutStyles: React.FC<Props & ButtonProps> = ({ className = "", ...rest }) => {
	const classes = useStyles();

	return (
		<button
			{...rest}
			className={`${classes.button} ${className}`}
		/>
	);
};

export default ButtonWithoutStyles;

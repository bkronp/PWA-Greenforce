import PropTypes from "prop-types";
import {
	IconButton,
	CircularProgress,
} from "@material-ui/core";

// Import Own Components
import logo from "~/Resources/logo.png";
import {
	FaUser as UserIcon,
	FaLock as LockIcon,
} from "~/Resources/icons/far";
import { FaArrowLeft } from "~/Resources/icons/fas";
import {
	Button,
	NativeInput,
} from "~/ToolKit";
import useStyles from "./styles";

const Login = ({
	delegations : {
		formData,
		handleChange,
		handleSubmit,
		loading,
		goBack,
		type,
	},
}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{(type === "customer" || type === "provider") &&
				<IconButton
					className={classes.backButton}
					onClick={goBack}
				>
					<FaArrowLeft />
				</IconButton>}

			<div className={classes.mainSection}>
				<div className={classes.imageContainer}>
					<img src={logo} alt="Progenetic" />
				</div>

				<form noValidate autoComplete="off">
					<NativeInput
						startAdornment={UserIcon}
						id="Username"
						label="username"
						name="username"
						value={formData?.username || ""}
						onChange={handleChange}
						placeholder="Enter your username"
					/>
					<NativeInput
						startAdornment={LockIcon}
						id="Password"
						label="Password"
						type="password"
						name="password"
						value={formData?.password || ""}
						onChange={handleChange}
						placeholder="Enter your account password"
					/>

					<Button
						type="submit"
						color="primary"
						grow
						className={classes.button}
						onClick={handleSubmit}
					>
						Iniciar sesión
					</Button>

					{ loading && (
						<div className={classes.loading}>
							<CircularProgress />
						</div>
					) }
				</form>
			</div>
		</div>
	);
};

Login.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default Login;

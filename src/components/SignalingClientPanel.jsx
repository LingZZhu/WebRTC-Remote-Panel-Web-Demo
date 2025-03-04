import {
	Container,
	Button,
	TextField,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Divider,
	useTheme,
	useMediaQuery,
} from "@mui/material";

import { useState } from "react";

function SignalingClientPanel(props) {
	// React properties passed in App.js
	const {
		clients,
		address,
		port,
		connectedToServer,
		signalingClient,
		webRTCConnection,
		setPortHandler,
		setAddressHandler,
	} = props;

	const theme = useTheme();

	const isMedium = useMediaQuery(theme.breakpoints.down("md"));
	const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
	const isXLarge = useMediaQuery(theme.breakpoints.down("xl"));

	// CSS Styling
	const componentStyle = {
		backgroundColor: "darkgray",
		width: isMedium ? "100%" : isLarge ? "100%" : isXLarge ? "100%" : "20%",
	};
	const buttonStyle = {
		marginTop: 2,
	};
	const listStyle = {
		display: "inline-block",
	};
	const listItemTextStyle = {
		width: "100%",
		fontSize: "10px",
	};

	const [listVisible, setListVisible] = useState(false);

	const listContainerStyle = listVisible
  	  	? {
      		position: "fixed",
      		top: "50%",
      		left: "50%",
      		transform: "translate(-50%, -50%)",
      		zIndex: 1000,
      		backgroundColor: "white",
      		padding: "16px",
      		borderRadius: "8px",
      		maxWidth: "80%",
      		maxHeight: "80%",
      		overflowY: "auto",
      	}
    : { display: "none" };

	// Updated toggle button style: now positioned inside the circle,
  	// centered horizontally along the circle's vertical center axis and placed near the bottom.
  	const toggleButtonStyle = {
      	position: "absolute",
      	bottom: "20px",      // 20px from the bottom of the circle
      	left: "50%",
      	transform: "translateX(-50%)",
      	width: "36px",
      	height: "36px",
      	borderRadius: "50%",  // makes it a circle
      	backgroundColor: "rgba(0, 0, 0, 0.06)",
      	color: "darkgray",
      	display: "flex",
      	justifyContent: "center",
      	alignItems: "center",
      	cursor: "pointer",
      	zIndex: 1001,
  	};


	// Event handlers bound to text fields, they use the passed properties functions
	const handleAddressChange = (event) => {
		console.log("Signaling Host Address was changed");
		setAddressHandler(event.target.value);
	};
	const handlePortChange = (event) => {
		console.log("Signaling Host Port was changed");
		setPortHandler(event.target.value);
	};

	

	return (
	  <>
		{/*<Container id="tdSignaling" style={componentStyle}>*/}
			{/* <h2>Signaling server settings: </h2> */}
			{/* <h3>IP Address</h3> */}
			{ /*<TextField
				variant="standard"
				label="Address"
				id="adress"
				defaultValue={address}
				disabled={connectedToServer}
				onChange={(event) => handleAddressChange(event)}
			>
				{address}
			</TextField> */}
			{/* <h3>Port</h3> */}
			{/* <TextField
				variant="standard"
				label="Port"
				id="port"
				defaultValue={port}
				disabled={connectedToServer}
				onChange={(event) => handlePortChange(event)}
			></TextField> */}
			{/* <Button
				variant="contained"
				id="btnConnect"
				style={buttonStyle}
				disabled={connectedToServer}
				onClick={() => signalingClient.open(address, port)}
			>
				Connect
			</Button> */}
			{/* <Button
				variant="contained"
				id="btnDisconnect"
				style={buttonStyle}
				disabled={!connectedToServer}
				onClick={() => signalingClient.close()}
			>
				Disconnect
			</Button>  */}
			{/* <h4>Connected to server: {connectedToServer ? "Yes" : "No"}</h4> */}
			{/* <Divider /> */}
			<Container id="tdSignalingList" disableGutters style={listContainerStyle}>
				{/*  <h3>Signaling clients list </h3> */}
				<List className="clients">
					{clients.map((wsClient, i) => {
						const { id, address, properties } = wsClient;

						// Returns a React component to be rendered
						return (
							<ListItem key={id} style={listStyle} disableGutters>
								<ListItemText
									primary={address}
									style={listItemTextStyle}
								></ListItemText>
								{/* <ListItemText
									secondary={id}
									style={listItemTextStyle}
								></ListItemText> */}
								<ListItemButton component="a">
									<ListItemText
										primary="Start"
										onClick={() =>
											webRTCConnection.onCallStart(address, properties)
										}
									></ListItemText>
								</ListItemButton>
								<ListItemButton component="a">
									<ListItemText
										primary="End"
										onClick={() => webRTCConnection.onCallEnd()}
									></ListItemText>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Container>
		{/* </Container> */}

		{/* --- NEW: Floating toggle button to show/hide the client list --- */}
		<div
        style={toggleButtonStyle}
        onClick={() => setListVisible((prev) => !prev)}
        title="Toggle Client List"
      >
        {listVisible ? (
          // When list is visible, show an "X" icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="darkgray"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 11.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
          </svg>
        ) : (
          // When hidden, show a "list" icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="darkgrayy"
            viewBox="0 0 16 16"
          >
            <path d="M2 12.5a.5.5 0 010-1h12a.5.5 0 010 1H2zm0-4a.5.5 0 010-1h12a.5.5 0 010 1H2zm0-4a.5.5 0 010-1h12a.5.5 0 010 1H2z" />
          </svg>
        )}
      </div>
	  </>

	);
}

export default SignalingClientPanel;

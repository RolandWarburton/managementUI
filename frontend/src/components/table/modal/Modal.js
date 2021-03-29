import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ModalContent from "./ModalContent";

import propTypes from "prop-types";
import exact from "prop-types-exact";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const deletePageHandler = async (_id) => {
	const postURL = `/api/v1/watch/delete/${_id}`;
	const options = {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	const result = await (await fetch(postURL, options)).json();
	return result;
};

const notImplemented = (functionName) => {
	return "Function not implemented";
};

const CloseButton = ({ handleClose }) => {
	return (
		<DialogActions>
			<Button onClick={handleClose} color="primary" autoFocus>
				Close
			</Button>
		</DialogActions>
	);
};

const OpenButton = ({ handleOpen }) => {
	return (
		<Button
			variant="contained"
			type="submit"
			color="primary"
			disabled={false}
			onClick={() => {
				handleOpen();
			}}
		>
			Edit
		</Button>
	);
};

const Modal = (props) => {
	const { fullScreen } = props;
	const [open, setOpen] = useState(false);

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	const rows = [
		{ key: "_id", value: props._id, prettyName: "Page ID" },
		{ key: "pageName", value: props.pageName, prettyName: "Page Name" },
		{ key: "websitePath", value: props.websitePath, prettyName: "Website Path" },
		{ key: "__v", value: props.__v, prettyName: "Version" },
		{ key: "meta.template", value: props.meta.template, prettyName: "Template" },
	];

	return (
		<>
			{/* open the modal button */}
			<OpenButton handleOpen={handleClickOpen} />

			{/* Modal wrapper */}
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				fullWidth={true}
				maxWidth={"md"}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{props.pageName}</DialogTitle>
				<DialogContent>
					<ModalContent rows={rows} _id={props._id} />
				</DialogContent>
				<CloseButton handleClose={handleClose} />
			</Dialog>
		</>
	);
};

export default Modal;

// I think __v acts weird if its 0, not including isRequired seems to fix it
Modal.propTypes = exact({
	fullScreen: propTypes.bool.isRequired,
	cellID: propTypes.string.isRequired,
	__v: propTypes.number,
	_id: propTypes.string.isRequired,
	hidden: propTypes.bool.isRequired,
	meta: propTypes.exact({ template: propTypes.string.isRequired }).isRequired,
	pageName: propTypes.string.isRequired,
	source: propTypes.array.isRequired,
	websitePath: propTypes.array.isRequired,
	websitePathLength: propTypes.number.isRequired,
});

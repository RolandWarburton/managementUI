import React, { useState } from "react";
import "../../styles/styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Collapsible } from "./styles";

function DropdownButton(collapsed) {
	return (
		<FontAwesomeIcon
			onClick={(e) => {
				e.preventDefault();
			}}
			className="has-text-right icon"
			icon={collapsed ? faAngleUp : faAngleDown}
			color={"white"}
		/>
	);
}

/**
 *
 * @param {*} props
 * @param {*} title
 * @param {*} thingToRender
 * @param {*} dataToRenderThingWith
 */
function Dropdown({ children }) {
	const [collapsed, setCollapsed] = useState(true);
	// const [title, setTitle] = useState(`Open ${props.title}`);
	const [title, setTitle] = useState(`Open temp`);
	const [loading, setLoading] = useState(false);

	// const handleCollapser = (event) => {
	// 	event.preventDefault();
	// 	setCollapsed(!collapsed);

	// };

	React.useEffect(() => {
		// const content = event.target.closest("div").querySelector(".content");
		// if (collapsed) {
		// 	content.className = "content collapsed";
		// 	setTitle(`Open ${props.name}`);
		// } else {
		// 	content.className = "content";
		// 	setTitle(`Close ${props.name}`);
		// 	loadHistoryData();
		// }
		// console.table(collapsed);
	}, [collapsed]);

	return (
		<Collapsible>
			<a
				href={"/"}
				onClick={(e) => {
					e.preventDefault();
					setCollapsed(!collapsed);
				}}
			>
				{title} <DropdownButton collapsed={collapsed} />
			</a>

			<div className={collapsed ? "content collapsed" : "content"}>
				{/* this displays the children of Dropdown */}
				{!loading && children}
			</div>
		</Collapsible>
	);
}

export default Dropdown;

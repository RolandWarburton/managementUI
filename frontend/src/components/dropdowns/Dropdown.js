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

function Dropdown({ children, title, loading }) {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<Collapsible>
			<a
				href={"/"}
				onClick={(e) => {
					e.preventDefault();
					setCollapsed(!collapsed);
				}}
			>
				{collapsed ? `Open ${title}` : `Close ${title}`}
				<DropdownButton collapsed={collapsed} />
			</a>

			<div className={collapsed ? "content collapsed" : "content"}>
				{/* this displays the children of Dropdown */}
				{!loading && children}
			</div>
		</Collapsible>
	);
}

export default Dropdown;

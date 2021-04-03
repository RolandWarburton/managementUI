import React from "react";

import { ViewPage } from "./ViewPage";

export default {
	title: "Form/viewPage",
	component: ViewPage,
};

const Template = (args) => <ViewPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	_id: "5fd5783bf4500b001f1144a7",
	pageName: "testPage",
	source: [{ url: "test.com", remote: true }],
	meta: { template: "template.ejs" },
	websitePath: ["path", "here"],
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };

import React, { useState, useEffect, Suspense } from "react";
import { Formik, useFormik, Field, FieldArray } from "formik";
import { Button, Container, Paper } from "@material-ui/core";
import Input from "../formikComponents/Input";
import { makeStyles } from "@material-ui/core/styles";
import fetchDataPromise from "../helpers/fetchDataPromise";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
// import FieldArray from "../formikComponents/fieldArray";
import * as Yup from "yup";

const validationSchema = Yup.object({
	_id: Yup.string().required("Required"),
});

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(2),
			// width: theme.spacing(16),
			// height: theme.spacing(16),
		},
	},
	textField: {
		width: "100%",
	},
}));

const Form = styled.form`
	width: 100%;
`;

const submitHandler = async (page) => {
	const { pageName, websitePath, hidden, source, meta } = page;
};

export default function ViewPage(props) {
	const classes = useStyles();
	const [page, setPage] = useState({});
	const [initialPageState, setInitialPageState] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	// Each field gets its own state
	// const [pageSource, setPageSource] = useState([]);
	// const [pageSource, setPageSource] = useState([]);

	// ##──── on load ───────────────────────────────────────────────────────────────────────────
	useEffect(() => {
		const url = `/api/v1/watch/page?_id=${props.match.params.id}`;
		// const url = `/api/v1/watch/page?pageName=testPage&page=0&per_page=1`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				setPage(data[0]);
				setInitialPageState(data[0]);
				return data;
			});
	}, [props.match.params.id]);

	// ##──── refresh page fields when the page changes ─────────────────────────────────────────
	useEffect(() => {
		if (loading) return; // Don't run while loading

		// Update the pageSource
		// const elements = [];
		// for (let i = 0; i < page.source.length; i++) {
		// 	const source = page.source[i];
		// 	elements.push(<div key={i}>{source.url}</div>);
		// }
		// setPageSource([...pageSource, ...elements]);

		// Update the form
		formik.setFieldValue("_id", page._id);
		formik.setFieldValue("pageName", page.pageName);
		formik.setFieldValue("websitePath", page.websitePath.join("/"));
		formik.setFieldValue("template", page.meta.template);
	}, [page]);

	const formik = useFormik({
		initialValues: {
			_id: "waiting",
			pageName: "waiting",
			websitePath: "waiting",
			template: "waiting",
			version: "waiting",
			hidden: "waiting",
			source: ["aaa", "bbb"],
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<Paper className={classes.root} elevation={3} elementtype="section">
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					formik.handleSubmit();
				}}
			>
				<TextField
					fullWidth
					id="_id"
					name="_id"
					label="page ID"
					value={formik.values._id}
					onChange={formik.handleChange}
					error={formik.touched._id && Boolean(formik.errors._id)}
					helperText={formik.touched._id && formik.errors._id}
				/>
				<TextField
					fullWidth
					id="pageName"
					name="pageName"
					label="Page Name"
					value={formik.values.pageName}
					onChange={formik.handleChange}
					error={formik.touched.pageName && Boolean(formik.errors.pageName)}
					helperText={formik.touched.pageName && formik.errors.pageName}
				/>
				<TextField
					fullWidth
					id="websitePath"
					name="websitePath"
					label="Website Path"
					value={formik.values.websitePath}
					onChange={formik.handleChange}
					error={formik.touched.websitePath && Boolean(formik.errors.websitePath)}
					helperText={formik.touched.websitePath && formik.errors.websitePath}
				/>
				<TextField
					fullWidth
					id="template"
					name="template"
					label="Template"
					value={formik.values.template}
					onChange={formik.handleChange}
					error={formik.touched.template && Boolean(formik.errors.template)}
					helperText={formik.touched.template && formik.errors.template}
				/>

				<FieldArray name="source">
					{({ move, swap, push, insert, unshift, pop, form }) => {
						return <div>poop</div>;
					}}
				</FieldArray>
			</Form>
		</Paper>
	);
}

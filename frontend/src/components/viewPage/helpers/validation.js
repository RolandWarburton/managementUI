import * as Yup from "yup";
const validationSchema = Yup.object({
	_id: Yup.string().length(24).required("Required"),
	pageName: Yup.string().min(1).max(32).required("Required"),
	websitePath: Yup.array()
		.of(Yup.string().min(1).max(32).required("Required"))
		.min(1)
		.max(32)
		.required("Required"),
	__v: Yup.number().min(1).required("Required"),
	meta: Yup.object()
		.shape({ template: Yup.string().min(1).max(32).required("Required") })
		.required("Required"),
	source: Yup.array()
		.of(
			Yup.object().shape({
				url: Yup.string().min(1).max(256).required("Required"),
				remote: Yup.boolean().required("required"),
			})
		)
		.required("Required"),
});

// websitePath: Yup.array().of(
// 		Yup.object().shape({
// 			url: Yup.string().min(1).max(128),
// 			remote: Yup.boolean(),
// 		})
// 	),

export default validationSchema;

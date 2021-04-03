import * as Yup from "yup";
const validationSchema = Yup.object({
	_id: Yup.string().required("Required"),
});

export default validationSchema;

// The function is BSD licensed. I didn't write it, and im not too bothered to understand it right now.
function diff(obj1, obj2) {
	const result = {};
	if (Object.is(obj1, obj2)) {
		return undefined;
	}
	if (!obj2 || typeof obj2 !== "object") {
		return obj2;
	}
	Object.keys(obj1 || {})
		.concat(Object.keys(obj2 || {}))
		.forEach((key) => {
			if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
				result[key] = obj2[key];
			}
			if (typeof obj2[key] === "object" && typeof obj1[key] === "object") {
				const value = diff(obj1[key], obj2[key]);
				if (value !== undefined) {
					result[key] = value;
				}
			}
		});
	return result;
}

const updateRequest = (_id, key, value) => {
	const url = `/api/v1/watch/update/${key}`;

	const bodyObject = {
		filter: {
			_id: _id,
		},
		update: {
			[key]: value,
		},
	};

	const headers = { "Content-Type": "application/json" };
	const body = JSON.stringify(bodyObject);
	console.log(body);

	return fetch(url, { method: "PATCH", headers, body });
};

const handleSubmit = async (values, initialPage, setSubmitting) => {
	// If we change one field, say pageName...
	// Then the resulting difference will be an object with {pageName: "newString"}
	const difference = diff(initialPage, values);

	const names = Object.keys(difference);

	const jobs = [];
	// console.log(`The difference is: ${JSON.stringify(difference, null, 2)}`);

	for (let i = 0; i < names.length; i++) {
		const fieldName = names[i];

		switch (fieldName) {
			case "source": {
				// Then we need to extract an array of each URL like for example: ["a.com", "b.com"]
				const initialPageUrls = initialPage.source.map((n) => n.url);
				const newPageUrls = values.source.map((n) => n.url);

				// Find out which values did we remove from the array by subtracting newPageUrls from initialPageUrls
				const filteredRemoved = initialPageUrls.filter((n) => !newPageUrls.includes(n));

				// Then subtract the removed values from the values array
				const adjustedSourcesArray = values.source.filter(
					(n) => !filteredRemoved.includes(n)
				);

				// Then we can make the request
				const req = updateRequest(values._id, fieldName, adjustedSourcesArray);
				jobs.push(req);
				break;
			}
			case "websitePath": {
				// Then we need to extract an array of each URL like for example: ["website", "path"]
				const initialPathSegments = initialPage.websitePath;
				const newPathSegments = values.websitePath;

				// Find out which values did we remove from the array by subtracting newPathSegments from initialPathSegments
				const filteredRemoved = initialPathSegments.filter(
					(n) => !newPathSegments.includes(n)
				);

				// Then subtract the removed values from the values array
				const adjustedFieldPathArray = values.websitePath.filter(
					(n) => !filteredRemoved.includes(n)
				);

				console.log(adjustedFieldPathArray);

				// Then we can make the request
				const req = updateRequest(values._id, fieldName, adjustedFieldPathArray);
				jobs.push(req);
				break;
			}
			default: {
				// regular non-FieldArray based fields play nicely and tend to work ootb :)
				const req = updateRequest(values._id, fieldName, difference[fieldName]);
				jobs.push(req);
				break;
			}
		}
	}

	// wait for everything to finish and we are good!
	// TODO some error validation IF a promise responds with a non 200 status!
	await Promise.all(jobs);
	setSubmitting(false);
};

export default handleSubmit;

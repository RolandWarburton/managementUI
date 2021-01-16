const modalSaveButtonCallback = async (values, _id, name) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	const filter = { _id: _id };

	const update = { [name]: newValue };

	// print them out for debugging
	console.log(`filter: ${JSON.stringify(filter)}`);
	console.log(`update: ${JSON.stringify(update)}`);

	// construct the body request
	const body = {
		filter: filter,
		update: update,
	};

	// send the post request
	const url = `/api/v1/watch/update/${_id}`;
	const response = await fetch(url, {
		method: "PATCH",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		body: JSON.stringify(body),
	});

	if (response.status !== 200) throw new Error("Response status was not 200");
	else return await newValue;
};

export { modalSaveButtonCallback };

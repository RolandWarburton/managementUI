const modalSaveButtonCallback = async (values, _id, name) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;
	if (!firstValue && !currentValue && !newValue) {
		throw new Error("An error occurred while saving");
	}

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

const modalUndoButtonHandler = async (values, _id, name) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	// construct the url
	const url = `/api/v1/watch/update/${_id}`;

	// mongo style filter
	const filter = {
		_id: _id,
		[name]: currentValue,
	};

	// mongo style update
	const update = {
		$set: {
			[name]: firstValue,
		},
	};

	// create the options for the request
	const options = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			filter: filter,
			update: update,
		}),
	};

	// do the request
	try {
		const response = await fetch(url, options);

		if (response.status !== 200) throw new Error("Response status was not 200");
		return currentValue;
	} catch (err) {
		return newValue;
	}
};

export { modalSaveButtonCallback, modalUndoButtonHandler };

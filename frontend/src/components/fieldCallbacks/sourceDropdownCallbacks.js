const sourceSaveButtonHandler = async (values, _id, name) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	// construct the url
	const url = `/api/v1/watch/update/${_id}`;

	// mongo style filter
	const filter = {
		_id: _id,
		"source.url": currentValue,
	};

	// mongo style update
	const update = {
		$set: { "source.$.url": newValue, "source.$.remote": true },
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

		if (response.status !== 200) {
			throw new Error("Response status was not 200");
		} else {
			return newValue;
		}
	} catch (err) {
		return err;
	}
};

const sourceUndoButtonHandler = async (values, _id, name) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	// construct the url
	const url = `/api/v1/watch/update/${_id}`;

	// mongo style filter
	const filter = {
		_id: _id,
		"source.url": currentValue,
	};

	// mongo style update
	const update = {
		$set: {
			"source.$.url": firstValue,
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

const sourceDeleteButtonHandler = async (values, _id, name) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	// construct the url
	const url = `/api/v1/watch/update/${_id}`;

	// mongo style filter
	const filter = {
		_id: _id,
	};

	// https://muffinman.io/blog/json-stringify-removes-undefined/
	const replacer = (key, value) => (typeof value === "undefined" ? null : value);

	// mongo style update
	const update = {
		$pullAll: {
			source: [{ url: currentValue, remote: true }],
		},
	};

	// create the options for the request
	const options = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(
			{
				filter: filter,
				update: update,
			},
			replacer
		),
	};

	// do the request
	try {
		const response = await fetch(url, options);
		if (response.status !== 200) {
			throw new Error("Response status was not 200");
		}
		return true;
	} catch (err) {
		return false;
	}
};

const sourceAddButtonHandler = async (values, _id, name) => {
	// extract the values
	const { firstValue, currentValue, newValue } = values;

	// construct the url
	const url = `/api/v1/watch/update/source/${_id}`;

	// create the options for the request
	const options = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			url: newValue,
			remote: true,
		}),
	};

	// do the request
	try {
		const response = await fetch(url, options);

		if (response.status !== 200) {
			throw new Error("Response status was not 200");
		} else {
			return newValue;
		}
	} catch (err) {
		return err;
	}
};

export {
	sourceSaveButtonHandler,
	sourceUndoButtonHandler,
	sourceAddButtonHandler,
	sourceDeleteButtonHandler,
};

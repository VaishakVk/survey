const Ajv = require("ajv");

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const validate = (schema, json) => {
	const validate = ajv.compile(schema);
	const valid = validate(json);
	if (!valid) return { status: false, message: validate.errors };
	else return { status: true };
};

module.exports = {
	validate,
};

const { createSuccessResponse, createErrorResponse } = require("../utils/responseHelper");

exports.getBfhl = (req, res) => {
    return res.status(200).json({ operation_code: 1 });
};

exports.postBfhl = (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json(createErrorResponse("Invalid input: 'data' must be an array"));
        }

        const numbers = data.filter((item) => !isNaN(Number(item)));
        const alphabets = data.filter((item) => isNaN(Number(item)) && typeof item === "string" && item.length === 1);

        const highest_alphabet =
            alphabets.length > 0
                ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))]
                : [];

        return res.status(200).json(
            createSuccessResponse({
                numbers,
                alphabets,
                highest_alphabet,
            })
        );
    } catch (error) {
        return res.status(500).json(createErrorResponse(error.message));
    }
};
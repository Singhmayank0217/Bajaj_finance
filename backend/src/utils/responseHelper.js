exports.createSuccessResponse = (data) => ({
    is_success: true,
    user_id: "mayank_singh_17092002",  
    email: "mayank_singh@example.com",
    roll_number: "22BCS10205",
    ...data,  
});


exports.createErrorResponse = (message = "An error occurred") => ({
    is_success: false,
    user_id: "mayank_singh_17092002",
    email: "mayank@example.com",
    roll_number: "22BCS10205",
    error: message,
    numbers: [],
    alphabets: [],
    highest_alphabet: [],
});
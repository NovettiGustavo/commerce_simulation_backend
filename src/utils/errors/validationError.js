const AppError = require("./appError");

class ValidationError extends AppError{
    constructor(message){
        super(message, 400);
        this.name = "ValidationError"
    }
}

module.exports = ValidationError
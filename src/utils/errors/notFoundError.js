const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor(message){
        super(message,404);
        this.name = "NotFoundError";
    }
}

module.exports = NotFoundError;
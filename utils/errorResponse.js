class ErrorResponse extends Error{
    constructor(statusCode, message){
        super(message) // this sets the super class message to = the message of the class we created ie Error.message == ErrorResponse.message
        this.statusCode = statusCode
    }
}
export default ErrorResponse
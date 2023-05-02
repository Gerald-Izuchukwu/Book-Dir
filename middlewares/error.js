function errorHandler(err, req, res, next){
    console.log(err.name);
    console.log(err.message); //this is what is shown to the client
    // console.log(err.stack.red);
    console.log(err);

    // test for mongoose incorrectly formatted id
    if(err.name === 'CastError'){
        return res.status(404).json({
            success: false,
            error: 'Request not found'
        })
    }

    // Test for validationError
    if(err.name === 'ValidationError' ){
        return res.status(404).json({
            success: false,
            error: 'Kindly fill all the required fields with the correct information',
            errorValue: Object.values(err.errors).map(value=>value.message)
        })
    }

    // Test for MongoError
    if(err.name === "MongoError"){
        return res.status(404).json({
            success: false,
            error: 'Sorry, there was an error connecting to the database'
        })
    }

    // Test For Mongo Server Error
    if(err.name === "MongoServerError" && err.code === 11000){
        return res.status(400).json({
            success: false,
            error: "You are entering a field that is already in the datbase",
            errorValue: err.keyValue
        })

    }

    if(err.name === 'MongoServerError' && err.code === 121){
        return res.status(400).json({
            success: false,
            error: "You are entering a document that exceeds the maximum file size"
        })
    }
    
    
    // if(err.name === 'Error'){
    //     return res.status(404).json({
    //         success: false,
    //         message: 'We could not process your request'
    //     })
    // }
    
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message
    })
}

export default errorHandler

    // if (err instanceof mongoose.Error.ValidationError) {
    //     console.log('-Validation Error:', err.message);
    // }
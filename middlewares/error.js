import mongoose from "mongoose";
function errorHandler(err, req, res, next){
    console.log(err.name);
    console.log(err.message); //this is what is shown to the client
    console.log(err.stack.red);

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
            error: 'Kindly fill all the required fields with the correct information'
        })
    }

    // Test for MongoError
    if(err.name === "MongoError"){
        return res.status(404).json({
            success: false,
            error: 'Sorry, there was an error connecting to the database'
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
export const loggerMiddleware = ((req, res, next)=>{
    console.log(`${new Date().toISOString()} - ${req.method}:${req.url}`)
    console.log(`${req.method} - ${req.protocol}: ${req.get('host')}${req.originalUrl}` );
    next()
})
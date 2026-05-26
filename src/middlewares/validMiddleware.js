module.exports = (schema, property ='body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false
        });

        if (error) {
            return res.status(400).json({
                message: error.details.map(e => e.message)
            })
        }

        req[property] = value;

        next()
    }
}
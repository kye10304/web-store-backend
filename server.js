require('./src/config/env');
const app = require('./app')
const { connectDB } = require('./sequelize');
const port = process.env.PORT || 3000;

(async () => {
    try {await connectDB()
    app.listen(port, () => console.log(`App successfully running on ${port} port`));
} catch (err) {
    console.error(err)
}
})()


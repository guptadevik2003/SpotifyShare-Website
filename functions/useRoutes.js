module.exports = ({ app, express }) => {
    express.useRoutes = async () => {

        // Import Routes
        const apiRoute = require(`../routes/apiRoute`)
        const rootRoute = require(`../routes/rootRoute`)

        // Using Routes
        app.use('/api', apiRoute)
        app.use('/', rootRoute)

    }
}

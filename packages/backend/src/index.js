//custom imports
import express from 'express'
import graphqlHTTP from 'express-graphql';
import serialize from 'serialize-javascript'
import path from 'path'
import fs from 'fs'
//custom imports
import schema from './graphql/schema';
import models from './models'

const app = express();
// configurations
const PORT = process.env.PORT || 4000

// React
const serverRenderer = (req, res) => {
    const obj = {
        name: 'Marvelous Wololo',
        required: true
    }
    fs.readFile(path.resolve(__dirname, '..', 'dist', 'index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred')
        }
        let dat = data;
        dat = data.replace(
            '<head>',
            `<head><meta name="csrf-token" content="">`
        );
        dat = dat.replace(
            '</body>',
            `<script>window.__INITIAL__DATA__ = ${serialize(obj)}</script></body>`
        )
        return res.send(dat)
    })
}

// server config
app.use('/graphql', graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    graphiql: true,
    context: {
        models,
    }
}))
);
app.use(express.static(path.resolve(__dirname, '..', 'dist', 'public')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('*', serverRenderer);
models.sequelize.sync({ force: true })
    .then(() => {
        app.listen({ port: PORT }, () => {
            console.log(`🚀 Server listening on port ${PORT}`);
        });
    })


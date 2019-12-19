var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var serveStatic = require('serve-static');
var cors = require("cors");
const morgan = require('morgan');
const loginRoutes = require("./server/routes/login");
const catalogosRoutes = require("./server/routes/catalogos");
const techosRoutes = require("./server/routes/techos_financieros");
const carteraRoutes = require("./server/routes/cartera_proyectos");
const fichaTecnica = require("./server/routes/ficha_tecnica");
const oficiosRoutes = require("./server/routes/oficios");
const history = require('connect-history-api-fallback');


app = express();
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// })
app.use(cors())
app.use(morgan('tiny'));
app.use(history())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/server/login", loginRoutes);
app.use("/server/catalogos", catalogosRoutes);
app.use("/server/techos_financieros", techosRoutes);
app.use("/server/cartera_proyectos", carteraRoutes);
app.use("/server/ficha_tecnica", fichaTecnica);
app.use("/server/oficios", oficiosRoutes);



app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 8081;
app.listen(port);
// app.listen('5000','0.0.0.0',()=>{
//     console.log('server started 5000');
// });

// console.log(process.env.NODE_ENV)
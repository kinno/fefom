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
const jwt = require('jsonwebtoken');
const config = require('./server/config');
var moment = require('moment');


app = express();
app.use(cors())
app.use(morgan('tiny'));
app.use(history())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var requestTime = function (req, res, next) {
//   // console.log(req.originalUrl)
//   if(req.originalUrl != '/server/login/'){
//     // console.log("Entro al middleware")
//     if(!req.headers.authorization) {
//       return res
//         .status(403)
//         .send({message: "Tu petici�n no tiene cabecera de autorizaci�n"});
//     }
    
//     var token = req.headers.authorization.split(" ")[1];
//     var payload = jwt.decode(token, config.TOKEN_SECRET);

//     // console.log(payload.exp, moment().unix())
    
//     if(payload.exp <= moment().unix()) {
//        return res
//          .status(401)
//           .send({message: "El token ha expirado"});
//     }
    
//     req.user = payload.sub;
//     next();
//   }else{
//     next()
//   }
   
//   };
// app.use(requestTime) 
app.use("/server/login", loginRoutes);
app.use("/server/catalogos", catalogosRoutes);
app.use("/server/techos_financieros", techosRoutes);
app.use("/server/cartera_proyectos", carteraRoutes);
app.use("/server/ficha_tecnica", fichaTecnica);
app.use("/server/oficios", oficiosRoutes);



//app.use(serveStatic(__dirname + "/dist"));
//console.log(__dirname)
//app.listen(port);
 app.listen('8081','0.0.0.0',()=>{
     console.log('server started 8081');
});

// console.log(process.env.NODE_ENV)

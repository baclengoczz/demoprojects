const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require("dotenv").config();

const database = require("./config/database");
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
const systemConfig = require("./config/systems");


database.connect();
const app = express();

app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

const port = process.env.PORT;
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');



//flash
app.use(cookieParser('PHAMTHUNGA'));
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());


//end flash
//app locals variaable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));
routeAdmin(app);
route(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
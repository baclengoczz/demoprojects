const systemConfig = require("../../config/systems")


const dashboardRoutes =require("./dashboard.route")
const productdRoutes =require("./product.route")




module.exports =(app)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin;

    app.use(PATH_ADMIN +'/dashboard',dashboardRoutes);
    app.use(PATH_ADMIN +'/products',productdRoutes);   

}
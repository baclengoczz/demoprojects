module.exports.createPost =(req,res,next) =>{
    if(!req.body.title){
        req.flash("error",`Vui lòng nhập tiêu đè !`);
        res.redirect("back");
        return;
    }
    next();
}
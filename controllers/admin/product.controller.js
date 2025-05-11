//[GET] /admin/products
const Product = require("../../models/product.model")
const systemConfig = require("../../config/systems")
const filterStatusHelper = require("../../helper/filterstatus")
const searchHelper = require("../../helper/search")
const paginationHelper = require("../../helper/pagination");
const {
    model
} = require("mongoose");


module.exports.index = async (req, res) => {
    //console.log(req.query.status)


    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false,
    };
    //Bộ lọc
    if (req.query.status) {
        find.status = req.query.status;
    }
    //end bộ lọc
    //phan trang
    const search = searchHelper(req.query);
    if (search.regex) {
        find.title = search.regex
    }
    const totalProducts = await Product.countDocuments();
    const objectPagination = paginationHelper({
            currentPage: 1,
            limitItem: 4
        },
        req.query,
        totalProducts
    );
    //phan trang
    //dùng hàm limit để giới hạn phần tử 1 trang và skip qua các sản phẩm 
    const products = await Product.find(find)
        .sort({
            position: "desc"
        })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    console.log(products);
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: search.keyword,
        pagination: objectPagination
    });
};
//[PATCH] /admin/products/change-status/:status/:id

//luồng chạy thay đổi trạng thái BE
//lấy ra trạng thái khi người dùng click cùng với id của item 
//đợi database chỉnh sửa trạng thái bằng hàm updateOne
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({
        _id: id
    }, {
        status: status
    });
    req.flash("success", "Cập nhật trạng thái thành công");
    res.redirect("back");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: "active"
            });
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "inactive":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: "inactive"
            });
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);

            break;
        case "delete-all":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            req.flash("success", `Xóa ${ids.length}  sản phẩm thành công`);

            break;
        case "delete-real":
            await Product.deleteOne({
                _id: id
            });
            req.flash("success", `Xóa ${ids.length}  sản phẩm thành công`);
            break;

        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({
                    _id: id
                }, {
                    position: position
                });
            }
            req.flash("success", `Thay đổi vị trí ${ids.length} thành công`);

            break;
        case "undelete":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                deleted: false,
                deletedAt: new Date()
            });
            req.flash("success", `Khôi phục ${ids.length}  sản phẩm thành công`);

            break;


        default:
            break;
    }
    res.redirect("back");


}
//[DELETE] /admin/products/delete/:id

//tù raotow qua controol nhận id bên fe gửi lên rồi đợi xóa xong trả ra giao dien
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    // await Product.deleteOne({_id:id}); cái này xóa vĩnh viễn
    await Product.updateOne({
        _id: id
    }, {
        deleted: true,
        deletedAt: new Date()
    }); //xóa tạm thời ko mất trong DB
    req.flash("success", "Xóa sản phẩm thành công");

    res.redirect("back");

}
//[GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới một sản phẩm"
    });
}
//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
        const newPosition = await Product.countDocuments();
        req.body.position = newPosition + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};
//[GET] /admin/products/undelete/:id

module.exports.undelete = async (req, res) => {
    const find = {
        deleted: true
    };
    const product = await Product.find(find);
    res.render("admin/pages/products/undelete", {
        pageTitle: "Khôi Phục Sản Phẩm",
        product: product
    });
}
//[POST] /admin/products/undelete/:id
module.exports.undeleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({
        _id: id
    }, {
        deleted: false,
        deletedAt: new Date()
    }); //xóa tạm thời ko mất trong DB
    req.flash("success", "Khôi phục sản phẩm thành công");

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}
//[DELETE] admin/products/delete/:id
module.exports.deleteItemReal = async (req, res) => {
    const id = req.params.id;
    await Product.deleteOne({
        _id: id
    });
    req.flash("success", "Xóa sản phẩm thành công");
    res.redirect("back");

}
//[GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            _id: req.params.id,
            deleted: false
        }
        const product = await Product.findOne(find);
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });
    } catch (error) {
        req.flash("danger", "Không tồn tại sản phẩm này");
        res.redirect(`${systemConfig.prefixAdmin}/products`);

    }
}
//[PATCH] admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    try {
        await Product.updateOne({
            _id: id
        }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
        
    } catch (error) {
        req.flash("error", "Cập nhật sản phẩm thất bại");

    }
    res.redirect("back");
};
//[GET] admin/product/detail/:id
module.exports.detail = async (req,res) =>{
    try {
        const id=req.params.id;
    const find ={
        _id: id,
        deleted: false
    }
    const product = await Product.findOne(find);
    res.render("admin/pages/products/detail",{
        pageTitle:product.title,
        product:product
    })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
       
    }

}
module.exports =(objectPagination,query,totalProducts) =>{
        //Phân trang BE
    //tạo 1 obj vs các tham số
    // const objectPagination ={
    //     currentPage :1,
    //     limitItem:4
    // }
    //check xem client có truyền page ko
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }
    //có thì cập nhật lại trang hiện tại
    //tính toán để phân trang
    objectPagination.skip=(objectPagination.currentPage - 1) *objectPagination.limitItem;
   // const totalProducts = await Product.countDocuments();
    objectPagination.totalPage=Math.ceil(totalProducts/objectPagination.limitItem)

    return objectPagination;

}
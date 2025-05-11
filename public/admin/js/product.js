
const buttonChangeStatus= document.querySelectorAll("[ button-change-status]");
if(buttonChangeStatus.length > 0){
    const formChangesStatus=document.querySelector("#form-change-status")
    const path =formChangesStatus.getAttribute("data-path")
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const statusCurrent=button.getAttribute("data-status");
            let statusChange= statusCurrent == "active" ? "inactive" : "active";
            const id=button.getAttribute("data-id");
            console.log(`${statusChange} -${id}`);
            const action =path + `/${statusChange}/${id}?_method=PATCH`;
            formChangesStatus.action=action;

            formChangesStatus.submit();
        })
    })
}
//xóa sản phẩm fe xóa mềm
  
const buttonDeleteItems =document.querySelectorAll("[buttonDeleteItem ]");
if(buttonDeleteItems.length >0){
    const formDeleteItems=document.querySelector("#form-delete-id");
    const path=formDeleteItems.getAttribute("data-path");
    buttonDeleteItems.forEach(button =>{
        button.addEventListener("click",() =>{
            const isConfirm=confirm("Bạn chắc chắn muốn xóa sản phẩm này không ?");
            if(isConfirm){
                const idItem=button.getAttribute("data-id");
                const action=path +`/${idItem}?_method=DELETE`;
                formDeleteItems.action=action;
                formDeleteItems.submit();
            }
        })
    })
}
// xóa thật
const buttonDeleteRealItems =document.querySelectorAll("[buttonDeleteItem ]");
if(buttonDeleteRealItems.length >0){
    const formDeleteRealItems=document.querySelector("#form-delete-real-id");
    const path=formDeleteRealItems.getAttribute("data-path");
    buttonDeleteRealItems.forEach(button =>{
        button.addEventListener("click",() =>{
            const isConfirm=confirm("Bạn chắc chắn muốn xóa sản phẩm này không ?");
            if(isConfirm){
                const idItem=button.getAttribute("data-id");
                const action=path +`/${idItem}?_method=DELETE`;
                formDeleteRealItems.action=action;
                formDeleteRealItems.submit();
            }
        })
    })
} 
//khoi phuc 
const  buttonUndeleteItem=document.querySelectorAll("[buttonUndeleteItem]");
if(buttonUndeleteItem.length >0){
    const formUndeleteItems=document.querySelector("#form-undelete-id");
    const path=formUndeleteItems.getAttribute("data-path");
    buttonUndeleteItem.forEach(button =>{
        button.addEventListener("click",()=>{
            const isConfirm=confirm("Bạn chắc chắn muốn khôi phục sản phẩm này không ?");
            if(isConfirm){
                const idItem=button.getAttribute("data-id");
                const action=path +`/${idItem}?_method=PATCH`;
                formUndeleteItems.action=action;
                formUndeleteItems.submit();
            }
            
        })
    })
}

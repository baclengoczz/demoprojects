const ButtonStatus=document.querySelectorAll("[button-status]");
let url=new URL(window.location.href);
if(ButtonStatus.length >0){
    ButtonStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const Status=button.getAttribute("button-status");
            if(Status){
                url.searchParams.set("status",Status);
            }
            else{
                url.searchParams.delete("status");
            }
            window.location.href=url.href;
        });
    });
}

const fromSearch =document.querySelector("#from-search");
if(fromSearch){
    let url=new URL(window.location.href);
    fromSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword=e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href=url.href;
    })
}
//lấy button bắt sự kiện
//lọc rồi lấy aribiu của button roi gán lại page roi chuyển tiếp qua href
const buttonsPagination=document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
    let url=new URL(window.location.href); 
    buttonsPagination.forEach(button => {
        button.addEventListener("click",()=>{
            
            const page=button.getAttribute("button-pagination");
            
            url.searchParams.set("page",page);
            window.location.href=url.href;

        })   
        

    })
}

//sk fe thay đôit trạng thái cho nhiều sp

//bắt sự kiện cho check box
const changeboxMulti=document.querySelector("[checkbox-multi]");
if(changeboxMulti){
    const checkboxAll = changeboxMulti.querySelector("input[name=checkall]");
    const checksId= changeboxMulti.querySelectorAll("input[name=id]");
    checkboxAll.addEventListener("click",()=>{
        if(checkboxAll.checked){
            checksId.forEach(input =>{
                input.checked=true;
            })
        }
        else{
            checksId.forEach(input =>{
                input.checked=false;
        })}
})
    checksId.forEach(input=>{
        input.addEventListener("click",() => {
          const countChecked=changeboxMulti.querySelectorAll("input[name=id]:checked").length;
          if(countChecked==checksId.length){
                checkboxAll.checked=true;
          }
          else{
            checkboxAll.checked=false;
          }
        })
    })     
}
// ket thuc checkboxx
//bat sk form
const formChangeMulti=document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();


        const changeboxMulti=document.querySelector("[checkbox-multi]");
        const inputChecked=changeboxMulti.querySelectorAll("input[name=id]:checked");

        const typeChange=e.target.elements.type.value;
        
        if(typeChange=="delete-all"){
            const isConfirm=confirm("bạn chắc muốn xóa những item này");
            if(!isConfirm){
                return;
            }
        }
        if(typeChange=="delete-real"){
            const isConfirm=confirm("bạn chắc muốn xóa những item này");
            if(!isConfirm){
                return;
            }
        }
        if(typeChange=="undelete"){
            const isConfirm=confirm("bạn chắc muốn khôi phục những item này");
            if(!isConfirm){
                return;
            } 
        }
        
        if(inputChecked.length>0){
            let ids=[];
            const inputIds= formChangeMulti.querySelector("input[name=ids]");
            inputChecked.forEach(input =>{
                const id=input.value
               
                if(typeChange =="change-position"){
                    const position= input.closest("tr").querySelector("input[name=position]").value;
                    ids.push(`${id}-${position}`);
                }
                else{
                     ids.push(id);
                }
                inputIds.value=ids.join(", ");


                formChangeMulti.submit();
            })
        }
        else{
            alert("Vui lòng chọn một bản ghi !")
        }

    })
}
//logic xử lí thông báo
const showAlert=document.querySelector("[show-alert]");
if(showAlert){
    const time=parseInt(showAlert.getAttribute("data-time"));
    const closeAlert=showAlert.querySelector("[close-alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    },time);
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    });
}
// preview ảnh
const uploadImage = document.querySelector(" [upload-image]");
    if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    
    uploadImageInput.addEventListener("change", (e) => {
    const file = e.target. files[0];
    if(file) {
    uploadImagePreview.src = URL.createObjectURL(file);
    }
    });
}
//sort
const sort=document.querySelector("[sort]");
const sortSelect=sort.querySelector("[sort-select]");
const sortClear=sort.querySelector("[sort-clear]");

if(sort){
    let url=new URL(window.location.href); 
    sort.addEventListener("change",e =>{
        const value=e.target.value;
        const[sortKey,sortValue]=value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);
        window.location.href=url.href;
 
    })
}
sortClear.addEventListener("click",()=>{
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href=url.href;
});
sortKey=url.searchParams.get("sortKey");
sortValue=url.searchParams.get("sortValue");
const stringForm=`${sortKey}-${sortValue}`;
console.log(stringForm);
if(sortKey&&sortValue){
    const optionSelected=sort.querySelector(`option[value='${stringForm}']`);
    optionSelected.selected=true;
}
//endsort

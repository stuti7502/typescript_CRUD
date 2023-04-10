let pId = document.getElementById('id') as HTMLInputElement;
let pName = document.getElementById('pname') as HTMLInputElement;
let pImage: any = document.getElementById('photo');
let pPrice = document.getElementById('price') as HTMLInputElement;
let pDescription = document.getElementById('description') as HTMLInputElement;
let dropdown = document.getElementById('dropdowncur') as HTMLInputElement;
let payment= document.querySelector('input[name="paym"]:checked') as HTMLInputElement;
let offers: any= document.querySelectorAll('input[name="offers"]:checked').values;
var markedCheckbox:any = document.getElementsByName('offers');
let editIndex: any;
let editImage: any;
var offers_array:any = '';

var product: any;
if (localStorage.getItem("productArray") == null) {
  product = [];
} else {
  product = JSON.parse(localStorage.getItem("productArray")!);
}
//validating form
function validateForm(){
    let id = (document.querySelector("#id") as HTMLInputElement).value;
    let pname = (document.querySelector("#pname") as HTMLInputElement).value;
    let price = (document.querySelector("#price") as HTMLInputElement).value;
    let photo = (document.querySelector("#photo") as HTMLInputElement).value;
    let pdescription = (document.querySelector("#description") as HTMLInputElement).value;
    let flag = true;
    if(id==""){
      document.getElementById('errorid')!.textContent = "ID required"
      flag = false; 
     } 
    else if(isNaN(Number(id))){
      document.getElementById('errorid')!.textContent = "Please write number"
      flag = false;
    }else if(id !== ""){
      document.getElementById('errorid')!.textContent = ""
    }
    if(Number(id) < 0){
      document.getElementById('errorid')!.textContent = "ID cannot be less than 0"
      flag = false;
    }
    for (let prod of product) {
        if (id === prod.id) {
          document.getElementById('errorid')!.textContent = "ID already exists";
          flag = false;
        }
    }
    
    if(pname==""){
      document.getElementById('errorname')!.textContent = "Name required"
      flag = false;    
    }else if(pname !== ""){
      document.getElementById('errorname')!.textContent = ""
    }
    if(price==""){
      document.getElementById('errorprice')!.textContent = "Price required"
      flag = false;    
    }else if(isNaN(Number(price))){
      document.getElementById('errorprice')!.textContent = "Please write number"
      flag = false;
    }else if(price !== ""){
      document.getElementById('errorprice')!.textContent = ""
    }
    if(Number(price) < 0){
      document.getElementById('errorprice')!.textContent = "Price cannot be less than 0"
      flag = false;
    }
    if(pdescription==""){
      document.getElementById('errordesc')!.textContent = "Description required"
      flag = false;    
    }else if(pdescription !== ""){
      document.getElementById('errordesc')!.textContent = ""
    }
    if(photo==""){
      document.getElementById('errorphoto')!.textContent = "Photo required"
      flag = false;    
    }else if(photo !== ""){
      document.getElementById('errorphoto')!.textContent = ""
    }
    
    return flag;
}
function imageValidation() {
  var fileInput = document.getElementById("photo");
  var filePath = (fileInput as HTMLInputElement).value;
   var allowedExtensions = /(\.jpeg|\.jpg|\.png|\.jfif)$/i;
   if (!allowedExtensions.exec(filePath)) {
   alert("Only jpeg , jpg , jfif and png file allowed");
   (fileInput as HTMLInputElement).value = "";
   return false;
   }
  }
//validation2
function validateForm2(){
  let id = (document.querySelector("#modal_id") as HTMLInputElement).value;
  let pname = (document.querySelector("#modal_pname") as HTMLInputElement).value;
  let price = (document.querySelector("#modal_price") as HTMLInputElement).value;
  let description = (document.querySelector("#modal_description") as HTMLInputElement).value;
  if(id==""){
    alert("id required");
    return false;    
  }else if(isNaN(Number(id))){
    alert("Enter number in id")
    return false;
  
  }
  if(pname==""){
    alert("Name required");
    return false;    
  }
  if(price==""){
    alert("Price required");
    return false;    
  }else if(isNaN(Number(price))){
    alert("Enter number in price")
  }
  if(description==""){
    alert("Description required");
    return false;    
  }
  
  return true;
}
//inserting data
function addData() {
    
  for (var checkbox of markedCheckbox) {  
    if (checkbox.checked){  
      // console.log(checkbox.value + ' ')
      offers_array += checkbox.value + ', '; } 
  }  
  let payment= document.querySelector('input[name="paym"]:checked') as HTMLInputElement;
  if(validateForm()){
  var product: any;
  if (localStorage.getItem('productArray') == null) {
    product = [];
  } else {
    product = JSON.parse(localStorage.getItem('productArray')!);
  }
  let reader = new FileReader();
  reader.readAsDataURL(pImage.files[0]);
  reader.addEventListener('load', () => {
  let photos = reader.result;
  
  product.push({
    id: pId.value,
    name: pName.value,
    price: pPrice.value,
    description: pDescription.value,
    photo: photos,
    pay: payment.value,
    drop: dropdown.value,
    // bankd: bank,
    // new_userd: new_user,
    // couponsd: coupons
    offers: offers_array
  });
  
  localStorage.setItem('productArray', JSON.stringify(product));

  location.reload();
  location.href = 'index1.html'
  
});
}
}
console.log(offers)

viewData();

//displaying data
function viewData(){
  
    let product;
    if (localStorage.getItem("productArray") == null) {
        product = [];
    }
    else {
        product = JSON.parse(localStorage.getItem("productArray")!);
    }
    let html = "";
    product.forEach(function (element: any, index: any) {
        html += `<tr>`
        html += `<td>${element.id}</td>`
        html += `<td>${element.name}</td>`
        html += `<td>${element.drop} ${element.price}</td>`
        html += `<td><div style="width:150px; height:100px;"><img style="max-width: 100%; max-height:100%;" src="${element.photo}"/></div></td>`
        html += `<td>${element.pay}</td>`
        html += `<td>${element.offers}</td>`
        html += `<td>${element.description}</td>`
        html += `<td><button type="button" class="btn btn-primary" onclick='updateData(${index})' data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>`
        html += `<td><button type="button" class="btn btn-danger" onclick='deleteData(${index})'><i class="fa fa-trash" aria-hidden="true"></i></button></td>`
        html += `</tr>`


    document.getElementById("product-list")!.innerHTML = html;


    });
  
}

// delete data
function deleteData(index: any){
  let product;
  if (localStorage.getItem("productArray") == null) {
      product = [];
  }
  else {
      product = JSON.parse(localStorage.getItem("productArray")!);
  }
  let deleted = confirm("Do you want to delete this product " + product[index].name + "?");
  if(deleted == true){
    product.splice(index, 1)
    localStorage.setItem('productArray', JSON.stringify(product));
    location.reload();
  }
}

function clear1(){
  (document.querySelector("#id") as HTMLInputElement).value = '';
  (document.querySelector("#pname") as HTMLInputElement).value = '';
  (document.querySelector("#price") as HTMLInputElement).value = '';
  (document.querySelector("#photo") as HTMLInputElement).value = '';
  (document.querySelector("#description") as HTMLInputElement).value = '';
  (document.querySelector("#dropdowncur") as HTMLInputElement).value = '';
  (document.querySelector('input[name="paym"]:checked') as HTMLInputElement).value ='';
}
// take the data itno the form
function updateData(index: any) {
    let productInfo = JSON.parse(localStorage.getItem('productArray')!)[index];
    (document.getElementById('modal_id') as HTMLInputElement).value = productInfo.id;
    (document.getElementById('modal_pname') as HTMLInputElement).value = productInfo.name;
    editImage = productInfo.photo;
    (document.getElementById('modal_price') as HTMLInputElement).value = productInfo.price;
    (document.getElementById('modal_description') as HTMLInputElement).value = productInfo.description;
    (document.getElementById("modal_dropdowncur") as HTMLInputElement).value = productInfo.drop;
    
    editIndex = index;
    console.log(editIndex);
    (document.getElementById(productInfo.pay) as HTMLInputElement).checked = true;
}

function charCount(textarea: any){
  var initial = 500;
  var length: any = textarea.value.length;
  document.getElementById('word-count')!.textContent = initial - length + ' '

}
//after changing, update the data
function saved()
{
  if(validateForm2() == true){
    let idx = editIndex;
    let id = (document.getElementById('modal_id') as HTMLInputElement).value;
    let name = (document.getElementById('modal_pname') as HTMLInputElement).value;
    let photo: any = document.getElementById('modal_photo');
    let price = (document.getElementById('modal_price') as HTMLInputElement).value;
    let description = (document.getElementById('modal_description') as HTMLInputElement).value;
    let pay = (document.querySelector('input[name="paym"]:checked') as HTMLInputElement).value;
    let drop = (document.getElementById("modal_dropdowncur") as HTMLInputElement).value;
    console.log(photo.value)
    if (photo.value != '') {
      
      let reader = new FileReader();
      reader.readAsDataURL(photo.files[0]);
      // console.log(currency)
      reader.addEventListener('load', () => {
        let url = reader.result;
        let updatedData = { id, name, drop, price, description, photo: url, pay};
        console.log(updatedData)
        let productInfo = JSON.parse(localStorage.getItem('productArray')!);
        productInfo[idx] = updatedData;
        localStorage.setItem('productArray', JSON.stringify(productInfo));
      });
    } else {
      let updatedData = { id, name, drop, price, description, photo: editImage, pay};
      console.log(updatedData)
      let productInfo = JSON.parse(localStorage.getItem('productArray')!);
      console.log(idx);
      productInfo[idx] = updatedData;
      localStorage.setItem('productArray', JSON.stringify(productInfo));
    }
    editIndex = null;
    // location.reload();
}
}
viewData();
//search by product id
function searchid(){
  var input: any, filter, table: any, tr, td, td1, i, txtValue, txtValue1;
  input = document.getElementById("searchbar");
  filter = input.value.toUpperCase();
  table = document.getElementById("sort-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    td1 = tr[i].getElementsByTagName("td")[3];
    if (td || td1) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

//sort the columns
function asc(n: any){
  var table: any, rows: any, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("sort-table");
  switching = true;
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
    
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
    
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
          
        }
        
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  var down = document.getElementById('down')!;
  var up  = document.getElementById('up')!;
  var down1 = document.getElementById('down1')!;
  var up1 = document.getElementById('up1')!;
  var down2 = document.getElementById('down2')!;
  var up2 = document.getElementById('up2')!;
  if(dir == "asc" && n == 0){
    down.style.display = "none";  up.style.display = "inline";
    down1.style.display = "inline"; up1.style.display = "inline";
    down2.style.display = "inline"; up2.style.display = "inline";
  }else if(dir == "desc" && n==0){
    down.style.display = "inline";  up.style.display = "none";
    down1.style.display = "inline"; up1.style.display = "inline";
    down2.style.display = "inline"; up2.style.display = "inline";
}else if(dir == "asc" && n==1){
    down.style.display = "inline";  up.style.display = "inline";
    down1.style.display = "none"; up1.style.display = "inline";
    down2.style.display = "inline"; up2.style.display = "inline";
}else if(dir == "desc" && n==1){
    down.style.display = "inline";  up.style.display = "inline";
    down1.style.display = "inline"; up1.style.display = "none";
    down2.style.display = "inline"; up2.style.display = "inline";
}else if(dir == "asc" && n==2){
    down.style.display = "inline";  up.style.display = "inline";
    down1.style.display = "inline"; up1.style.display = "inline";
    down2.style.display = "none"; up2.style.display = "inline";
}else if(dir == "desc" && n==2){
    down .style.display= "inline";  up.style.display = "inline";
    down1.style.display = "inline"; up1.style.display = "inline";
    down2.style.display = "inline"; up2.style.display = "none";
  }else{
    down.style.display = "inline";  up.style.display = "inline";
    down1.style.display = "inline"; up1.style.display = "inline";
    down2.style.display = "inline"; up2.style.display = "inline";    
  }     
}

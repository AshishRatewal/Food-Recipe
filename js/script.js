let enterDish = document.querySelector("#enterDish");
let imgLink = document.querySelector("#imgLink");
let foodRecipe = document.querySelector("#foodRecipe");
let ingredients = document.querySelector("#ingredients");
let quantity = document.querySelector("#quantity");
let units = document.querySelector("#units");
let selectedItem = document.querySelector("#selectedItem");
let showIngredients = document.querySelector("#showIngredients");
let err = document.getElementsByClassName("err");
let ingreErr = document.getElementsByClassName("ingreErr");
let addDishData = document.querySelector("#addDishData");
let addIngredientsData = document.querySelector("#addIngredientsData");
let finalArray = [],ingreArray = [],cloneArray = [],getAddIngreObject,creatTd,storeTemp,addDishGet;
let showDataIngredients = document.querySelector("#showDataIngredients");
let getAllDishes = document.querySelector("#getAllDishes");
let firstForm = document.querySelector(".firstForm");
let secondForm = document.querySelector(".secondForm");
let goBack = document.querySelector(".goBack");
let showAllData = document.querySelector("#showAllData");
let searchItemsHere = document.querySelector("#searchItemsHere");
let updateIngre = document.querySelector("#updateIngre");
let updateDishData = document.querySelector("#updateDishData");
let finalUpdateIngre = document.querySelector("#finalUpdateIngre");
let addmoreIngre = document.querySelector("#addmoreIngre");
let redirectBtn = document.querySelector("#redirectBtn");
// Add Ingredients Data
function getIngre(){
    event.preventDefault();
    if(ingredients.value == "" || ingredients.value == null){
        ingreErr[0].innerHTML = "Please Enter Ingredients";
    }else if(quantity.value == "" || quantity.value == null){
        ingreErr[0].innerHTML = "";
        ingreErr[1].innerHTML = "Please Enter The Quantity of Ingredients";
    }else if(units.value == "" || units.value == null){
        ingreErr[1].innerHTML = "";
        ingreErr[2].innerHTML = "Please Select any Units";
    }else{
        ingreErr[2].innerHTML = "";
        getAddIngreObject = addIngre(ingredients.value,quantity.value,units.value);
        ingreArray.push(getAddIngreObject);
        ingredients.value = quantity.value = units.value = "";
        // It's Show time
        showTime();
    }
}
// show time function
let showTime = () => {
    showDataIngredients.innerHTML = "";
    let row = "";
    for(let i = 0;i<ingreArray.length;i++){
        row+=`<tr><td>${i+1}</td>
            <td>${ingreArray[i].ingreName}</td>
            <td>${ingreArray[i].qty}${ingreArray[i].unit}</td>
            <td><input type="button" class='btn btn-warning' value="Edit" onclick="editData(${i})"/></td>
            <td><input type="button" class='btn btn-danger' value="Delete" onclick="dltData(${i})"/></td></tr>`;
    }
    showDataIngredients.innerHTML += row;
}
// dltData
// delete work station work
let dltData = (v) => {
    event.preventDefault();
    ingreArray.splice(v,1);
    showTime();
}
// editdata
let makeData;
let indexValue;
let editData = (v) => {
    // setting the values into filed from array
    ingredients.value = ingreArray[v].ingreName;
    quantity.value = ingreArray[v].qty;
    units.value = ingreArray[v].unit;
    addIngredientsData.style.display = "none";
    updateIngre.style.display = "block";
    indexValue = v;
}
updateIngre.addEventListener('click',() => {
    event.preventDefault();
    console.log(indexValue);
    makeData = addIngre(ingredients.value,quantity.value,units.value);
    console.log(makeData , "We got this and val is: ",indexValue);
    ingreArray.splice(indexValue,1,makeData);
    addIngredientsData.style.display = "block";
    updateIngre.style.display = "none";
    ingredients.value = quantity.value = units.value = "";
    showTime();
});
// store data in localstorage of Enter Dish
function finalSubmit() {   
    event.preventDefault();
    if(ingreArray.length >= 1){
        if(enterDish.value == "" || enterDish.value == null){
            err[0].innerHTML = "Please Enter any Dish!";
        }else if(imgLink.value == "" || imgLink.value == null){
            err[0].innerHTML = "";
            err[1].innerHTML = "Please Enter the image link!";
        }else if(foodRecipe.value == "" || foodRecipe.value == null){
            err[1].innerHTML = "";
            err[2].innerHTML = "Please Enter the Food Recipe";
        }else{  
            err[2].innerHTML = "";
            storeTemp = getFinalData(enterDish.value,imgLink.value,foodRecipe.value,ingreArray);
            addDishGet = localStorage.getItem("addDish");
            if(addDishGet != null){
                let parseData = JSON.parse(addDishGet);
                for(let j=0;j<parseData.length;j++){
                    finalArray.push(parseData[j]);
                }
                finalArray.push(storeTemp);
                localStorage.setItem('addDish',JSON.stringify(finalArray));
                finalArray.splice(0,finalArray.length);
                alert("Data Stored");
            }else{
                finalArray.push(storeTemp);
                localStorage.setItem('addDish',JSON.stringify(finalArray));
                alert("Data Stored");
                console.log("We dont have found any entry of addDish that's why we created");
                finalArray.splice(0,finalArray.length);
            }
            ingreArray.splice(0,ingreArray.length);
            enterDish.value = imgLink.value = foodRecipe.value = "";
            showDataIngredients.innerHTML = "";
        }
    }
}
function addIngre(ingreName,qty,unit){
    return {ingreName,qty,unit,}
}
function getFinalData(dishName,imgLink,foodRecipe,Ingredients) {
    return {dishName,imgLink,foodRecipe,Ingredients,}
}
// getalldata
getAllDishes.addEventListener('click',() => {
    showAllData.innerHTML = ""; 
    firstForm.style.display = "none";
    secondForm.style.display = "block";
    getAllDataLocalStorage();
});
let getAllDataLocalStorage = () => {
    showAllData.innerHTML = ""; 
    let parseGetDataLocal = JSON.parse(localStorage.getItem('addDish'));
    if(parseGetDataLocal != null){
        for(let m=0;m<parseGetDataLocal.length;m++){
            cloneArray.push(parseGetDataLocal[m]);
        }
        // putting data into their field
        let row,ingreTemp;
        for(let i=0;i<cloneArray.length;i++){
            let tempData = cloneArray[i];
            row = "<tr>";
            row += `  
                <td>${i+1}</td>  
                <td>${tempData.dishName}</td>        
                <td>${tempData.imgLink}</td>
                <td>${tempData.foodRecipe}</td>
            `;
            ingreTemp = tempData.Ingredients;
            row += "<td><ol>";
            for(let j=0;j<ingreTemp.length;j++){
                row += `<li>&nbsp;${ingreTemp[j].ingreName}&nbsp;&nbsp;${ingreTemp[j].qty}&nbsp;&nbsp;${ingreTemp[j].unit}</li>`;  
            }
            row += `</ol></td>  
                <td><button class="btn btn-success" onclick='editBtn(${i})'>Edit</button></td>        
                <td><button class="btn btn-danger" onclick='dltBtn(${i})'>Delete</button></td>
            `;
            row += "</tr>";
            showAllData.innerHTML += row;
        }
        cloneArray.splice(0,cloneArray.length);
    }
}
// goBack
goBack.addEventListener('click',() => {
    showAllData.innerHTML = ""; 
    firstForm.style.display = "block";
    secondForm.style.display = "none";
});
// dltBtn delete work station
let dltBtn = (v) => {
    let makeArray = [];
    let parseGetDataLocal = JSON.parse(localStorage.getItem('addDish'));
    for(let m=0;m<parseGetDataLocal.length;m++){
        makeArray.push(parseGetDataLocal[m]);
    }
    makeArray.splice(v,1);
    localStorage.setItem('addDish',JSON.stringify(makeArray));
    getAllDataLocalStorage();
    makeArray.splice(0,makeArray.length);
}
// edit complete Work station -----------------------------*******
let setIngredients,setVIndex,editIngreArray = [],clonningArray=[];
let editBtn = (v) => {
    setVIndex = v;
    console.log(setVIndex , "We got from final edit btn")
    addmoreIngre.style.display = redirectBtn.style.display = "block";
    addIngredientsData.style.display = "none";
    let parseGetDataLocal = JSON.parse(localStorage.getItem('addDish'));
    for(let m=0;m<parseGetDataLocal.length;m++){
        clonningArray.push(parseGetDataLocal[m]);
    }
    // print value into their fields
    enterDish.value = clonningArray[v].dishName;
    imgLink.value = clonningArray[v].imgLink;
    foodRecipe.value = clonningArray[v].foodRecipe;
    selectedItem.value = "Dish Name: " + clonningArray[v].dishName;
    // making ingredients array
    setIngredients = clonningArray[v].Ingredients;
    for(k=0;k<setIngredients.length;k++){
        editIngreArray.push(setIngredients[k]);
    }
    // to show data
    finalShowData();
    firstForm.style.display = updateDishData.style.display= "block";
    secondForm.style.display = addDishData.style.display = "none";
}
// add more items
addmoreIngre.addEventListener('click', () => {
    // editIngreArray
    event.preventDefault();
    if(ingredients.value == "" || ingredients.value == null){
        ingreErr[0].innerHTML = "Please Enter Ingredients";
    }else if(quantity.value == "" || quantity.value == null){
        ingreErr[0].innerHTML = "";
        ingreErr[1].innerHTML = "Please Enter The Quantity of Ingredients";
    }else if(units.value == "" || units.value == null){
        ingreErr[1].innerHTML = "";
        ingreErr[2].innerHTML = "Please Select any Units";
    }else{
        ingreErr[2].innerHTML = "";
        let storeTemp = addIngre(ingredients.value,quantity.value,units.value);
        editIngreArray.push(storeTemp);
        console.log(editIngreArray , "Add More button clicked");
        ingredients.value = quantity.value = units.value = "";
        finalShowData();
    }
});
// final edit data start
let getVvalue,storeDataTemp;
let finalEdit = (v) => {
    event.preventDefault();
    ingredients.value = editIngreArray[v].ingreName;
    quantity.value = editIngreArray[v].qty;
    units.value = editIngreArray[v].unit;
    addmoreIngre.style.display = "none";
    finalUpdateIngre.style.display = "block";
    getVvalue = v;
    console.log(getVvalue, "The index we want",editIngreArray);
}
finalUpdateIngre.addEventListener('click',() => {
    event.preventDefault();
    storeDataTemp = addIngre(ingredients.value,quantity.value,units.value);
    editIngreArray.splice(getVvalue,1,storeDataTemp);
    addmoreIngre.style.display = "block";
    finalUpdateIngre.style.display = "none";
    ingredients.value = quantity.value = units.value = "";
    finalShowData();
});
// ************end
// final delete data
let finalDlt = (v) => {
    event.preventDefault();
    editIngreArray.splice(v,1);
    finalShowData();
}
// finall Update Button working here 
updateDishData.addEventListener('click',() => {
    event.preventDefault();
    let updateEnterDish = enterDish.value;
    let updateImgLink = imgLink.value;
    let updateFoodRecipe = foodRecipe.value;
    let makingObj = getFinalData(updateEnterDish,updateImgLink,updateFoodRecipe,editIngreArray);
    clonningArray.splice(setVIndex,1,makingObj);
    localStorage.setItem('addDish',JSON.stringify(clonningArray));
    alert("You'r Data has been updated");
    addmoreIngre.style.display = updateDishData.style.display = redirectBtn.style.display = "none";
    addIngredientsData.style.display = addDishData.style.display = "block";
    enterDish.value = imgLink.value = foodRecipe.value = showDataIngredients.innerHTML = "";
    editIngreArray.splice(0,editIngreArray.length);
    clonningArray.splice(0,clonningArray.length);
});
// final data show into their filed
let finalShowData = () => {
    let row = "";
    showDataIngredients.innerHTML = "";
    console.log(editIngreArray , "Reachec in finalShowData");
    for(let i = 0;i<editIngreArray.length;i++){
        row+=`<tr><td>${i+1}</td>
            <td>${editIngreArray[i].ingreName}</td>
            <td>${editIngreArray[i].qty}${editIngreArray[i].unit}</td>
            <td><input type="button" class='btn btn-warning' value="Edit" onclick="finalEdit(${i})"/></td>
            <td><input type="button" class='btn btn-danger' value="Delete" onclick="finalDlt(${i})"/></td></tr>`;
    }
    showDataIngredients.innerHTML += row;
}
// clearAllData from localStorage
let clearAllData = () => {
    let localData = JSON.parse(localStorage.getItem('addDish'));
    let isTrue = confirm("Do you want to clear all data");
    if(localData){
        if(isTrue){
            localStorage.clear();
            getAllDataLocalStorage();
        }
    }
}
// cancle button
redirectBtn.addEventListener('click', () => {
    firstForm.style.display = "none";
    secondForm.style.display = "block";
});
// Search Bar
searchItemsHere.addEventListener("keyup",() => {
    let searchValue = searchItemsHere.value;
    let searchLowerCase = searchValue.toLowerCase();
    let getTableTR = showAllData.getElementsByTagName("tr");
    for(let i=0;i<getTableTR.length;i++){
        let tableTD = getTableTR[i].getElementsByTagName("td")[4];
        if(tableTD){
            let txtValue = tableTD.innerText;
            if(txtValue.toLowerCase().indexOf(searchLowerCase) > -1) {
                getTableTR[i].style.display = "";
            }else{
                getTableTR[i].style.display = "none";
            }
        }
    }
});
// ********************************** SELECTION THE ITEMS ********************************* //

// variables :

const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const line_through = 'linethrough';


let Task = []; 
let id = 0;
let Card = [];

let number=1;

let Alert = document.querySelector('.alert');

let cardcontainer = document.querySelector('.card-input');


// edit options:

let editElement;
let editFlag = false;
let editID = "";
let list_id;



// **************************************** LOCAL STORAGE ************************************* //

let card_data = localStorage.getItem('newCard');


if(card_data){
    
    Card = JSON.parse(card_data);
    
    loadCard(Card);
}



function loadCard(array){
    
   array.forEach((item)=>{
       addCardconstruct(item.Card_name,item.id);
   })   
}


//**************************************** EVENT HANDLERS *************************************//


// ****************** ADD NEW CARD ***************



let plus_Button = document.querySelector('.plus-button-img');

let input_card = document.querySelectorAll('.card-input');

//plus_Button.addEventListener('click',add_card);

document.querySelector('.card-container').addEventListener('click',add_card);


// ***************** ADD NEW TASK ****************


/*input_card.forEach((item)=>{
    item.addEventListener('keyup',add_task);
});*/


document.querySelector('.card-container').addEventListener('keyup',add_task);


// ***************** remove Card *****************


document.querySelector('.card-container').addEventListener('click',(e)=>{
    
    remove_card(e.target);
        
});


// ********** check/delete/edit *****************

    
document.querySelector('.card-container').addEventListener('click',(e)=>{
        
    let target = e.target;
        
        
    if(target.attributes.job.value == "complete"){
        
        complete_task(target);
        
        }
    
   else if(target.attributes.job.value == "delete"){
       
        removetask_fromcard(target);

    }
    else if (target.attributes.job.value == "edit"){
        edit_Task(target);
    }
    
        localStorage.setItem('newCard',JSON.stringify(Card));
        console.log("i'm saved");

    

    })




//**************************************** FUNCTIONS ***********************************//


// displaying tasks from local storge:

function display_Task(){
    
    // selectiong the uls
    
    let uls = document.querySelectorAll('.card-list');
    
    uls_array = Array.from(uls);

    // iteration through the ul array and getting the task object from task proprety of the object which is an array, and inserting the task the li into task with the function addtask_tocard which insert it into the ul.
    
    for(var key in uls_array){
                
       Card[key].task.forEach((item)=>{
                      
           addtask_tocard(item.newtask,item.id,item.done,item.trash,uls_array[key]);
           
           // saving to localstorage:
           
          localStorage.setItem('newCard',JSON.stringify(Card));
        
       });
        
    }  

}

display_Task();

// add task to card:

function addtask_tocard(newtask,id,done,trash,ul,flag){
    
    if(!flag){
                    
    const Done = done ? check : uncheck;
    const Line = done ? line_through: "";
    
        
    let card_item_content = `<li class="card-list-item" ><i class="far ${Done}" job="complete" id="${id}"></i><p class="${Line} paragraph">${newtask}</p><i class="fas fa-edit" job="edit"></i><i class="far fa-trash-alt" job="delete" id="${id}"></i></li>`;
                
    ul.insertAdjacentHTML('beforeend',card_item_content);
        
    }
}


// complete task :

function complete_task(target){
    
    console.log(target);
    
    target.classList.toggle(check);
    target.classList.toggle(uncheck);
    target.nextElementSibling.classList.toggle(line_through);
    
    let card_id = target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
    
    
    Card.forEach(item=>{
    if(item.id == card_id){
        
           let index = item.task.findIndex(x=> x.newtask == target.parentElement.innerText);
        
            item.task[index].done = item.task[index].done ? false : true;
        
        }
    })
    
    /*let tasks = Card[card_id].task;
    
    let index1 = tasks.findIndex(x => x.newtask == target.parentElement.innerText);
    
    tasks[index1].done = tasks[index1].done ? false : true;
    
    console.log(card_id);
    console.log(tasks);
    console.log(index1);
    console.log(target.parentElement.parentElement.parentElement.parentElement);*/
    
    };

// CONSTRUCT  CARD From local storage 


function addCardconstruct(card_name,id){
    
    let card_Container = document.querySelector('.card-container');
    let card = document.createElement('div');
    let card_Title = document.createElement('h2');
    let card_Header = document.createElement('div');
    let card_List_container = document.createElement('div');
    let card_List_ul = document.createElement('ul');
    let card_input = document.createElement('input');
    let Button_next = document.createElement('a');
    let Button_next_img = document.createElement('img');
    let cancel_Icon = document.createElement('img');
    let submit_btn = document.createElement('button');

    
    card.classList.add('card');
    card.setAttribute('id',id);
    card_Header.classList.add('card-header');
    card_List_container.classList.add('card-list-container');
    card_input.classList.add('card-input');
    card_input.setAttribute('id',id);
    card_Title.classList.add('card-title');
    Button_next.setAttribute('class','plus-button');
    Button_next_img.setAttribute('src','pics/plus2.png');
    Button_next_img.classList.add('plus-button-img');
    cancel_Icon.classList.add('cancel-Icon');
    cancel_Icon.setAttribute('job','cancel');
    submit_btn.classList.add('submit-btn');
    submit_btn.textContent = 'submit';

    cancel_Icon.setAttribute('src','pics/iconfinder_cross_4115230.png');
    card_List_ul.classList.add('card-list');
    card_List_ul.setAttribute('id',id);
    
    
    card_Title.textContent = card_name;
    card_Header.append(card_Title); 
    card_Header.append(cancel_Icon);
    card.appendChild(card_Header);
    card_List_container.append(card_List_ul);
    card.appendChild(card_List_container);
    card.appendChild(card_input);
    card_Container.appendChild(card);
    Button_next.append(Button_next_img);
    card_Container.append(Button_next);
    card.appendChild(submit_btn);
    
}

 
// delete addtask icons:

function delete_add_icons(){
    
    let icons = document.querySelectorAll('.plus-button-img');
    
    let icons_array = Array.from(icons);
    
    for( let i = 0; i < icons_array.length-1; i++){
      //  icons_array[i].parentNode.style.display = 'none';        
        icons_array[i].parentNode.remove();        
    }
    
}


delete_add_icons();


//remove task:
function removetask_fromcard(target){
    
    
    let ul_id = target.parentElement.parentElement.getAttribute('id');
        
    let p_text = target.parentElement.childNodes[1];
    
    console.log(target.parentElement.parentElement);

    target.parentElement.remove();
    
    console.log(ul_id);

    
 // EXPLANATION !! im using findIndex instead of index because we got an array of objects, and we need the index of the specified task that we clicked on and findIndex does that with a condition.
    
    console.log(p_text);
    
    //let index = Card[ul_id].task.findIndex(x => x.newtask == p_text.innerText);
    
    Card.forEach(item=>{
        if(item.id == ul_id){
           let index = item.task.findIndex(x=> x.newtask == p_text.innerText);
            item.task.splice(index,1);
            item.array_test.splice(index,1);
        }
    })
    
    
    
   /* console.log(index);
    
    let task = Card[ul_id].task;
        
    let array_test = Card[ul_id].array_test;
    
    console.log("this is the index: "+index);
    
    console.log("this is the text element: "+target.parentElement.innerText);
    
    
    if(index > -1 ){
    task.splice(index,1); 
    array_test.splice(index,1);
        
    }*/
    

    
}


// alert message:

function displayAlert(text,action){
     Alert.childNodes[1].textContent= text;

    Alert.classList.add(`alert-${action}`);
    
    setTimeout(function(){
        
             Alert.childNodes[1].textContent= '';

            Alert.classList.remove(`alert-${action}`);

    },1200);
}


function focus_title_input(){
    
    document.querySelector('.card-title-input').focus();
}


// remove Card from the card Array and  dom: 


function remove_card(target){
    

    if(target.attributes.job.value == 'cancel'){
    
        console.log("im here: "+target.parentElement.childNodes[0].textContent);
        
        console.log("im here: "+target.parentElement.childNodes);
        
        let card__name = target.parentElement.childNodes[0].textContent;
        
        let index = Card.findIndex(x=> x.Card_name == card__name);
        
        console.log(index);

        target.parentElement.parentElement.style.display = 'none';
        
        //target.parentElement.parentElement.remove();
            
        if(index > -1 ){
       Card.splice(index,1);
        }
    }
    
}


// check for task duplicates :

function checkForDuplicates1(array,obj){
    
    array.push({obj});
    
    let set = new Set(array.map(item => JSON.stringify(item)));
    
    // if the element added to the array is duplicated delete it :
            
    if(set.size !== array.length){
        array.pop();
        return true;
    }
    
    else if(set.size == array.length){
        return false;
    } 
}

// edit Card title :

function Edit_title(){
    

document.addEventListener('click',(e)=>{
        
            if(e.target.className == 'card-title'){

            console.log(e.target.textContent);

            let container = e.target.parentElement;
                
            let div_id = e.target.parentElement.parentElement;
                
            let value = e.target.innerHTML;

            console.log(value);

            let Card_title =`<input type="text" class="card-title-input" id="titleinput">`;
                                
            e.target.remove();

            container.insertAdjacentHTML('afterbegin', Card_title);
                
            container.childNodes[0].value = value;

            let h2 = document.createElement('h2');
                
            h2.classList.add('card-title-input');

            container.childNodes[0].addEventListener('keyup',(e)=>{

                    if(e.keyCode == 13 && !e.shiftKey){

                        console.log(container.childNodes[0]);
                        console.log(h2);
                        

                if(container.childNodes[0].value){
                    
                    console.log('yeeea');
                    
                    console.log(container.childNodes);
                    
                    h2.textContent = container.childNodes[0].value.toUpperCase();
                    
                    container.insertAdjacentHTML('afterbegin', `<h2 class="card-title">${container.childNodes[0].value.toUpperCase()}</h2>`);
                    
                    container.childNodes[1].remove();
                    
                    let new_title = h2.textContent;

                    Card[div_id.id].Card_name = new_title;
                    
                    localStorage.setItem('newCard',JSON.stringify(Card));
                    
            }

            }

    })
            
        }
        
    })
    
}

Edit_title();

// add card :


function add_card(e){
    
    if(e.target.attributes.class.value == 'plus-button-img'){
    
    //id = Card.length;
        
    id = new Date().getTime().toString();   
        
   // index = Card.findIndex(x=>x.Card_name == e.target.parentElement.previousElementSibling.childNodes[0].childNodes[0]);  
   // console.log(index);    
  //  console.log(e.target.parentElement.previousElementSibling);    
    
    // creating elements:
    
    let card_Container = document.querySelector('.card-container');
    let card = document.createElement('div');
    let card_title_input = document.createElement('input');
    let card_Title = document.createElement('h2');
    let card_Header = document.createElement('div');
    let card_List_container = document.createElement('div');
    let card_List_ul = document.createElement('ul');
    let card_input = document.createElement('input');
    let Button_next = document.createElement('a');
    let Button_next_img = document.createElement('img');
    let cancel_Icon = document.createElement('img');
    let submit_btn = document.createElement('button');
      
    card_title_input.classList.add('card-title-input');
    card_title_input.setAttribute('placeholder','enter title');
    card_title_input.setAttribute('id','titleinput');
    card.classList.add('card');
    card.setAttribute('id',id);
    card_Header.classList.add('card-header');
    card_List_container.classList.add('card-list-container');
    card_input.classList.add('card-input');
    card_input.setAttribute('id',id);
    card_Title.classList.add('card-title');
    Button_next.setAttribute('class','plus-button');
    Button_next_img.setAttribute('src','pics/plus2.png');
    Button_next_img.classList.add('plus-button-img');
    Button_next.setAttribute('id',number);
    cancel_Icon.classList.add('cancel-Icon');
    cancel_Icon.setAttribute('job','cancel');
    submit_btn.classList.add('submit-btn');
    submit_btn.textContent = 'submit';
    cancel_Icon.setAttribute('src','pics/iconfinder_cross_4115230.png');
    card_List_ul.classList.add('card-list');
    card_List_ul.setAttribute('id',id);     
    card_Header.append(card_title_input);   

    // appending elements:
    
    card_Header.append(card_Title); 
    card_Header.append(cancel_Icon);
    card.appendChild(card_Header);
    card_List_container.append(card_List_ul);
    card.appendChild(card_List_container);
    card.appendChild(card_input);
    card.appendChild(submit_btn);
    card_Container.appendChild(card);
    Button_next.append(Button_next_img);
    
    card_Container.append(Button_next);
        
    //e.target.parentElement.style.display = 'none';
        
    e.target.parentElement.remove();
    
    // adding title:
    
    card_title_input.addEventListener('keyup',(e)=>{
        
        if(e.keyCode == 13){
            
            if(card_title_input.value ){
        
                card_Title.append(card_title_input.value.toUpperCase());
                        
                Card.push({
                    Card_name :card_title_input.value.toUpperCase() ,  
                    newCard : card,
                    id : id,
                    task : [],
                    array_test : [] 
                })      
              
                console.log(card_title_input.value.toUpperCase());  
                
                // recent code:  
                
                //card_title_input.style.display = 'none';   
                    
                //new code :
                
                card_title_input.remove();  
                
                // save to local storage :
            
                localStorage.setItem('newCard',JSON.stringify(Card));
                
                
                displayAlert('Card added successfuly','success');

              
            }else if(!card_title_input.value){
                      
                displayAlert('please enter title','danger');
        }
          
        }
        
    })
    
        // focus on title input:
    
        focus_title_input();
        
    }
    
}

// add task :

function add_task(e){
    
    if(e.target.className == "card-input"){
        
        if(e.keyCode == 13){     
            
            console.log('im'+e.target.className);
             
            let text_content = e.target.value;
         
            let Input= e.target;
         
            e.target.getAttribute('id');   
          
            let Ul = Input.parentElement.childNodes[1].childNodes[0];
                           
            if(text_content && !editFlag){
        
        // add task to the document page:

                for(var key in Card){
            
            
                    if(Card[key].id == Input.getAttribute('id')){
                                
                        let Card_task = Card[key].task; 
                        
                        let array_test = Card[key].array_test;
                                                
                        
                        // checkfor duplicates :                                    
                        
                        if(!Array.isArray(Card_task) || !Card_task.length){
                            
                            // Empty array :
                            
                            console.log('array is empty!');
                            
                            checkForDuplicates1(array_test,text_content);
                            
                           
                            addtask_tocard(text_content,id,false,false,Ul);
                            
                             
                                                        
                            Card_task.push({
                                
                            newtask : text_content,
                            id : id,
                            done : false,
                            trash : false,
                            
                            });
                                                                                 
                            localStorage.setItem('newCard',JSON.stringify(Card)); 
                            
                            console.log("i'm accessed!!!");
                            
                            e.target.value = null; 
                            
                            const editbtn = document.querySelector('.fa-edit');
                            editbtn.addEventListener('click',edit_Task);
                            
                           
                            
                        }else{
                            
                            // Array is not empty ! :
                        
                            if(checkForDuplicates1(array_test,text_content)){
                            
                            // duplicated item detected ! :
                                
                                displayAlert('duplicated item !','danger');
                                e.target.value = null; 
                                
                            }else{
                                
                                addtask_tocard(text_content,id,false,false,Ul);

                                Card_task.push({

                                newtask : text_content,
                                id : id,
                                done : false,
                                trash : false,

                                });


                                localStorage.setItem('newCard',JSON.stringify(Card)); 
                                console.log("i'm accessed!!!");
                                e.target.value = null;
                                
                            }
                            
                        }
                            
                    }
                              
                }
             
            } else if(text_content && editFlag){
                
                // select elements:
                
                const submit_btn = editElement.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling;
                
                const input = editElement.parentElement.parentElement.parentElement.nextElementSibling;
                
                // edit element:
                
                console.log(editElement);
                
                editElement.textContent = text_content;
                
                console.log(editElement.parentElement.parentElement.childNodes);
                
                // set back to default:
                
                submit_btn.textContent = 'submit';
                
                editFlag = false;
                
                input.value = '';
                
                // edit localstorage:
                
                // 1) get local storage  and edit it:
                
                //2) get the card edit it and save it to local storage :
                //** get the card id and loop through the ul and get the item by the index and change it from Card and then save :
                
                
                const Card_id = editElement.parentElement.parentElement.parentElement.parentElement.id;
                
                const card_name = editElement.parentElement.parentElement.parentElement.previousElementSibling.childNodes[0].textContent;
                
                const Card_index= Card.findIndex(x=>x.Card_name == card_name );
                
                console.log(card_name);
                
                console.log(Card_index);
                      
                const taskss = editElement.parentElement.parentElement.childNodes;
                
                const array = Array.from(taskss);
                                
                const index = array.indexOf(editElement.parentElement);
                
                console.log(index);
                                
                Card[Card_index].task[index].newtask = text_content;
                
                console.log(Card_id);
                
                localStorage.setItem('newCard',JSON.stringify(Card)); 
                
                console.log('saved');            
    
        }else{
                displayAlert('item not added correctly','danger');
                
        }
    
    }
}

}

//edit task:

function edit_Task(target){
    
    const task_element = target.parentElement;
    
    const current_input = target.parentElement.parentElement.parentElement.nextElementSibling;
    
    const submit_btn = current_input.nextElementSibling;
    
    editElement = target.parentElement.childNodes[1];
    
    current_input.value = editElement.textContent;

        
    console.log(task_element);
    
    console.log(current_input);
    
    
    console.log(editElement);
    
    editFlag = true;
    
    submit_btn.textContent = 'edit';

}

















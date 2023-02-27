class User {
    constructor(name) {
        this.name = name;
        this.mes = {};
        this.order = {}; //order of sent and recieved messeges if 0 => sent if 1 => recieved
    }
}

const users = [];
let content = document.getElementById('content');
let title = document.getElementById('title')
const backBtn = document.getElementById('transBtn');

function loadMain() {
    title.textContent = 'Messenger';
    backBtn.style.display = "none";
    content.innerHTML = `
                <div id="loginForm">
                    <input type="text" id="loginInput" maxlength="25" placeholder="Enter your name">
                    <button id="loginBtn">Login</button>
                </div> 
        
                <footer>
                    <button id="signupBtn">Sign-up</button>
                </footer>`
                
                let signupBtn = document.getElementById('signupBtn');
                signupBtn.addEventListener('click', signupBtnHandler);
                let loginBtn = document.getElementById('loginBtn');
                let loginInput = document.getElementById('loginInput');
                loginBtn.addEventListener('click', ()=>{loadUserPage(loginInput.value)});
}

loadMain();

let signupPage
function signupBtnHandler() {
    backBtn.style.display = "block";
    backBtn.textContent = "Back to login";
    backBtn.onclick = loadMain;
    content.innerHTML = `
                <div id="signupForm">
                    <input type="text" id="signup1" maxlength="25" placeholder="Enter your name">
                    <input type="text" id="signup2" maxlength="25" placeholder="Enter it again">
                    <button id="signupOrder">Sign-Up</button>
                </div>`

                let signupOrder = document.getElementById('signupOrder');
                signupOrder.addEventListener('click', signupOrderHandler);
}

function signupOrderHandler() {
    let signup1 = document.getElementById('signup1');
    let signup2 = document.getElementById('signup2');
    if(signup1.value == '' || signup2.value == '') {
        alert("Please fill all your information");
    }
    else if(signup1.value != signup2.value) {
        alert("The two names are diffrent");
    }
    else {
        let exists = false;
        for(let i = 0; i<users.length; i++) {
            if(users[i].name == signup1.value) {
                exists = true;
            }
        }
        if(!exists) {
            let user = new User(signup1.value);

            for (let i = 0; i<users.length; i++) { //Add every user to the new user's 3 dics and vice verca
                users[i].mes[user.name] = [];
                users[i].order[user.name] = [];
                user.mes[users[i].name] = [];
                user.order[users[i].name] = [];
            }
            users.push(user);

            
            loadMain();
        }
        else {
            alert("User already exists");
            loadMain();
        }
    }
}

function loadUserPage(username) {
    let contacts = [];
    let found = false;
    let user;
    for(let i = 0; i<users.length; i++) {
        let currentContact = users[i].name;
        if(username.toUpperCase() == currentContact.toUpperCase()) {
            found = true;
            user = users[i];
        }
        else {
            contacts.push(currentContact);
        }
    }
    if(found) {
        title.textContent = 'Contacts';
        backBtn.style.display = "block";
        backBtn.textContent = "Sign out";
        backBtn.onclick = loadMain;
        content.innerHTML = '';
        for(let i = 0; i<contacts.length; i++) {
            let contact = document.createElement('button');
            contact.classList.add('contact');
            contact.textContent = contacts[i];
            contact.addEventListener('click', ()=>{
                let contactUser;
                for(let j = 0; j<users.length; j++) {
                    if(contact.textContent == users[j].name) {
                        contactUser = users[j];
                    }
                }
                loadChat(user, contactUser);
            });
            content.appendChild(contact);
        }
    }
    else {
        alert("User not found")
    }
}


function loadChat(user, contact) {  
    title.textContent = contact.name;
    backBtn.style.display = "block";
    backBtn.textContent = "Go to contacts";
    backBtn.onclick = ()=>{loadUserPage(user.name)};
    content.innerHTML = 
    `
    <div id="messagesContainer"></div>
    <div id="messageForm">
        <input type="text" id="messageInput" placeholder="Type a message" maxlength="200">
        <button id="sendMessage">Send</button>
    </div>
    `
    let messagesContainer = document.getElementById("messagesContainer");
    for(let i = 0; i<user.mes[contact.name].length; i++) {
        let mesContainer = document.createElement("div");
        if(user.order[contact.name][i] == 1) {
            mesContainer.classList.add("mes");
        }        
        else {
            mesContainer.classList.add("mes");
            mesContainer.classList.add("recievedMes");
        }
        text = document.createElement("p");
        text.textContent = user.mes[contact.name][i];

        mesContainer.appendChild(text);
        messagesContainer.appendChild(mesContainer);
    }

    let sendBtn = document.getElementById("sendMessage");
    let mesInput = document.getElementById("messageInput");
    sendBtn.addEventListener("click", ()=>{
        sendMes(user, contact, mesInput)
    });
}

function sendMes(user, contact, mesInput) {
    let mes = mesInput.value;
    if(mes != "") {
        mesInput.value = "";
        user.mes[contact.name].push(mes);
        contact.mes[user.name].push(mes);
        user.order[contact.name].push(1); //1 indicates that the message is sent and 0 recieved
        contact.order[user.name].push(0);
    
        loadChat(user, contact);
    }  
}
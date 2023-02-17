class User {
    constructor(name) {
        this.name = name;
        this.sentMes = {};
        this.recievedMes = {};
        this.order = {}; //order of sent and recieved messeges if 0 => sent if 1 => recieved
    }
}

const users = [];
let content = document.getElementById('content');
let title = document.getElementById('title')

function loadMain() {
    title.textContent = 'Messenger';
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
                loginBtn.addEventListener('click', loadUserPage);
}

loadMain();

let signupPage
function signupBtnHandler() {
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
                users[i].sentMes[user.name] = [];
                users[i].recievedMes[user.name] = [];
                users[i].order[user.name] = [];
                user.sentMes[users[i].name] = [];
                user.recievedMes[users[i].name] = [];
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

function loadUserPage() {
    title.textContent = 'Contacts';
    let loginInput = document.getElementById('loginInput');
    let contacts = [];
    let found = false;
    let user;
    for(let i = 0; i<users.length; i++) {
        let currentContact = users[i].name;
        if(loginInput.value.toUpperCase() == currentContact.toUpperCase()) {
            found = true;
            user = users[i];
        }
        else {
            contacts.push(currentContact);
        }
    }
    if(found) {
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
    content.innerHTML = 
    `
    <div id="messagesContainer"></div>
    <div id="messageForm">
        <input type="text" id="messageInput" placeholder="Type a message" maxlength="50">
        <button id="sendMessage">Send</button>
    </div>
    `
    let messageForm = document.getElementById("messageForm");

    let sendBtn = document.getElementById("sendMessage");
    let mesInput = document.getElementById("messageInput");
    sendBtn.addEventListener("click", ()=>{
        sendMes(user, contact, mesInput)
    });
}

function sendMes(user, contact, mesInput) {
    let mes = mesInput.value;
    mesInput.value = "";
    user.sentMes[contact.name].push(mes);
    contact.recievedMes[user.name].push(mes);
    user.order[contact.name].push(1); //1 indicates that the message is sent and 0 recieved
    contact.order[user.name].push(0);

    loadChat(user, contact);
}
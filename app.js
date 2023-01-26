class User {
    constructor(name) {
        this.name = name;
        this.sentMes = [];
        this.recievedMes = [];
        this.order = []; //order of sent and recieved messeges if 0 => sent if 1 => recieved
    }
}

class Messege {
    constructor(from, to, content) {
        this.from = from;
        this.to = to;
        this.content = content;
    }

    getFrom() {
        return this.from;
    }

    getTo() {
        return this.to;
    }

    getContent() {
        return this.content;
    }
}


let content = document.getElementById('content');

function loadMain() {
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
        for(let i = 0; i<localStorage.length; i++) {
            if(localStorage.key(i) == signup1.value) {
                exists = true;
            }
        }
        if(!exists) {
            localStorage.setItem(signup1.value, new User(signup1.value));
            loadMain();  
        }
        else {
            alert("User already exists");
            loadMain();
        }
    }
}

function loadUserPage() {
    let loginInput = document.getElementById('loginInput');
    let contacts = [];
    let found = false;
    for(let i = 0; i<localStorage.length; i++) {
        if(loginInput.value == localStorage.key(i)) {
            found = true;
        }
        else {
            contacts.push(localStorage.key(i));
        }
    }
    if(found) {
        content.innerHTML = '';
        let contactsContainer = document.createElement('div');
        contactsContainer.classList.add('contactsContainer');
        content.appendChild(contactsContainer)
        for(let i = 0; i<contacts.length; i++) {
            let contact = document.createElement('button');
            contact.classList.add('contact');
            contact.textContent = contacts[i];
            contactsContainer.appendChild(contact);
        }
    }
    else {
        alert("User not found")
    }
}
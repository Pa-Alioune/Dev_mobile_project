document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    loadContacts();
    document.getElementById("addContactForm").addEventListener("submit", addContact);
}

function loadContacts() {
    let options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = ["name", "phoneNumbers"];
    navigator.contacts.find(fields, showContacts, handleError, options);
}

function showContacts(contacts) {
    let contactList = document.getElementById("contactList");
    let code = '';

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name && contacts[i].phoneNumbers) {
            code += `
                <li>
                    <a href="#">
                        <img src="img/avatar.jpg" alt="profile photo">
                        <h2>${contacts[i].name.formatted}</h2>
                        <p>${contacts[i].phoneNumbers[0].value}</p>
                    </a>
                </li>
            `;
        }
    }

    contactList.innerHTML = code;
    $(contactList).listview("refresh");
}

function handleError(error) {
    console.log("Error loading contacts: " + error);
}

function addContact(event) {
    event.preventDefault();
    
    let prenom = document.getElementById("prenom").value.trim();
    let nom = document.getElementById("nom").value.trim();
    let telephone = document.getElementById("telephone").value.trim();
    
    if (prenom !== "" && nom !== "" && telephone !== "") {
        let contact = navigator.contacts.create();
        contact.displayName = `${prenom} ${nom}`;
        
        let name = new ContactName();
        name.givenName = prenom;
        name.familyName = nom;
        contact.name = name;
        
        let phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', telephone, true);
        contact.phoneNumbers = phoneNumbers;

        contact.save(saveSuccess, saveError);
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

function saveSuccess() {
    alert("Contact ajouté avec succès !");
    $.mobile.changePage("#home");
    loadContacts();
}

function saveError(error) {
    console.log("Erreur lors de l'ajout du contact: " + error.code);
    alert("Erreur lors de l'ajout du contact.");
}

let submitButton = document.querySelector('.form__submit');
let form = document.forms.login;

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    let email = form.elements.email.value;
    let password = form.elements.password.value;
    let data = {
        email,
        password
    }
    fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw "Wrong email or password";
            }
        })
        .then((data) => {
            localStorage.setItem("JWT_token", data.jwt_token)
            return data.jwt_token;
        })
        .then((token) => {
            fetch('/profile', {
                method: "GET",
                headers: {
                    'Content-Type': 'text/html',
                    'Authorization': token,
                },
            })
            .then((res) => {
                window.location.replace(res.url);
            })
        })
        .catch((message) => {
            let node = document.createElement("div");
            node.setAttribute("class", "form__error");
            node.innerText = message;
            form.appendChild(node);
        });
});

// function sendToken() {
//     let token = localStorage.getItem("JWT_token");
//     if (token && token !== "undefined") {
//         fetch('/profile', {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'text/html',
//                     'Authorization': token,
//                 },
//         })
//         .then((res) => {
//                 window.location.replace(res.url);
//         })
//     }
// }

// sendToken();
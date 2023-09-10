(function () {
var linkNode = document.createElement("link"); 
linkNode.type = "text/css"; 
linkNode.rel = "stylesheet"; 
linkNode.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
document.head.appendChild(linkNode);

const template = document.createElement('template');
template.innerHTML = `
<head>
<link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css' rel='stylesheet'>
<style>
    body {
        background-color: white;
    }

    .containter {
        display: "flex",
        objectFit: "cover",
        width: "auto",
        height: "450px",
        overflowY: "scroll",
    }

    #file-input {
        display: none;
        align-items: center; 
        justify-content: center; 
    }

    #uploadbutton-label {
        display: flex;
        color: white;
        font-size: 21px;
        border: 1px solid black;
        background-color: #002354;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        object-fit: contain;
    }

    #uploadbutton-label:hover {
        background-color: rgb(128, 127, 127);
    }
    .notifications{
        position: fixed;
        top: 30px;
        right: 20px;
    }
    .toast{
        position: relative;
        padding: 10px;
        color: #fff;
        margin-bottom: 10px;
        width: 400px;
        display: grid;
        grid-template-columns: 70px 1fr 70px;
        border-radius: 5px;
        --color: #0abf30;
        background-image: 
            linear-gradient(
                to right, #0abf3055, #22242f 30%
            ); 
        animation: show 0.3s ease 1 forwards  
    }
    .toast i{
        color: var(--color);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: x-large;
    }

    .toast i:last-child {
        color: #aeb0d7;
        cursor: pointer;
    }

    .toast .title{
        font-size: x-large;
        font-weight: bold;
    }
    .toast span, .toast i:nth-child(3){
        color: #fff;
        opacity: 0.6;
    }
    @keyframes show{
        0%{
            transform: translateX(100%);
        }
        40%{
            transform: translateX(-5%);
        }
        80%{
            transform: translateX(0%);
        }
        100%{
            transform: translateX(-10%);
        }
    }
    .toast::before{
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: var(--color);
        width: 100%;
        height: 3px;
        content: '';
        box-shadow: 0 0 10px var(--color);
        animation: timeOut 5s linear 1 forwards
    }
    @keyframes timeOut{
        to{
            width: 0;
        }
    }
    .toast.error{
        --color: #f24d4c;
        background-image: 
            linear-gradient(
                to right, #f24d4c55, #22242F 30%
            );
    }
    .toast.warning{
        --color: #e9bd0c;
        background-image: 
            linear-gradient(
                to right, #e9bd0c55, #22242F 30%
            );
    }
    .toast.info{
        --color: #3498db;
        background-image: 
            linear-gradient(
                to right, #3498db55, #22242F 30%
            );
    }
</style>
</head>
<body>
    <div class="notifications"></div>       
    <div class="container">
        <form id="formupload" action="http://127.0.0.1:5000/upload" method="post" enctype="multipart/form-data">
            <input id="file-input" name="file-input" type="file">
                <label id="uploadbutton-label" for="file-input"><i class="fa fa-cloud-upload" aria-hidden="true"></i><span> Upload File
                </span></label>
        </form>    
    </div>
</body>
`
    
customElements.define('upload-feature', class extends HTMLElement {
    constructor() {
        super();       
    }
    connectedCallback() {

        this.attachShadow({mode: 'open'});
        const linkEl = document.createElement("link");
        linkEl.type = "text/css";
        linkEl.rel = "stylesheet";
        linkEl.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
        this.shadowRoot.appendChild(linkEl);
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        let CreateToast = function(type, icon, title, text){
                    let notifications = this.shadowRoot.querySelector('.notifications');
                    let newToast = document.createElement('div');
                    newToast.innerHTML = `
                        <div class="toast ${type}">
                            <i class="${icon}"></i>
                            <div class="content">
                                <div class="title">${title}</div>
                                <span>${text}</span>
                            </div>
                            <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
                        </div>`;
                    notifications.appendChild(newToast);
                    newToast.timeOut = setTimeout(
                        ()=>newToast.remove(), 5000
                    )
                }
        this.shadowRoot.querySelector("#file-input").addEventListener("change",
            event => {
                var event = new Event("onChange");
                this.GetFilename();
                this.dispatchEvent(event);
        })
    }
    
    GetFilename() {
            // Get the files from the input
            var file = this.shadowRoot.querySelector("#file-input").files[0];
            console.log(file)

            // Create a FormData object.
            var formData = new FormData();
    
            // Add the file to the AJAX request.
            formData.append('file-input', file, file.name);
    
            // Set up the request.
            var xhr = new XMLHttpRequest();
    
            // Open the connection.
            xhr.open('POST', 'https://tysonwbdev.cfapps.eu10.hana.ondemand.com/upload', true);
        
            // Set up a handler for when the task for the request is complete.
            xhr.onload = function () {
              if (xhr.status === 200) {
                    CreateToast('succes', 'fa-solid fa-circle-check', 'Success', 'Upload Successful!');
              } else {
                    CreateToast('error', 'fa-solid fa-circle-exclamation', 'Error', 'An error has occurred during the upload');
              }
            };
    
            // Send the data.
            xhr.send(formData);
            this.shadowRoot.querySelector("#file-input").value = null;
    }
}); 
})();

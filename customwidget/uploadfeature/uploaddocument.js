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
        display: flex;
        width: 100%;
        height: 100%;
    }

    #file-input {
        display: none;
        align-items: center; 
        justify-content: center; 
        width: 100%;
        height: 100%; 
        object-fit: contain; 
    }

    #uploadbutton-label {
        display: flex;
        color: white;
        font-size: 21px;
        border: 1px solid black;
        background-color: #002354;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        object-fit: contain;
    }

    #uploadbutton-label:hover {
        background-color: rgb(128, 127, 127); /* change to your desired color */
    }
</style>
</head>
<body>
    <div class="container">
        <form id="formupload" action="http://127.0.0.1:5000/upload" method="post" enctype="multipart/form-data">
            <input id="file-input" name="file-input" type="file">
                <label id="uploadbutton-label" for="file-input"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload File
                </label>
        </form>    
    </div>

</body>`
    
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
                console.log('Your upload is successful..');
              } else {
                console.log('An error occurred during the upload. Try again.');
              }
            };
    
            // Send the data.
            xhr.send(formData);
            this.shadowRoot.querySelector("#file-input").value = null;
    }
}); 
})();

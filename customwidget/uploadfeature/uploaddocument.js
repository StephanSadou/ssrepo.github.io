(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
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

        #uploadfile {
            display: none;
            align-items: center; 
            justify-content: center; 
            width: 100%;
            height: 100%; 
            object-fit: contain; 
        }

        #uploadbutton-label {
            color: white;
            font-size: 21px;
            border: 1px solid black;
            background-color: #002354;
            border-radius: 10px;
            width: 100%;
            height: 100%
            padding: 6px 30px;
            cursor: pointer;
        }

        #uploadbutton-label:hover {
            background-color: rgb(128, 127, 127); /* change to your desired color */
        }
    </style>
</head>
<body>
    <form id="formupload" enctype="multipart/form-data">
        <input id="uploadfile" name="uploadfile" type="file">
        <label id="uploadbutton-label" for="uploadfile">
            <i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload File
        </label>  
    </form>    
</body>` ;   
   
    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();           
        }
        init() {              
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            let form = this._shadowRoot.getElementById("formupload");
            form.addEventListener("submit", this._submit.bind(this));         
        }

        connectedCallback() {
        }

        _submit(e) {
            var fileSelect = document.getElementById('uploadfile');

                // Get the files from the input
                var files = fileSelect.files;

                // Create a FormData object.
                var formData = new FormData();

                //Grab only one file since this script disallows multiple file uploads.
                var file = files[0]; 

                 // Add the file to the AJAX request.
                formData.append('uploadfile', file, file.name);

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
                // Send the data.
                xhr.send(formData)
                }
        }
    }
    customElements.define('upload-button', PerformanceHelp);
})();

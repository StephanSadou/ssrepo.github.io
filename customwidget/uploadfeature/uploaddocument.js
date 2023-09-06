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
    <form id="formupload" action="https://tysonwbdev.cfapps.eu10.hana.ondemand.com/upload" method="post" enctype="multipart/form-data">
        <input id="uploadfile" name="uploadfile" type="file">
        <label id="uploadbutton-label" for="uploadfile">
            <i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload File
        </label>  
    </form>    
</body>` ;   
   
    class UploadFeature extends HTMLElement {
        constructor() {
            super();          
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            let btn = this._shadowRoot.getElementById("uploadbutton");
            form.addEventListener("change",  this.fireChanged());
                }       
        
        fireChanged() {
            var fileSelect = this._shadowRoot.getElementById('uploadfile');
            console.log(var);

        }
    }
    customElements.define('upload-button', UploadFeature);
})();

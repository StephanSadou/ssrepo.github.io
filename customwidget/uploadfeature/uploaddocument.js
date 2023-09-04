(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `
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
        }

        #uploadbutton-label {
            color: white;
            font-size: 21px;
            border: 1px solid black;
            background-color: #002354;
            border-radius: 10px;
            width: 200px;
            height: 40px;
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
            this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.fireChanged();           
            this.dispatchEvent(event);
            });           
        }

        fireChanged() {
            console.log('Button clicked! - This is working')
}
        
    }
    customElements.define('upload-button', PerformanceHelp);
})();

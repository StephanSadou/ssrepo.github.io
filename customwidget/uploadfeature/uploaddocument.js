(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `
<head>
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css' rel='stylesheet'>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            outline: none;
        }
        
        body {
            background-color: white;
        }

        .containter {
        display: flex;
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
            $(document).ready( function() {
                $('#uploadfile').change( function() {
                  let formData = new FormData();
                  let file = $('#uploadfile')[0].files[0];
                  formData.append('uploadfile', file);
              
                  $.ajax({
                    url: 'https://tysonwbdev.cfapps.eu10.hana.ondemand.com/upload',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data){
                      if (data!=0) {
                        console.log('upload successful!\n' + data);
                      }
                      else {  
                        console.log('upload failed!\n' + data);
                      }
                    }
                  })
                });
              });    
            
        }        
        
    }
    customElements.define('upload-button', PerformanceHelp);
})();

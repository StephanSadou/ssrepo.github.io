(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
     
        body {
          background: white;
        }
        
        .btn {
            border-color:grey;
            background-color: grey; /* Blue background */
            border-radius: 5px; /* Remove borders */
            color: white; /* White text */
            padding: 13px 15px; /* Some padding */
            font-size: 16px; /* Set a font size */
            cursor: pointer; /* Mouse pointer on hover */
            box-shadow: none;
        }
    
        .btn:hover {
      background-color: #002354;
        }
        </style>
    </head>
    <body>
        <button class="btn"><i class="fa fa-trash"></i></button>
    </body>
    </html>` ;   
   
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
            fetch('https://tysonwbdev.cfapps.eu10.hana.ondemand.com/delete');     
            
        }        
        
    }

    customElements.define('delete-button', PerformanceHelp);
})();

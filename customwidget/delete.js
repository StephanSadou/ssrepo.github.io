(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `
<style>

    body {
    background: white;
    }
  .container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .btn {
    align-items: center;
    justify-content: center;
    background-color: grey; /* Blue background */
    border-radius: 5px; /* Remove borders */
    cursor: pointer; /* Mouse pointer on hover */
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
    
  .btn:hover {
    background-color: #002354;
    }
   
      }

</style>
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<div class="container">
    <button class="btn"><i class="fa fa-trash-o" style="font-size:36px;color:white"></i></i></button>
</div>`;   
   
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
            console.log("OnClick Triggered"); 
        }        
        
    }

    customElements.define('delete-button', PerformanceHelp);
})();

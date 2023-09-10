var linkNode = document.createElement("link"); 
linkNode.type = "text/css"; 
linkNode.rel = "stylesheet"; 
linkNode.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
document.head.appendChild(linkNode);

(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
<head>
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
    color: #ffffff; 
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

<div class="container">
    <button class="btn"><i class="fa-solid fa-trash-can"></i></button>
</div>
</head>`;   
   
    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();           
        }

        init() {            
              
            let shadowRoot = this.attachShadow({mode: "open"});
            var fontstylelink = document.createElement("link"); 
            fontstylelink.type = "text/css"; 
            fontstylelink.rel = "stylesheet"; 
            fontstylelink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
            shadowRoot.appendChild(fontstylelink);
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

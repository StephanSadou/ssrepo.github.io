(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `  <style>

    body {
    background: white;
    }

  .btn {
    display: flex;
    background: url('https://stephansadou.github.io/ssrepo.github.io/customwidget/Images/trash.png');
    background-repeat: no-repeat;
    background-position: center; 
    align-items: center;
    justify-content: center;
    background-color: grey; /* Blue background */
    border-radius: 5px; /* Remove borders */
    color: white; /* White text */
    font-size: 16px; /* Set a font size */
    cursor: pointer; /* Mouse pointer on hover */
    width: 512px;
    height: 512px;
  }
  .btn:hover {
    background-color: #002354;
      }

  </style>

  <div>
      <button class="btn"></button>
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

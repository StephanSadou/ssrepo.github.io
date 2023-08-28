(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `
<style>

  body {
  background: white;
  }

.btn {
  align-items: center;
  background-size: cover;
  justify-content: center;
  background-image: url('https://cdn-icons-png.flaticon.com/512/3439/3439691.png');
  background-color: grey; /* Blue background */
  border-radius: 5px; /* Remove borders */
  color: white; /* White text */
  padding: 12px 15px; /* Some padding */
  font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
  width: 50px;
  height: 50px; 
  background-repeat: no-repeat;
}
.btn:hover {
  background-color: #002354;
    }

</style>
<div>
    <button class="btn"></button>
</div>
` ;   
   
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

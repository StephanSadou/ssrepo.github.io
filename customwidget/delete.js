(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
`
<div>
    <button class="btn">DELETE</button>
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

import Analog from "./analog.js";

export default class AnalogList {
    constructor (data=[]){
        this.data = data;
        this.render();
        this.renderParts ();

    }

    getTemplate () {
        return `
          
                <div data-element="partsList">
                <ul class="list">

                <div class="column2">
                    <div></div>
                </div>
                    
                <div class="column">
                        
                    <span class="item">БРЕНД</span>
                </div>
                    <div class="column">
                        
                        <span class="item">НАЗВА</span>
                    </div>
                    <div class="column">
                        
                        <span class="item">АРТИКУЛ</span>
                    </div>
                    <div class="column">
                        
                        <span class="item">ЦІНА</span>
                    </div>
                
                </ul>
                </div>
                  
        `
    }

    render () {
        const element = document.createElement('div');

        element.innerHTML = this.getTemplate();

        this.componentElement = element;
    }

    renderParts () {

        const parts = this.data.map(item => {
            
        const part = new Analog (item);

        return part.componentElement;
        });

        const body = this.componentElement.querySelector('[data-element="partsList"]');

        body.innerHTML = '';
        body.append(...parts);

    }

    update (data)   {

        this.data = data;

        this.renderParts();

    }
}
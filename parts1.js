import AnalogList from "./analog-list.js";

export default class Parts1 {
    constructor (data={}) {
        this.data = data;
        this.components = {};
        
        this.initComponents();
        this.render();
        this.renderComponents();


    }

    getTemplate () {
        return `

        <div> Аналоги
            <div class = "anal" data-element="body1">
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
                    
                    <span class="item">ДОСТУПНО</span>
                </div>
                <div class="column">
                    
                    <span class="item">ЦІНА</span>
                </div>
            
            </ul>
            </div>
            
        </div>
        
    
    `
    }

    initComponents(){
        

        const partList = new AnalogList (this.data);  
        

        this.components.partList = partList;
        

    }

    renderComponents () {
        
        const partsContainer = this.element.querySelector('[data-element="body1"]');
        

        partsContainer.append(this.components.partList.componentElement);
        
    }

    render(){
        
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
    }






}
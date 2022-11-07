export default class Analog {
    constructor (someProduct) {
        this.state = someProduct;
        
        
        this.myRender();
        
    }
    
    getTemplate () { 

        
        const state = this.state;

        if (typeof this.state.remains[0]?.storage.id == 'undefined') return null;

        const avb = "---"

        if (this.state.yourPrice.amount === 0) {this.state.yourPrice.amount = avb};

        

        const obj1 = {fullImagePath : "https://order24-api.utr.ua/images/catalog/no-photo-small.jpg"};
                    
        if (typeof this.state.images[0] == 'undefined') {this.state.images[0] = obj1};

        const brand1 = `${this.state?.brand.name}`

        const  image = this.state?.images[0].fullImagePath;

        //if (typeof this.state.remains[0] == 'undefined') {this.state.remains[0].remain = "завтра"}

        const today = " сьогодні";
        const tommorrow = " завтра";

        if (this.state.remains[0]?.storage.id === 37) {this.state.remains[0].remain = this.state.remains[0].remain + today}


        if (this.state.remains[0]?.storage.id === 15) {this.state.remains[0].remain = this.state.remains[0].remain + tommorrow};

        
        
        //console.log(this.state.remains[0]?.storage.id)

        //console.log (this.state.images[0])
        
        const result =
        `<div class="cardlist" data-element="body">
            
            <ul class="list">

            <div class="column2">
            <img class="photocard1" src="${image}">
        </div>
                
                <div class="column">
                    
                    <span class="item">${brand1}</span>
                </div>
                <div class="column">
                    
                    <span class="item">${this.state?.title}</span>
                </div>
                <div class="column">
                    
                    <span class="item">${this.state?.article}</span>
                </div>
                <div class="column">
                    
                    <span class="item">${this.state?.remains[0]?.remain}</span>
                </div>
                <div class="column">
                    
                    <span class="itemPrice">${this.state?.yourPrice.amount} грн</span>
                </div>
                <div class="column4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>    
                </div>
            
            </ul>

        </div>` ;

        return result;
        
    }


    myRender () {
        const element = document.createElement('div');

        element.innerHTML = this.getTemplate();

        this.componentElement = element;
    }

    update (someProduct = []) {
       
        this.state = someProduct;

        this.componentElement.innerHTML = this.getTemplate();

    }

}
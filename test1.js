export default class Test {
    constructor (someProduct , article, price , realPriceTechnomir) {
        this.state = someProduct;
        this.article = article;
        this.price = price;
        this.realPriceTechnomir = realPriceTechnomir;
        
        
        this.render();
        
    }
    
    getTemplate () { 


        if (typeof this.state?.brand == 'undefined') {

                            const result =
                                
                            `<div class="cardlist1" data-element="body">
                                
                                <div class="list1">
                                    <div class="column1">
                                        <img class="photocard" src="${this.state.data.images[0]?.image}">
                                    </div>
                                    <div class="column1">
                                        <span class="item">${this.state?.data.brand}</span>
                                    </div>
                                    <div class="column1">
                                        <span class="item">${this.state?.data.descriptionRus}</span>
                                    </div>
                                    <div class="column1">
                                        <span class="item">${this.state?.data.code}</span>
                                    </div>
                                    <div class="column1">
                                        <span class="itemPrice"> ${this.price?.data[0].rests[0].price*2} грн </span>
                                    </div>
                            
                                </div>
                    
                            </div>` 
                            
                            
                            return  result;

            
            
        } else {

            

            if (this.state.yourPrice.amount === 0) { console.log(this.state.yourPrice.amount);
                console.log(this.realPriceTechnomir);
                this.state.yourPrice.amount = this.realPriceTechnomir};

        
        
        const result =
        `<div class="cardlist1" data-element="body">
            
            <div class="list1">
                <div class="column1">
                    <img class="photocard" src="${this.state.images[0]?.fullImagePath}">
                </div>
                <div class="column1">
                    <span class="item">${this.state?.brand.name}</span>
                </div>
                <div class="column1">
                    <span class="item">${this.state?.title}</span>
                </div>
                <div class="column1">
                    <span class="item">${this.state?.article}</span>
                </div>
                <div class="column1">
                    <span class="itemPrice">${this.state?.yourPrice.amount} грн</span>
                </div>
        
            </div>

        </div>` ;

        return  result;
        
        
        
        }

        
    }


    render(){
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
    }

    update (someProduct = []) {
       
        this.state = someProduct;

        this.element.innerHTML = this.getTemplate();

    }

}





/*

                <div class="column1">
                    <img class="photocard" src="${this.state.images[0].fullImagePath}">
                </div>

const user = {
        
    "email":"lviv08@gmail.com",
    "password":"henry1414",
    "browser_fingerprint": "mkdasnakladgnadlgfgs"
}

const id = `WP9026`

const brand = `WIX FILTERS`

fetch (
    'https://order24-api.utr.ua/api/login_check' , {

    method: 'POST',

    headers: {"Content-Type":"application/json"
    } ,

    body : JSON.stringify(user)

    })

    .then(response => response.json())
    .then(json => fetch (
        `https://order24-api.utr.ua/api/analogs/${brand}/${id}` , {

            method: 'GET',

            headers: { 'Authorization' : 'Bearer ' + json.token
        }})
        
        .then(response => response.json())
        .then(json1 => console.log(json1)
    
             )

        

    
))*/
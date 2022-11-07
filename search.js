import API from "./API1.js";

export  default class Search {
    constructor() {
        const article = this.article;
        this.getTemplate();
        this.render();
        this.getValues();
    }

    getTemplate() {
        return `
          
                <div data-element="search">
                    <input id="myText"/>
                    <button data-element="buttonSubmit"> Пошук! </button>
                </div>
                  
        `
    };

    render () {
        
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();

        this.element = wrapper.firstElementChild;
    }


    getValues () {
        const submit = this.element.querySelector('[data-element="buttonSubmit"]');

           submit.addEventListener('click', event => {
           this.setingArticle (); 
           //this.update ();
          })
    }

    setingArticle () {

        this.article = document.getElementById("myText").value;
        const page1 = new API (this.article);
        //console.log(this.article);
    }

    /*update () {
        this.article = article;
        setingArticle ();
    }*/



    
}


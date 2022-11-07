const  BACKEND_URL_UTR = 'https://order24-api.utr.ua/api/';
const  BACKEND_URL_TECHNOMIR = 'https://api.tehnomir.com.ua/';

import Test from "./test1.js";
import Parts1 from "./parts1.js";

export  default class API {
    constructor(data) {

        this.data = data;
        this.urllogin = new URL ('login_check' , BACKEND_URL_UTR);
        this.urlSearchArticle = new URL ('search/', BACKEND_URL_UTR);
        this.urlSearchDetail = new URL ('detail/' , BACKEND_URL_UTR);
        this.urlAnalogs = new URL ('analogs/' , BACKEND_URL_UTR);
        this.urlgetBrand = new URL ('info/getBrandsByCode' , BACKEND_URL_TECHNOMIR);
        this.urlgetInfoProduct = new URL ('info/getProductInfo' , BACKEND_URL_TECHNOMIR);
        this.components = {};
        this.render();
        this.loadData();


    }

    getTemplate() {
        return `
          
                <div data-element="search">
                    
                </div>
                  
        `
    };

    loadData() {

        const article = this.data;
        
        
        const user = {
            email: "lviv08@gmail.com",
            password: "henry1414",
            browser_fingerprint: "mkdasnakladgnadlgfgs",
        };

        const user1 = {
            apiToken: "jLiA0DZd9LwG6K75xXpfMoZX8t3L7SsO",
            code: article,
        };

        const currency = "UAH"

        const user3 = {
            "apiToken": "jLiA0DZd9LwG6K75xXpfMoZX8t3L7SsO",
            "brandId": 0,
            "code": article,
            "isShowAnalogs": 0,
            "currency": currency
          };



        
        
        
        fetch (`${this.urllogin}`
            ,{
                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(user),
            })
            .then((response) => response.json()) 
            .then(token => 
                    fetch (`${this.urlSearchArticle}${article}` , 
                        {
                        method: "GET",

                        headers: { Authorization: "Bearer " + token.token }
                        })
                 
                .then((response) => response.json())
                .then(dataWithoutImages => {console.log(dataWithoutImages);
                    if (typeof dataWithoutImages.details[0] == 'undefined') 
                {
                    fetch(`${this.urlgetBrand}` , 
                        {
                            method: "POST",
      
                            headers: { "Content-Type": "application/json" },
      
                            body: JSON.stringify(user1),
                        }
                    )
                        .then((response) => response.json())
                        .then(getBrandId => 
                                {console.log(getBrandId);
                                    const user2= {
                                    "apiToken": "jLiA0DZd9LwG6K75xXpfMoZX8t3L7SsO",
                                    "brandId": `${getBrandId.data[0].brandId}`,
                                    "code": article
                              };
                              fetch(`${this.urlgetInfoProduct}` , 
                              {
                                method: "POST",
              
                                headers: { "Content-Type": "application/json" },
              
                                body: JSON.stringify(user2),
                              })
                                .then((response) => response.json())
                                .then(gottenBrandId => 
                                    {
                                        
                                        fetch('https://api.tehnomir.com.ua/price/search', {
                                            method: "POST",
                          
                                            headers: { "Content-Type": "application/json" },
                          
                                            body: JSON.stringify(user3)
                                          })
            
                                          .then((response) => response.json())
                                          .then(priceTechnomir => 
                                            {   const price = priceTechnomir;

                                                console.log(price);
                                                
                                                const page = new Test (gottenBrandId , article, price);
      
                                                const someElement = document.querySelector("#root1");
                  
                                                someElement.append(page.element)}) ;    
                                        
                                    })
                            }
                            )
                } 
                    
                    else 
                    {
                        fetch (`${this.urlSearchDetail}${dataWithoutImages?.details[0].id}` , 
                            {
                                 method: "GET",

                                 headers: { Authorization: "Bearer " + token.token }
                            })
                 
                    .then((response) => response.json())
                    .then(dataWithtImages => { console.log(dataWithtImages.images[0]);
                        if (typeof dataWithtImages.images[0] == 'undefined') 
                    {
                        fetch(`${this.urlgetBrand}` , 
                        {
                            method: "POST",
      
                            headers: { "Content-Type": "application/json" },
      
                            body: JSON.stringify(user1),
                        }
                    )
                        .then((response) => response.json())
                        .then(getBrandId => 
                                {const user2= {
                                    "apiToken": "jLiA0DZd9LwG6K75xXpfMoZX8t3L7SsO",
                                    "brandId": `${getBrandId.data[0]?.brandId}`,
                                    "code": article
                              };
                              fetch(`${this.urlgetInfoProduct}` , 
                              {
                                method: "POST",
              
                                headers: { "Content-Type": "application/json" },
              
                                body: JSON.stringify(user2),
                              })
                                .then((response) => response.json())
                                .then(gottenBrandId1 => { if (dataWithtImages.yourPrice.amount === 0)
                                    
                                    {  fetch('https://api.tehnomir.com.ua/price/search', {
                                        method: "POST",
                      
                                        headers: { "Content-Type": "application/json" },
                      
                                        body: JSON.stringify(user3)
                                      })
        
                                      .then((response) => response.json())
                                      .then(priceTechnomir =>{
                                        
                                    const realPriceTechnomir = priceTechnomir.data[0].rests[0].price;

                                    dataWithtImages.yourPrice.amount = realPriceTechnomir*1.25;

                                    console.log(dataWithtImages.yourPrice.amount);

                                    console.log(realPriceTechnomir);
                                        
                                    const image = {fullImagePath : gottenBrandId1.data.images[0]?.image};

                                    dataWithtImages.images[0] = image;
                                    
                                    const page = new Test (dataWithtImages , article);
      
                                    const someElement = document.querySelector("#root1");
                  
                                    someElement.append(page.element)})} else 
                                    
                                    {  
                                        
                                            
                                        const image = {fullImagePath : gottenBrandId1.data.images[0]?.image};
    
                                        dataWithtImages.images[0] = image;
                                        
                                        const page = new Test (dataWithtImages);
          
                                        const someElement = document.querySelector("#root1");
                      
                                        someElement.append(page.element)} })
                            } 

                            
                            )
                    } 
                    
                    else
                        { console.log(dataWithtImages)
                            
                        if (dataWithtImages.yourPrice.amount === 0)  
                        { console.log(dataWithtImages)
                            fetch('https://api.tehnomir.com.ua/price/search', {
                                method: "POST",
              
                                headers: { "Content-Type": "application/json" },
              
                                body: JSON.stringify(user3)
                              })

                              .then((response) => response.json())
                              .then(priceTechnomir => 
                                {   const realPriceTechnomir = priceTechnomir.data[0].rests[0].price;

                                    dataWithtImages.yourPrice.amount = realPriceTechnomir*1.25;

                                    console.log(realPriceTechnomir);
                                    
                                    const page = new Test (dataWithtImages , article, realPriceTechnomir);
      
                                    const someElement = document.querySelector("#root1");
      
                                    someElement.append(page.element)})   
                        }   
                        
                        else
                            
                        {const page = new Test (dataWithtImages);
      
                        const someElement = document.querySelector("#root1");
      
                        someElement.append(page.element)}}}
                        )    }}
                )

                .then(token2 => 
                        fetch (`${this.urlSearchArticle}${article}` , 
                        {
                            method: "GET",

                            headers: { Authorization: "Bearer " + token.token }
                       }
                        )
                        .then((response) => response.json())
                        .then(dataWithBrand => {if  (typeof dataWithBrand.details[0] == 'undefined') 
                        {
                            fetch(`${this.urlgetBrand}`, {
                                method: "POST",
              
                                headers: { "Content-Type": "application/json" },
              
                                body: JSON.stringify(user1),
                              })
                                .then((response) => response.json())
                                .then((dataTechnomirBrand) => {
                                  fetch(
                                    `https://order24-api.utr.ua/api/analogs/${dataTechnomirBrand.data[0]?.brand}/${article}`,
                                    {
                                      method: "GET",
              
                                      headers: { Authorization: "Bearer " + token.token },
                                    }
                                  )
                                    .then((response) => response.json())
                                    .then((json2) => { console.log(json2);
                                      return json2;
                                    })
                                    .then((res) => {
                                      const analogs = [];
              
                                      Promise.all(
                                        res.map((analogItem) => {
                                          return fetch(
                                            `https://order24-api.utr.ua/api/detail/${analogItem.id}`,
                                            {
                                              method: "GET",
                                              headers: {
                                                Authorization: "Bearer " + token.token,
                                              },
                                            }
                                          ).then((res) => res.json());
                                        })
                                      ).then((analogsWithImages) => {
                                        const page = new Parts1(analogsWithImages);
              
                                        const someElement = document.querySelector("#root2");
              
                                        someElement.append(page.element);
                                      });
                                    });
                                });
                        } 
                        else 
                        {
                            fetch (`${this.urlAnalogs}${dataWithBrand.details[0]?.brand.name}/${article}`,{
                                method: "GET",
    
                                headers: { Authorization: "Bearer " + token.token }
                           })
                            .then((response) => response.json())
                            .then((res) => {
                                //const analogs = [];
        
                                Promise.all(
                                  res.map((analogItem) => {
                                    return  fetch(
                                      `https://order24-api.utr.ua/api/detail/${analogItem?.id}`,
                                      {
                                        method: "GET",
                                        headers: {
                                          Authorization: "Bearer " + token.token,
                                        },
                                      }
                                    ).then((res) => res.json());
                                  })
                                ).then((analogsWithImages) => {
                                            console.log(analogsWithImages)

                                  const page = new Parts1(analogsWithImages);
        
                                  const someElement = document.querySelector("#root2");
        
                                  someElement.append(page.element);
                                });
                              })
                        }})
                    )
            )

          
        



    }

    render () {
        
        const wrapper1 = document.createElement('div');

        wrapper1.innerHTML = this.getTemplate();

        this.element = wrapper1;
    }

};
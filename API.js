const  BACKEND_URL_UTR = 'https://order24-api.utr.ua/api/';
const  BACKEND_URL_TECHNOMIR = 'https://api.tehnomir.com.ua/';

import Test from "./test1.js";
import Parts1 from "./parts1.js";

export  default class API {
    constructor(data) {

        this.data = data;
        this.urllogin = new URL ('login_check' , BACKEND_URL_UTR);
        this.urlSearchArticle = new URL ('search/', BACKEND_URL_UTR);
        this.urlSearchId = new URL ('detail/' , BACKEND_URL_UTR)
        this.urlgetBrand = new URL ('info/getBrandsByCode' , BACKEND_URL_TECHNOMIR)
        this.urlgetInfoProduct = new URL ('info/getProductInfo' , BACKEND_URL_TECHNOMIR)
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
        
        //console.log(this.data);
        const user = {
            email: "lviv08@gmail.com",
            password: "henry1414",
            browser_fingerprint: "mkdasnakladgnadlgfgs",
        };

        const user1 = {
            apiToken: "jLiA0DZd9LwG6K75xXpfMoZX8t3L7SsO",
            code: article,
        };

        

        fetch (this.urllogin , {
                                    method: "POST",
    
                                    headers: { "Content-Type": "application/json" },
    
                                    body: JSON.stringify(user),
                                })

        .then((response) => response.json())
        .then( (dataToken) =>
            fetch (`${this.urlSearchArticle}${article}`, {
                                    method: "GET",
    
                                    headers: { Authorization: "Bearer " + dataToken.token },
                    })
                .then((response) => response.json())
                .then((dataDetail) => { 

                  if (typeof dataDetail.details[0] == 'undefined') {
                    
                          
                      fetch(`${this.urlgetBrand}`, {
                      method: "POST",
    
                      headers: { "Content-Type": "application/json" },
    
                      body: JSON.stringify(user1),
                    })
                      .then((response) => response.json())
                      .then((json) => {

                        const user2= {
                              "apiToken": "jLiA0DZd9LwG6K75xXpfMoZX8t3L7SsO",
                              "brandId": `${json.data[0].brandId}`,
                              "code": article
                        }
                          
                          
                        fetch(
                          `${this.urlgetInfoProduct}`,
                          {
                      method: "POST",
    
                      headers: { "Content-Type": "application/json" },
    
                      body: JSON.stringify(user2),
                    }
                        )
                          .then((response) => response.json())
                          .then((json2) => { 
                          
                              const page = new Test (json2);
  
                              const someElement = document.querySelector("#root1");
  
                              someElement.append(page.element)})
                            
                            })

                              //analogs
                              .then((dataToken1) => {
                                fetch(`${this.urlSearchArticle}${article}`, {
                                  method: "GET",
                      
                                  headers: { Authorization: "Bearer " + dataToken.token },
                                })
                                  .then((response) => response.json())
                                  .then((dataInfo) => { 
                                    if (typeof dataInfo.details[0] == "undefined") {
                                      fetch(`${this.urlgetBrand}`, {
                                        method: "POST",
                      
                                        headers: { "Content-Type": "application/json" },
                      
                                        body: JSON.stringify(user1),
                                      })
                                        .then((response) => response.json())
                                        .then((json3) => {
                                          fetch(
                                            `https://order24-api.utr.ua/api/analogs/${json3.data[0].brand}/${article}`,
                                            {
                                              method: "GET",
                      
                                              headers: { Authorization: "Bearer " + dataToken.token },
                                            }
                                          )
                                            .then((response) => response.json())
                                            .then((json2) => {
                                              return json2;
                                            })
                                            .then((res) => {
                                              const analogs = [];
                      
                                              Promise.all(
                                                res.slice(0, 10).map((analogItem) => {
                                                  return fetch(
                                                    `https://order24-api.utr.ua/api/detail/${analogItem.id}`,
                                                    {
                                                      method: "GET",
                                                      headers: {
                                                        Authorization: "Bearer " + dataToken.token,
                                                      },
                                                    }
                                                  ).then((res) => res.json());
                                                })
                                              ).then((analogsWithImages) => {
                                                const page = new Parts1(analogsWithImages);
                      
                                                const someElement = document.querySelector("#root1");
                      
                                                someElement.append(page.element);
                                              });
                                            });
                                        });
                                    }
                      
                                    //  console.log (json1.details[0].brand.name)
                                    else {
                                      fetch(
                                        `https://order24-api.utr.ua/api/analogs/${dataInfo.details[0].brand.name}/${article}`,
                                        {
                                          method: "GET",
                      
                                          headers: { Authorization: "Bearer " + dataToken.token },
                                        }
                                      )
                                        .then((response) => response.json())
                                        .then((json2) => {return json2;})
                                        .then((res) => {
                                          const analogs = [];
                      
                                          Promise.all(
                                            res.slice(0, 10).map((analogItem) => {
                                              return fetch(
                                                `https://order24-api.utr.ua/api/detail/${analogItem.id}`,
                                                {
                                                  method: "GET",
                                                  headers: { Authorization: "Bearer " + dataToken.token },
                                                }
                                              ).then((res) => res.json());
                                            })
                                          ).then((analogsWithImages) => { console.log(analogsWithImages);
                                            const page = new Parts1(analogsWithImages);
                      
                                            const someElement = document.querySelector("#root2");
                      
                                            someElement.append(page.element);
                                          });
                                        });
                                    }
                                  })
                                })
                              //analogs

                  } 

                    fetch(`${this.urlSearchId}${dataDetail?.details[0].id}`,
                      {
                        method: "GET",
      
                        headers: { Authorization: "Bearer " + dataToken.token },
                      }
                    )
                      .then((response) => response.json())
                      .then((dataInfo) => { 
      
                        if (typeof dataInfo.images[0] == "undefined") 
                        
                        {
                          
                          fetch(`${this.urlgetBrand}`, {
                          method: "POST",
        
                          headers: { "Content-Type": "application/json" },
        
                          body: JSON.stringify(user1),
                        })
                          .then((response) => response.json())
                          .then((json) => {

                            const user2= {
                                  "apiToken": "jLiA0DZd9LwG6K75xXpfMoZX8t3L7SsO",
                                  "brandId": `${json.data[0].brandId}`,
                                  "code": article
                            }
                              console.log(json.data[0])
                              
                            fetch(
                              `${this.urlgetInfoProduct}`,
                              {
                          method: "POST",
        
                          headers: { "Content-Type": "application/json" },
        
                          body: JSON.stringify(user2),
                        }
                            )
                              .then((response) => response.json())
                              .then((json2) => {
                              
                              const obj = {fullImagePath : `${json2.data.images[0]?.image}`};

                              dataInfo.images[0] = obj;

                              const page = new Test (dataInfo);
      
                              const someElement = document.querySelector("#root1");
      
                              someElement.append(page.element)
                            
                            })})} else {

                              const page = new Test (dataInfo);
      
                              const someElement = document.querySelector("#root1");
            
                              someElement.append(page.element)

                              //analogs

                              .then((dataToken1) => {
                                fetch(`${this.urlSearchArticle}${article}`, {
                                  method: "GET",
                      
                                  headers: { Authorization: "Bearer " + dataToken.token },
                                })
                                  .then((response) => response.json())
                                  .then((dataInfo) => { console.log(dataToken);
                                    if (typeof dataInfo.details[0] == "undefined") {
                                      fetch(`${this.urlgetBrand}`, {
                                        method: "POST",
                      
                                        headers: { "Content-Type": "application/json" },
                      
                                        body: JSON.stringify(user1),
                                      })
                                        .then((response) => response.json())
                                        .then((json3) => {
                                          fetch(
                                            `https://order24-api.utr.ua/api/analogs/${json3.data[0].brand}/${article}`,
                                            {
                                              method: "GET",
                      
                                              headers: { Authorization: "Bearer " + dataToken.token },
                                            }
                                          )
                                            .then((response) => response.json())
                                            .then((json2) => {
                                              return json2;
                                            })
                                            .then((res) => {
                                              const analogs = [];
                      
                                              Promise.all(
                                                res.slice(0, 10).map((analogItem) => {
                                                  return fetch(
                                                    `https://order24-api.utr.ua/api/detail/${analogItem.id}`,
                                                    {
                                                      method: "GET",
                                                      headers: {
                                                        Authorization: "Bearer " + dataToken.token,
                                                      },
                                                    }
                                                  ).then((res) => res.json());
                                                })
                                              ).then((analogsWithImages) => {
                                                const page = new Parts1(analogsWithImages);
                      
                                                const someElement = document.querySelector("#root1");
                      
                                                someElement.append(page.element);
                                              });
                                            });
                                        });
                                    }
                      
                                    //  console.log (json1.details[0].brand.name)
                                    else {
                                      fetch(
                                        `https://order24-api.utr.ua/api/analogs/${dataInfo.details[0].brand.name}/${article}`,
                                        {
                                          method: "GET",
                      
                                          headers: { Authorization: "Bearer " + dataToken.token },
                                        }
                                      )
                                        .then((response) => response.json())
                                        .then((json2) => {return json2;})
                                        .then((res) => {
                                          const analogs = [];
                      
                                          Promise.all(
                                            res.slice(0, 10).map((analogItem) => {
                                              return fetch(
                                                `https://order24-api.utr.ua/api/detail/${analogItem.id}`,
                                                {
                                                  method: "GET",
                                                  headers: { Authorization: "Bearer " + dataToken.token },
                                                }
                                              ).then((res) => res.json());
                                            })
                                          ).then((analogsWithImages) => { console.log(analogsWithImages);
                                            const page = new Parts1(analogsWithImages);
                      
                                            const someElement = document.querySelector("#root2");
                      
                                            someElement.append(page.element);
                                          });
                                        });
                                    }
                                  })
                                })

                              //analogs

                            };
      
                        /*const page = new Test (dataInfo);
      
                        const someElement = document.querySelector("#root1");
      
                        someElement.append(page.element)*/;
                      });
                  })
                  
                  
    )
          
        



    }

    render () {
        
        const wrapper1 = document.createElement('div');

        wrapper1.innerHTML = this.getTemplate();

        this.element = wrapper1;
    }

};
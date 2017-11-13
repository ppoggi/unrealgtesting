//Author:Patrick Poggi
//This is a small script that retrieves all the links from the general info
//section of the UnrealEngine FAQ page, navigates to the links and ensures
// there are no 404's
//headless browser library
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
// great utility library
const _ = require('underscore');
//URL being tested
let promise = new Promise((resolve, reject)=>{
  nightmare.goto('https://www.unrealengine.com/en-US/faq')
  .wait('body').evaluate(() =>{

    let linkArray = [];
    //Get all the Links on the page
    let linkSelector = document.querySelectorAll('#generalInfo a');
    //push links to array
    for(let i=0;i<linkSelector.length; i++){
      linkArray.push(linkSelector[i].href);
    }
    //send links to node
    return linkArray;
  })
  .then(function(){
    // links resolved in the promise
    resolve(arguments[0]);
  })
  .catch((error) => {
    //error reporting
    console.error('Failure:', error);
  });
});
// resolution
promise.then((links)=>{
   //remove cdn links
    links = removeCDN(links);
    //TODO check falsey values and report whether any links are broken
    //remove falsey values
    let linksCompact = _.compact(links);
    //remove and duplicate links
    let linksParsed = _.uniq(links);
    //go through all the links and see what the results are
    let promises = [];
    for(let i=0; i< linksParsed.length; i++){
      //navigate to earch link and print out what the status is
          nightmare.goto(linksParsed[i]).then(function(){
            console.log('site:',linksParsed[i],'\ncode:', arguments[0].code)
            //TODO make sure 404's are handled correctly
          }
        )
     }
}, (err)=>{
  console.log(err)
    }
    //not working correclty...ideally should close out when all the urls have
    //been navigated to
    //TODO Fix
  ).then(()=>{
    nightmare.halt(err, ()=>{console.log('nightmare successfully closed')})
  })
//helper function to remove any cdn links
function removeCDN(array){
  for(let i = 0; i<array.length; i++){
    if(array[i].includes("cdn"))
      array[i] = '';
  }
  return array;
}

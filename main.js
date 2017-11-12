//headless browser library
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });

// great utility library
const _ = require('underscore');

// server side jquery library
//not used, but just incase....
const cheerio = require('cheerio')

//cheerio example
//const $ = cheerio.load('<h2 class="title">Hello world</h2>')

//URL being tested
let promise = new Promise((resolve, reject)=>{
  nightmare.goto('https://www.unrealengine.com/en-US/faq')
  .wait(10000).evaluate(() =>{

    let linkArray = [];
    //Get all the Links on the page
    let linkSelector = document.querySelectorAll('a');
    //push links to array
    for(let i=0;i<linkSelector.length; i++){
      linkArray.push(linkSelector[i].href);
    }
    //send links to node
    return linkArray;
  })
  .end()
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

  //comparing length of links list to the list after falsey values have been removed
  let preLength = links.length;
  let linksCompact = _.compact(links);
  let postLength = linksCompact.length;

  //if postLength <  preLength there are dead links
  if(postLength > preLength){
    console.error('Failure:', 'Dead Links on the page')
  }
  //remove and duplicate links
  let linksParsed = _.uniq(links);

  for(let i=0; i< linksParsed.length; i++){
    //goto links using whichever api wanted/needed
    //console.log(i," " + linksParsed[i]);
    //nightmare.goto().end().then().catch((error)=>{
      //console.error('Failure:', error);
  });
  }

});

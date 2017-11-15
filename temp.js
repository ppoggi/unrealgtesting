//etc..
.evaluate(function () {

  return document.body.innerHTML

})
.end()
.then(function (result) {
    //call your parsing library
    //use cheerio.js, a server side jquery implementation
    parsingFunction(result)
		})
}
//ex

const parsingFunction = function(response){
  //server side jquery library
		$ = cheerio.load(response.content);

		let scrapedObj = {};
    //get the title text
		let title = $('title').text();
    //string cleaning
		title = title.slice(0, title.indexOf('|') -1).trim();
    //push it to the empty object
		scrapedObj.title = title;
    return scrapedObj;
  }

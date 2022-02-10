import express from 'express';
import { read } from '../../in-class/bigfoot-express-bootcamp/jsonFileStorage.js'

const app = express();

// const handleIncomingRequest = (request, response) => {
//   console.log('request came in');
//   read('data.json', (err,jsonContentObj) => {
//     if (err){
//       console.log(err)
      
//     }
//    const requestedIndex = request.params.index

//    if (isNaN(requestedIndex) || requestedIndex > jsonContentObj.recipes.length -1|| requestedIndex < 0){
//     response.status(404).send('Sorry, we cannot find that!');
//    }
//    else 
//    {
//      console.log(jsonContentObj.recipes.length)
//    const requestedRecipe = jsonContentObj["recipes"][requestedIndex]
//    const recipeKeys = Object.keys(requestedRecipe)
//    const content = recipeKeys.map(key=> `${key}: ${requestedRecipe[key]}`)

//    response.send(content)
//    }
//   }
//   );
  
// };

// app.get('/recipe/:index', handleIncomingRequest);

// app.listen(3005);


const transformObj = (contentObject)=>{
  const keys = Object.keys(contentObject)
  const content = keys.map(key=> `${key}: ${contentObject[key]}`)
  .join("<br>")
  const newContent = content.concat("<br><br>")


 return newContent
}
  

// const handleIncomingRequest = (request, response) => {
//   console.log('request came in');
//   read('data.json', (err,jsonContentObj) => {
//     if (err){
//       console.log(err)
      
//     }
//     const yieldReq = request.params.index
//     console.log(yieldReq)

//    if (isNaN(yieldReq) || yieldReq < 0){
//     response.status(404).send('Sorry, we cannot find that!');
//    }
//    else 
//    {
//     //based on the index --> find the yield with the desired index, can filter 
   
//     const filteredList = jsonContentObj.recipes.filter(recipe => recipe.yield == yieldReq)
//     .map(transformObj)
//     .join("")

  
//     response.send(filteredList)
//    }
//   }
//   );
// };

// app.get('/recipe/yield/:index', handleIncomingRequest);

// app.listen(3005);

const handleIncomingRequest = (request, response) => {
  console.log('request came in');
  read('data.json', (err,jsonContentObj) => {
    if (err){
      console.log(err)
      
    }
    const recipeName = request.params.label
    console.log(recipeName)
    const recipeNameFormat = recipeName
    .split("-")
    .join(" ")
    .toLowerCase()
  
    console.log(recipeNameFormat)

    const filteredList = jsonContentObj.recipes.filter(recipe => recipe.label.toLowerCase() == recipeNameFormat)
    .map(transformObj)
    .join("")

    response.send(filteredList)
   }
  );
};
app.get("/recipe-label/:label", handleIncomingRequest);

app.listen(3005);

import { write } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

const subcommand = process.argv[2];
const petIndex = process.argv[3];

if(subcommand === "read"){
    
  readFile("./pets.json", "utf-8").then(text => {
    const pets = JSON.parse(text);
    if(petIndex === undefined || petIndex >= pets.length){
        console.error("Usage: node pets.js read INDEX");
        process.exit(1);        
    }else{
        console.log(pets[petIndex])
    }
  })
} else if(subcommand === "create"){
    const age = process.argv[3];
    const name = process.argv[4];
    const kind = process.argv[5];
    const pet = {age, name, kind};
    readFile("./pets.json", "utf-8").then(text => {
        const pets = JSON.parse(text);
        pets.push(pet);
        return writeFile("./pets.json", JSON.stringify(pets));
}).catch((err) => {
    console.log("Error");

})
}
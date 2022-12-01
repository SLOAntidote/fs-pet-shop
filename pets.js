import { readFile, writeFile } from 'node:fs/promises';

const subcommand = process.argv[2];

if(subcommand === "read"){
    
  readFile("./pets.json", "utf-8").then(text => {
    const pets = JSON.parse(text);
    const petIndex = process.argv[3];
    if(petIndex === undefined || petIndex >= pets.length){
        console.error("Usage: node pets.js read INDEX");
        process.exit(1);        
    }else{
        console.log(pets[petIndex])
    }
  })
} else if(subcommand === "create"){
    const age = Number(process.argv[3]);
    const kind = process.argv[5];
    const name = process.argv[4];
    const pet = {age, kind, name};
    readFile("./pets.json", "utf-8").then(text => {
        const pets = JSON.parse(text);
        pets.push(pet);
        return writeFile("./pets.json", JSON.stringify(pets));
})

} else if(subcommand === "update"){
    const newIndex = process.argv[3];
    const age = Number(process.argv[4]);
    const kind = process.argv[5];
    const name = process.argv[6];
    const newPet = {age, kind, name};
    readFile("./pets.json", "utf-8").then(text => {
        const pets = JSON.parse(text);
        //console.log(pets);
        pets[newIndex] = newPet;
        return writeFile("./pets.json", JSON.stringify(pets));

    });
} else if(subcommand === "destroy"){
    const remIndex = process.argv[3];
    readFile("./pets.json", "utf-8").then(text => {
        const pets = JSON.parse(text);
        pets.splice(remIndex);
        return writeFile("./pets.json", JSON.stringify(pets));

    });

}

// $ node pets.js update 1 9 cat
// Usage: node pets.js update INDEX AGE KIND NAME

// .catch((err) => {
//     console.log("Error");

// })
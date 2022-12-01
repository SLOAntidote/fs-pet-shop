import http from "node:http";
import {readFile} from "node:fs/promises";

const petRegExp = /^\/pets\/(.*)$/;
const server = http.createServer((req, res) => {

    const petRegExp = /^\/pets\/(.*)$/;
    
    if(req.method === "GET" && req.url === "/pets"){
        readFile("./pets.json", "utf-8").then((text) => {
            res.setHeader("Content-Type", "application/json");
            res.end(text);
        });
    } else if(req.method === "GET" && petRegExp.test(req.url)) {
        const matches = petRegExp.exec(req.url);
        const petIndex = matches[1];
       
        //attempt to throw error message if pet index does not exist
        readFile("./pets.json", "utf-8").then((text) => {
            const pets = JSON.parse(text);
            if(petIndex <= pets.length && petIndex >= 0){
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(pets));
                console.log(pets[petIndex]);
            } else {
                res.statusCode = 404;
                res.setHeader("Content-Type", "text/plain");
                res.end("Not Found");
            }
        });
    } 
   
});

server.listen(7000, () => {
    console.log(`Server running at port 7000`);
});
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port= 3000;
let lastUpdatedDate= 0;
let randomVar= [];

const d3 = new Date();
let yearToday = d3.getFullYear();

function updateVariablesDaily(next){
    const d = new Date();
    let dateToday = d.getDate();
    if(lastUpdatedDate !== dateToday){
        lastUpdatedDate=dateToday;
        var randomChap = Math.floor(Math.random()*(18)) +1;
        randomVar=[randomChap];
        console.log("Variable is updated");
        console.log(randomVar[0]);
    }
};


updateVariablesDaily();

// setInterval(updateVariablesDaily, 2*1000);

const intervalId = setInterval(() => {updateVariablesDaily(); console.log("Interval running...");}, 3600*1000); 


console.log(randomVar);
        var randomChap1 = Math.floor(Math.random()*(randomVar[0])) +1;
        console.log(randomChap1);
        switch(randomChap1){
        case 1: var randomVerse1= Math.floor(Math.random()*45) +1;
        break;
        case 2: var randomVerse1= Math.floor(Math.random()*71) +1;
        break;
        case 3: var randomVerse1= Math.floor(Math.random()*42) +1;
        break;
        case 4: var randomVerse1= Math.floor(Math.random()*41) +1;
        break;
        case 5: var randomVerse1= Math.floor(Math.random()*28) +1;
        break;
        case 6: var randomVerse1= Math.floor(Math.random()*46) +1;
        break;
        case 7: var randomVerse1= Math.floor(Math.random()*29) +1;
        break;
        case 8: var randomVerse1= Math.floor(Math.random()*27) +1;
        break;
        case 9: var randomVerse1= Math.floor(Math.random()*33) +1;
        break;
        case 10: var randomVerse1= Math.floor(Math.random()*41) +1;
        break;
        case 11: var randomVerse1= Math.floor(Math.random()*54) +1;
        break;
        case 12: var randomVerse1= Math.floor(Math.random()*19) +1;
        break;
        case 13: var randomVerse1= Math.floor(Math.random()*34) +1;
        break;
        case 14: var randomVerse1= Math.floor(Math.random()*26) +1;
        break;
        case 15: var randomVerse1= Math.floor(Math.random()*19) +1;
        break;
        case 16: var randomVerse1= Math.floor(Math.random()*23) +1;
        break;
        case 17: var randomVerse1= Math.floor(Math.random()*27) +1;
        break;
        case 18: var randomVerse1= Math.floor(Math.random()*77) +1;
        break;
    }
    console.log(randomVerse1);








app.get("/", async (req, res)=>{
    // res.render("index.ejs", {quote: "Search Verse"});
    try {
        const result= await axios.get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${randomChap1}/verses/${randomVerse1}/`, {
            headers: {
                'x-rapidapi-key': '2bdb6e5a69msh03206e7d43ba334p1dcb7ejsn104ec3de9b6c'
            }
        });
        res.render("index.ejs", {quote: result.data.text, verseNumber: result.data.verse_number, chapterNumber: result.data.chapter_number, subHeading: "Shloka of the Day", translation: result.data.translations[0].description, yearNow: yearToday, translator: ` |  Translated by: ${result.data.translations[0].author_name}`});
    } catch(error){
        console.log(error.message);
        res.render("index.ejs", {quote: error.message});
    }
});



app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.post("/getVerse", async (req, res)=>{
    console.log(req.body.chapter);
    try {
    const result= await axios.get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${req.body.chapter}/verses/${req.body.verse}/`, {
        headers: {
            'x-rapidapi-key': '2bdb6e5a69msh03206e7d43ba334p1dcb7ejsn104ec3de9b6c'
        }
    });
    res.render("index.ejs", {quote: result.data.text, verseNumber: result.data.verse_number, chapterNumber: result.data.chapter_number, subHeading: "Om Tat Sat", translation: result.data.translations[0].description, yearNow: yearToday, translator: ` |  Translated by: ${result.data.translations[0].author_name}`});
} catch(error){
    console.log(error.message);
    res.render("index.ejs", {quote: `Shloka ${req.body.chapter}:${req.body.verse} doesn't exist`, verseNumber: req.body.verse, chapterNumber: req.body.chapter, subHeading: "", translation: "", yearNow: yearToday, translator: ""});
}
});


app.listen(port, ()=>{
    console.log(`App listening at port ${port}`);
})
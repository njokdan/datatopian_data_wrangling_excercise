// main.js
// const fs = require('fs');//Not Used
const axios = require('axios');
const cheerio = require('cheerio');
const objectstocsv = require('objects-to-csv');
const kw = require('kiwis');
// var babar = require('babar');

// const co = require('co');
// const generate = require('node-chartist');
// const Papa = require('papaparse'); // Not Used
// const chartExporter = require("highcharts-export-server");

// const co = require('co');
// const generate = require('node-chartist');

//Register File Names
const raw_data_extracted = "raw_data.csv";
const result_data = "data.csv";




//INTRO
    // Use the following Wikipedia page and get the data from the “European Union Road Safety Facts and Figures” table:
    // https://en.wikipedia.org/wiki/Road_safety_in_Europe

    // Make a request to the wikipedia url and store the html response in a variable
    // It is not legal to scrape any website, so we check the status code.
    // 200 shows that you can go ahead and download it.

// wikipedia url
const url = "https://en.wikipedia.org/wiki/Road_safety_in_Europe";

// Runs the script to extract data from wikipedia and generate a resulting csv
//Loading data
 fetchData(url).then( (res) => {
    const html = res.data;

    //extract data from wikipedia 
    const $ = cheerio.load(html);
    const statsTable = $('.wikitable.sortable > tbody > tr ');
    // const title = ["Country", "Year", "Area", "Population", "GDP_per_capita", "Population_density", "Vehicle_ownership", "Total_road_deaths", "Road_deaths_per_Million_Inhabitants"]
    const lis = [];
    statsTable.each(function() {
       let row = $(this).find('td').text();
       let newArr = row.split('\n');
       let newArrs = newArr.filter(e => String(e).trim());
        lis.push(newArrs)
    });

    //The list contained an empty array, remove the empty array from the list
    let newlist = [];
    lis.forEach( elt => {
        if(elt.length > 0){
            newlist.push(elt);
        }
    });

    
    //Perform Data Cleaning, extract the needed columns;
    let newerlist = [];
    newlist.forEach( el => {
        let d1 = el.slice(0,6);
        let d2 = el.slice(7,9);
        let d3 = [...d1,...d2];
        newerlist.push(d3);
    });
    
    //generate Raw data  as data.csv
    convertToCsv(newlist, raw_data_extracted);

    //Get a copy of the dataset
    let netlist = newerlist.slice(0);
    //Reassign the Columns to the refined dataset above
    //Adding year to the column
    var newRec = netlist.map(x => ({
        "Country": x[0],
        "Year": 2018,
        "Area": x[1],
        "Population": x[2],
        "GDP_per_capita": x[3],
        "Population_density": x[4],
        "Vehicle_ownership": x[5],
        "Total_road_deaths": x[6],
        "Road_deaths_per_Million_Inhabitants": x[7]
    }));

   
    //Get the Copy of the Dataset with columns reassigned
     const ourRec = newRec.slice();
    //Convert to DataFrame
    const df = kw.DataFrame(ourRec)

   
    // Data should be sorted by “Road deaths per Million Inhabitants” column.
    // I am assuming ascending order here, So we will be Sorting the DataFrame alphabetically by 'Road_deaths_per_Million_Inhabitants'
    const df1 = df.sort('Road_deaths_per_Million_Inhabitants', { inPlace: true });

    //console.log(df1.columns);
    // Convert to Array after sorting
    const dfArray = df1.toArray();
    // for (let row of df1.rows()) {
    //     console.log(row);
    //   }

    // If you use "await", code must be inside an asynchronous function:
    //Convert to csv and save
    convertToCsv(dfArray, result_data);

    //const df = kw.DataFrame(ourRec);
    //--console.log(df.columns);
    //  await loadCsvData('./data/test.csv');


    //Graphical
})

async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));
    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}

//A function that  Converts array of objects to CSV
async function convertToCsv(newRec, fileName){
    const csv = new objectstocsv(newRec);
    const filelink = './data/' + fileName;
    //generate a filepath to the data folder & Save to file:
    await csv.toDisk(filelink);
    // Return the CSV file as string:
   //console.log(await csv.toString());
}






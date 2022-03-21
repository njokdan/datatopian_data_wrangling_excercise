# Datopian Data Wrangling Exercise
This Exercise is a data wrangling challenge organised by @Datopian. It is the normalised version of the European union Road Safety Facts and Figures, year is assumed to be 2018. The Exercise entails a number of data manupulations. Some columns of the frame were exempted. A few illustrative charts are included. Data used for the project was sourced from the European union Road Safety Facts and Figures. link to data source [Wikipedia] (https://en.wikipedia.org/wiki/Road_safety_in_Europe)

Although, Scripts in this exercise are used to normalize data and return a CSV. Please Note that all CSVs here uses a comma `,` as the delimiter.

## Requirements
The Exercise was done using JavaScript/nodejs.

The Exercise requires the folowing libraries:

axios

cheerio

objects-to-csv

kiwis

## Getting Started
To use this project locally you must have [nodejs](https://nodejs.org/en/download/) installed.

1. **Clone the repository:**
    ```sh
    git clone -b main https://github.com/njokdan/datatopian_data_wrangling_excercise.git
    ```
2. **Open the downloaded Folder:**
    ```sh
    cd datatopian_data_wrangling_excercise
    ```
    in the project root folder.
   
3. **Install External Dependencies:**
    ```sh
    npm install
    ```
   
5. **Running the script**
    In the project root directory, run:
    ```sh
    node app.js
    ```

## References ##

### Get European Union Road Safety Facts and Figures ###
Located at datatopian_data_wrangling_excercise/index.js, this scripts scraps data from the European Union Road Safety Facts and Figures table from wikipedia https://en.wikipedia.org/wiki/Road_safety_in_Europe.
   

## Data ##
The script result and required result is saved and located in this sub-folder named data with the name "data.csv". The wikipedia data is saved and located in the sub-folder named data. The data is named "raw_data.csv".

My Tabular Data Package is located at https://github.com/njokdan/datatopian_data_wrangling_excercise/data/datapackage.json.


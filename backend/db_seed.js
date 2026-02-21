const fs= require("fs");
const path = require("path");
const csv = require("csv-parser");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const CSV_FILE = path.join(__dirname,"data","water_demand.csv");

async function seed_database(){
    const client = await pool.connect();
    const rows = [];

    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on("data",(data) => {
            rows.push([
                data.date,
                data.zone_id,
                parseFloat(data.demand_liters),
                parseInt(data.population),
                parseFloat(data.avg_temp_c),
                parseFloat(data.rainfall_mm),
                data.is_holiday === "true" || data.is_holiday === "1"
            ]);
        })
        .on("end", async() => {
            try{
                const query = "INSERT INTO water_demand(date,zone_id,demand_liters,population,avg_temp_c,rainfall_mm,is_holiday) VALUES ($1,$2,$3,$4,$5,$6,$7)";
                for (const row of rows) {
                    await client.query(query, row);
                }
                console.log("Database seeding completed!");
            }
            catch (err) {
                console.error("Seeding error:", err);
            } finally {
                client.release();
                pool.end();
            }
        });
}

seed_database();


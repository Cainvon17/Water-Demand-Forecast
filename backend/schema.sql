CREATE TABLE IF NOT EXISTS water_demand (
    id SERIAL PRIMARY KEY,
    date DATE,
    zone_id VARCHAR(50),
    demand_liters FLOAT,
    population INT,
    avg_temp_c FLOAT,
    rainfall_mm FLOAT,
    is_holiday BOOLEAN
);

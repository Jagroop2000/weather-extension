import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import WeatherCard from "../WeatherCard/WeatherCard";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import "fontsource-roboto";
import "./popup.css";
import { setStorageCities, getStorageCities } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");

  useEffect(() => {
    getStorageCities().then((cities) => setCities(cities));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === "") {
      return;
    }
    const updateCities = [...cities, cityInput];
    setStorageCities(updateCities).then(() => {
      console.log("Update Cities", updateCities);

      setCities(updateCities);
      setCityInput("");
    });
  };

  const handleCityDelete = (index: number) => {
    cities.splice(index, 1);
    const updateCities = [...cities];
    setStorageCities(updateCities).then(() => {
      setCities([...cities]);
    });
  };
  return (
    <Box mx={"8px"} my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box py={"5px"} px={"15px"}>
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities &&
        cities.map((city, index) => {
          return (
            <WeatherCard
              city={city}
              key={index}
              onDelete={() => {
                handleCityDelete(index);
              }}
            />
          );
        })}
      <Box height={"16px"} />
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { height } from '@mui/system';

const meals = ["Mittagsmenüs", "Supen", "Vorspeisen", "Salate", "Spezialitäten", "Schweinefleisch", "Hühnerfleisch", "Rindfleisch", "Ente", "Fisch", "Tintenfisch", "Hummerkrabben", "Gemüse", "Reis", "Nudeln", "Menüs", "Sushi", "Extras", "Nachspeisen", "Getränke"];




export default function MealBar() {
    const initMeals = () => {
        return <>
            {meals.map((s) =>{
                return <div>
                  <Button>{s}</Button>
                </div>
            })} </>
    }
    
    return (

      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', position: "absolute", }}
        >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          >
          {initMeals()}
        </Tabs>
      </Box>
    );
      }
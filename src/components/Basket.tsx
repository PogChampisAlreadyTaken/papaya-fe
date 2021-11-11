import React from 'react'
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';

const meals = ["Mittagsmenüspew", "Supen", "Vorspeisen", "Salate"];

export default function Basket() {
    const initMeals = () => {
        return <>
            {meals.map((s) =>{
                return <div>
                  <Button>{s}</Button>
                </div>
            })} </>
    }
    return (
        <div>
            <Drawer
            anchor="right"
          variant="permanent"
          
          open
        >
            {initMeals()}
        </Drawer>

            
        </div>
    )
}

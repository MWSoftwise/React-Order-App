import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    const fetchMeals = async() => {
      const response = await fetch('https://food-order-app-f0a1d-default-rtdb.europe-west1.firebasedatabase.app/Meals.json');

      if(!response.ok){
        throw new Error('Loading list failed')
      }

      const data = await response.json();

      const loadedMeals = [];

      for(const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setFetchError(error.message)
      });
  },[])

  

    const mealsList = meals.map(meal => <MealsItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
    
    let mealsContent

  if(isLoading){
    mealsContent = <p>Loading...</p>
  }else if(fetchError){
    mealsContent = <p>{fetchError}</p>
  }else{
    mealsContent = <ul>
                      {mealsList}
                    </ul>
  }

    return(
        <section className={classes.meals}>
            <Card>
                {mealsContent}
            </Card>
        </section>
    )
}

export default AvailableMeals;
import classes from './meals-grid.module.css'
import MealItem from './meal-item'

const MealsGrid = (props) => {

  return (
    <ul className={classes.meals}>
      {props.meals.map(meal => <li key={meal.id}>
        <MealItem {...meal} />
     
      </li>)}
    </ul>
  )
}

export default MealsGrid

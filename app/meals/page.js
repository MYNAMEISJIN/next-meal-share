import Link from "next/link"
import classes from './page.module.css'
import MealsGrid from "@/components/meals/meals-grid"
import { getMeals } from "@/lib/meals"
import { Suspense } from "react"
import MealsLoadingPage from "./loading-out"



export const metadata = {
    title: 'All meals',
    description: 'all meals',
  };



async function Meals() {
    const meals = await getMeals(); // 데이터베이스에서 부른 데이터를 넣기.

    return <MealsGrid meals={meals} />
}

const MealsPage = () => {


    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. Its really easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href={"/meals/share"}>
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<MealsLoadingPage/>}>

                    <Meals />
                </Suspense>
            </main>
        </>
    )
}

export default MealsPage



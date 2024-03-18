'use server' // 이걸하면 'use Client' 와 반대이다.
import { redirect } from "next/navigation"
//서버에서만 돌리겠다는 말. 즉 이함수는 서버에서만 돌리겠다.
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache";


function isInvalidText(text) {// to check the validation
    return !text || text.trim() === '';
}
export const shareMeal = async (prevState, formData) => {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get("instructions"),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }
    //validation check
    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) { //error case
        //throw new Error("Invalid input")
        // instead 
        return {
            message: "Invalid input."
        }
    }


    await saveMeal(meal)
    revalidatePath('/meals', 'layout') 
    //revalidatePath 는 nextjs에게 정보가 업데이트 되어야한다고 알려주는 것
    // 정확하는 캐시를 재확인하고 갱신시킨다.
    //2번째 파라미터에는 /meals 안에 있는 모든 nested page를 모두 업데이트하라는 것
    //만약 'page'라고만 하면 그 /meals 만 업데이트 시켜준다는 말
    redirect('/meals')
}
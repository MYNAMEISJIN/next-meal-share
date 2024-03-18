'use client'
import { useFormStatus } from 'react-dom'

export default function MealsFormSubmit() {
    const status = useFormStatus();

    return (
        <button disabled={status.pending}>
            {status.pending ? "Submitting..." : "Share Meal"}
        </button>
    )
}
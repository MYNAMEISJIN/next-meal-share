'use client'

import Image from 'next/image';
import styles from './image-picker.module.css'
import { useRef, useState } from 'react';



export const ImagePicker = ({ label, name }) => {
    const [pickedImage, setPickedImage] = useState()
    const imageInput = useRef();
    const handlePickClick = () => {
        imageInput.current.click()
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null)
            return;
        }

        const filReader = new FileReader();

        filReader.onload = () => {
            setPickedImage(filReader.result);
        }

        filReader.readAsDataURL(file)

    }


    return (
        <div className={styles.picker}>
            <label htmlFor={name}>
                {label}
            </label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage}
                        alt="The pick image file"
                        fill
                    />}
                </div>
                <input
                    className={styles.input}
                    type='file'
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required // 이렇게 하면 이미지기 없으면 form 제출 불가.
                />
                <button className={styles.button} type='button'
                    onClick={handlePickClick}
                >
                    pick the image
                </button>
            </div>
        </div>
    )
}

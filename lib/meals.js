import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs' // 파일시스템 쓰기

const db = sql('meals.db')

export async function getMeals() { //모든 밀 데이터베이스에서 가져오기.

    await new Promise((resolve) => setTimeout(resolve, 2000));
    //이건 안해도 되지만 로딩 나중에 구현하기 위해 지연을 2초 걸어주는거

    // throw new Error("hello you got this error!")
    // //에러 구현하기.

    return db.prepare('SELECT * FROM meals').all()
    //all 은 데이터를 fetch 할때 쓰고, run 은 데이터를 넣을때 쓴다.
    //get은 하나의 데이터를 가지고 올때 쓴다.

}

export function getMeal(slug) { // 하나 특정밀 데이터 가져오기


    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) { // 데이터베이스에 밀데이터 저장하기.
    // //npm install slugify xss


    meal.slug = slugify(meal.title, { lower: true })
    //그냥 slugify 쓰는 법, 자세한건 공식 사이트 참조.
    meal.instructions = xss(meal.instructions);
    //instruction 이 html 파일이였다. 그래서 xss 쓴다.


    const extension = meal.image.name.split('.').pop()
    //여기서 데이터베이스에 이미지 파일을 저장해도 되나
    //좀 느리니까 퍼블릭파일에 저장해도 된다.
    const fileName = `${meal.slug}.${extension}`


    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();
    //buffer 완화하다. 보호하다., 완충제

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!')
        }
    })


    meal.image = `/images/${fileName}` // overriding 

    //데이터 베이스 저장.
    db.prepare(` 
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);



}


import { FoodKeeper } from "./foodKeeper";
import { Prisma, PrismaClient } from "@prisma/client";


const getData = async () => {
    // return await fetch('https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json')
    //     .then(data =>  data.json() as Promise<{data: FoodKeeper}>)
    //     .then(data => {
    //         return data.data as FoodKeeper
    //     })

    const response = await fetch('https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json')
    const data = await response.json()
    return data as FoodKeeper
}

const fetchAndAssignData = async () => {
    let data: FoodKeeper 

    try {
        data = await getData()
        // await populateCategory(data)
        populateDatabase(data)
    } catch (error) {
        console.log('Error fetching data:', error)
    }
}

const populateCategory =async (foodKeeper:FoodKeeper) => {
    const prisma = new PrismaClient()
    try {
        await prisma.$connect()
        foodKeeper.sheets[1].data.forEach(async (category, i) => {

            const record = await prisma.category.create({
                data: {
                    id: category[0].ID,
                    category_name: category[1].Category_Name,
                    subcategory_name: category[2]?.Subcategory_Name || null
                }
            })

            console.log('Category created: ', record.category_name)
        })
    } catch (error) {
        console.log('Error: ', error)
    } finally {
        await prisma.$disconnect()
    }
}

const populateDatabase = async (foodKeeper: FoodKeeper) => {
    const prisma = new PrismaClient()
    try {
        await prisma.$connect()
        foodKeeper.sheets[2].data.forEach(async (product, i) => {

            if(typeof product[27]?.Refrigerate_After_Thawing_Min === 'string'){
                product[27].Refrigerate_After_Thawing_Min = null
            }

            const record = await prisma.product.create({
                data: {
                    id: product[0].ID,
                    name: product[2].Name,
                    name_subtitle: product[3].Name_subtitle || null,
                    keywords: product[4]?.Keywords || null,
                    pantry_min: (product[5]?.Pantry_Min || product[9]?.DOP_Pantry_Min) || null,
                    pantry_max: (product[6]?.Pantry_Max || product[10]?.DOP_Pantry_Max) || null,
                    pantry_metric: (product[7]?.Pantry_Metric || product[11]?.DOP_Pantry_Metric) || null,
                    pantry_tips: (product[8]?.Pantry_tips || product[12]?.DOP_Pantry_tips) || null,
                    pantry_after_opening_min: product[13]?.Pantry_After_Opening_Min || null,
                    pantry_after_opening_max: product[14]?.Pantry_After_Opening_Max || null,
                    pantry_after_opening_metric: product[15]?.Pantry_After_Opening_Metric || null,
                    refrigerate_min: (product[16]?.Refrigerate_Min || product[20]?.DOP_Refrigerate_Min) || null,
                    refrigerate_max: (product[17]?.Refrigerate_Max || product[21]?.DOP_Refrigerate_Max) || null,
                    refrigerate_metric: (product[18]?.Refrigerate_Metric || product[22]?.DOP_Refrigerate_Metric) || null,
                    refrigerate_tips: (product[19]?.Refrigerate_tips || product[23]?.DOP_Refrigerate_tips) || null,
                    refrigerate_after_opening_min: product[24]?.Refrigerate_After_Opening_Min || null,
                    refrigerate_after_opening_max: product[25]?.Refrigerate_After_Opening_Max || null,
                    refrigerate_after_opening_metric: product[26]?.Refrigerate_After_Opening_Metric || null,
                    refrigerate_after_thawing_min: product[27]?.Refrigerate_After_Thawing_Min || null,
                    refrigerate_after_thawing_max: product[28]?.Refrigerate_After_Thawing_Max || null,
                    refrigerate_after_thawing_metric: product[29]?.Refrigerate_After_Thawing_Metric || null,
                    freeze_min: product[30]?.Freeze_Min || null,
                    freeze_max: product[31]?.Freeze_Max || null,
                    freeze_metric: product[32]?.Freeze_Metric || null,
                    freeze_tips: product[33]?.Freeze_Tips || null,

                    category: {
                        connect: {
                            id: product[1].Category_ID
                        }
                    }
                }
            })

            console.log('Product created: ', record.name, ' ', record.id)
        })
    } catch (error) {
        console.error('Error: ', error)
    } finally {
        await prisma.$disconnect()
    }
}

fetchAndAssignData()
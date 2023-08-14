"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    // return await fetch('https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json')
    //     .then(data =>  data.json() as Promise<{data: FoodKeeper}>)
    //     .then(data => {
    //         return data.data as FoodKeeper
    //     })
    const response = yield fetch('https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json');
    const data = yield response.json();
    return data;
});
const fetchAndAssignData = () => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    try {
        data = yield getData();
        populateDatabase(data);
    }
    catch (error) {
        console.log('Error fetching data:', error);
    }
});
const populateDatabase = (foodKeeper) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        yield prisma.$connect();
        foodKeeper.sheets[2].data.forEach((product, i) => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                id: product[0].ID,
                category_id: product[1].Category_ID,
                name: product[2].Name,
                keywords: product[4].Keywords
            };
            if (typeof product[3].Name_subtitle !== 'undefined') {
                data.name_subtitle = product[3].Name_subtitle;
            }
            if (product[5].Pantry_Min !== undefined) {
                data.pantry_min = product[5].Pantry_Min;
            }
            else if (product[9].DOP_Pantry_Min !== undefined) {
                data.pantry_min = product[9].DOP_Pantry_Min;
            }
            const record = yield prisma.product.create({
                data: {
                    id: product[0].ID,
                    category_id: product[1].Category_ID,
                    name: product[2].Name,
                    name_subtitle: product[3].Name_subtitle,
                    keywords: product[4].Keywords,
                    pantry_min: product[5].Pantry_Min || product[9].DOP_Pantry_Min,
                    pantry_max: product[6].Pantry_Max || product[10].DOP_Pantry_Max,
                    pantry_metric: product[7].Pantry_Metric || product[11].DOP_Pantry_Metric,
                    pantry_tips: product[8].Pantry_tips || product[12].DOP_Pantry_tips,
                    pantry_after_opening_min: product[13].Pantry_After_Opening_Min,
                    pantry_after_opening_max: product[14].Pantry_After_Opening_Max,
                    pantry_after_opening_metric: product[15].Pantry_After_Opening_Metric,
                    refrigerate_min: product[16].Refrigerate_Min || product[20].DOP_Refrigerate_Min,
                    refrigerate_max: product[17].Refrigerate_Max || product[21].DOP_Refrigerate_Max,
                    refrigerate_metric: product[18].Refrigerate_Metric || product[22].DOP_Refrigerate_Metric,
                    refrigerate_tips: product[19].Refrigerate_tips || product[23].DOP_Refrigerate_tips,
                    refrigerate_after_opening_min: product[24].Refrigerate_After_Opening_Min,
                    refrigerate_after_opening_max: product[25].Refrigerate_After_Opening_Max,
                    refrigerate_after_opening_metric: product[26].Refrigerate_After_Opening_Metric,
                    refrigerate_after_thawing_min: product[27].Refrigerate_After_Thawing_Min,
                    refrigerate_after_thawing_max: product[28].Refrigerate_After_Thawing_Max,
                    refrigerate_after_thawing_metric: product[29].Refrigerate_After_Thawing_Metric,
                    freeze_min: product[30].Freeze_Min || product[34].DOP_Freeze_Min,
                    freeze_max: product[31].Freeze_Max || product[35].DOP_Freeze_Max,
                    freeze_metric: product[32].Freeze_Metric || product[36].DOP_Freeze_Metric,
                    freeze_tips: product[33].Freeze_Tips || product[37].DOP_Freeze_Tips,
                }
            });
            console.log('Product created: ', record.name);
        }));
    }
    catch (error) {
        console.error('Error: ', error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
fetchAndAssignData();

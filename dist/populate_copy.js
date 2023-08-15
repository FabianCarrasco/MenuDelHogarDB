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
        // await populateCategory(data)
        populateDatabase(data);
    }
    catch (error) {
        console.log('Error fetching data:', error);
    }
});
const populateCategory = (foodKeeper) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        yield prisma.$connect();
        foodKeeper.sheets[1].data.forEach((category, i) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const record = yield prisma.category.create({
                data: {
                    id: category[0].ID,
                    category_name: category[1].Category_Name,
                    subcategory_name: ((_a = category[2]) === null || _a === void 0 ? void 0 : _a.Subcategory_Name) || null
                }
            });
            console.log('Category created: ', record.category_name);
        }));
    }
    catch (error) {
        console.log('Error: ', error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
const populateDatabase = (foodKeeper) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        yield prisma.$connect();
        foodKeeper.sheets[2].data.forEach((product, i) => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
            if (typeof ((_b = product[27]) === null || _b === void 0 ? void 0 : _b.Refrigerate_After_Thawing_Min) === 'string') {
                product[27].Refrigerate_After_Thawing_Min = null;
            }
            const record = yield prisma.product.create({
                data: {
                    id: product[0].ID,
                    name: product[2].Name,
                    name_subtitle: product[3].Name_subtitle || null,
                    keywords: ((_c = product[4]) === null || _c === void 0 ? void 0 : _c.Keywords) || null,
                    pantry_min: (((_d = product[5]) === null || _d === void 0 ? void 0 : _d.Pantry_Min) || ((_e = product[9]) === null || _e === void 0 ? void 0 : _e.DOP_Pantry_Min)) || null,
                    pantry_max: (((_f = product[6]) === null || _f === void 0 ? void 0 : _f.Pantry_Max) || ((_g = product[10]) === null || _g === void 0 ? void 0 : _g.DOP_Pantry_Max)) || null,
                    pantry_metric: (((_h = product[7]) === null || _h === void 0 ? void 0 : _h.Pantry_Metric) || ((_j = product[11]) === null || _j === void 0 ? void 0 : _j.DOP_Pantry_Metric)) || null,
                    pantry_tips: (((_k = product[8]) === null || _k === void 0 ? void 0 : _k.Pantry_tips) || ((_l = product[12]) === null || _l === void 0 ? void 0 : _l.DOP_Pantry_tips)) || null,
                    pantry_after_opening_min: ((_m = product[13]) === null || _m === void 0 ? void 0 : _m.Pantry_After_Opening_Min) || null,
                    pantry_after_opening_max: ((_o = product[14]) === null || _o === void 0 ? void 0 : _o.Pantry_After_Opening_Max) || null,
                    pantry_after_opening_metric: ((_p = product[15]) === null || _p === void 0 ? void 0 : _p.Pantry_After_Opening_Metric) || null,
                    refrigerate_min: (((_q = product[16]) === null || _q === void 0 ? void 0 : _q.Refrigerate_Min) || ((_r = product[20]) === null || _r === void 0 ? void 0 : _r.DOP_Refrigerate_Min)) || null,
                    refrigerate_max: (((_s = product[17]) === null || _s === void 0 ? void 0 : _s.Refrigerate_Max) || ((_t = product[21]) === null || _t === void 0 ? void 0 : _t.DOP_Refrigerate_Max)) || null,
                    refrigerate_metric: (((_u = product[18]) === null || _u === void 0 ? void 0 : _u.Refrigerate_Metric) || ((_v = product[22]) === null || _v === void 0 ? void 0 : _v.DOP_Refrigerate_Metric)) || null,
                    refrigerate_tips: (((_w = product[19]) === null || _w === void 0 ? void 0 : _w.Refrigerate_tips) || ((_x = product[23]) === null || _x === void 0 ? void 0 : _x.DOP_Refrigerate_tips)) || null,
                    refrigerate_after_opening_min: ((_y = product[24]) === null || _y === void 0 ? void 0 : _y.Refrigerate_After_Opening_Min) || null,
                    refrigerate_after_opening_max: ((_z = product[25]) === null || _z === void 0 ? void 0 : _z.Refrigerate_After_Opening_Max) || null,
                    refrigerate_after_opening_metric: ((_0 = product[26]) === null || _0 === void 0 ? void 0 : _0.Refrigerate_After_Opening_Metric) || null,
                    refrigerate_after_thawing_min: ((_1 = product[27]) === null || _1 === void 0 ? void 0 : _1.Refrigerate_After_Thawing_Min) || null,
                    refrigerate_after_thawing_max: ((_2 = product[28]) === null || _2 === void 0 ? void 0 : _2.Refrigerate_After_Thawing_Max) || null,
                    refrigerate_after_thawing_metric: ((_3 = product[29]) === null || _3 === void 0 ? void 0 : _3.Refrigerate_After_Thawing_Metric) || null,
                    freeze_min: ((_4 = product[30]) === null || _4 === void 0 ? void 0 : _4.Freeze_Min) || null,
                    freeze_max: ((_5 = product[31]) === null || _5 === void 0 ? void 0 : _5.Freeze_Max) || null,
                    freeze_metric: ((_6 = product[32]) === null || _6 === void 0 ? void 0 : _6.Freeze_Metric) || null,
                    freeze_tips: ((_7 = product[33]) === null || _7 === void 0 ? void 0 : _7.Freeze_Tips) || null,
                    category: {
                        connect: {
                            id: product[1].Category_ID
                        }
                    }
                }
            });
            console.log('Product created: ', record.name, ' ', record.id);
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

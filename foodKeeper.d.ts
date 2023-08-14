
declare interface FoodKeeper {
    fileName: string,
    sheets: [
        {
            name: string,
            data: [
                {
                    Data_Version_Number: number,
                },
                {
                    Current_Version: string,
                },
                {
                    Modified_Date: string,
                },
                {
                    FSIS_Approved_Flag: string,
                },
                {
                    Approved_Date: string,
                },
                {
                    Notes: string,
                }
            ][],
            maxRows: number,
            maxCols: number
        },
        {
            name: string,
            data: [
                {
                    ID: number
                },
                {
                    Category_Name: string
                },
                {
                    Subcategory_Name: string
                }
            ][],
            maxRows: number,
            maxCols: number
        },
        {
            name: string,
            data: [
                {
                    ID: number
                },
                {
                    Category_ID: number
                },
                {
                    Name: string
                },
                {
                    Name_subtitle: string
                },
                {
                    Keywords: string
                },
                {
                    Pantry_Min: number
                },
                {
                    Pantry_Max: number
                }, 
                {
                    Pantry_Metric: string
                },
                {
                    Pantry_tips: string
                }, 
                {
                    DOP_Pantry_Min: number
                },
                {
                    DOP_Pantry_Max: number
                },
                {
                    DOP_Pantry_Metric: string
                },
                {
                    DOP_Pantry_tips: string
                },
                {
                    Pantry_After_Opening_Min: number
                },
                {
                    Pantry_After_Opening_Max: number
                },
                {
                    Pantry_After_Opening_Metric: string
                },
                {
                    Refrigerate_Min: number
                },
                {
                    Refrigerate_Max: number
                },
                {
                    Refrigerate_Metric: string
                },
                {
                    Refrigerate_tips: string
                },
                {
                    DOP_Refrigerate_Min: number
                },
                {
                    DOP_Refrigerate_Max: number
                },
                {
                    DOP_Refrigerate_Metric: string
                },
                {
                    DOP_Refrigerate_tips: string
                },
                {
                    Refrigerate_After_Opening_Min: number
                },
                {
                    Refrigerate_After_Opening_Max: number
                },
                {
                    Refrigerate_After_Opening_Metric: string
                },
                {
                    Refrigerate_After_Thawing_Min: number
                },
                {
                    Refrigerate_After_Thawing_Max: number
                }, 
                {
                    Refrigerate_After_Thawing_Metric: string
                },
                {
                    Freeze_Min: number
                },
                {
                    Freeze_Max: number
                }, 
                {
                    Freeze_Metric: string
                },
                {
                    Freeze_Tips: string
                },
                {
                    DOP_Freeze_Min: number
                }, 
                {
                    DOP_Freeze_Max: number
                },
                {
                    DOP_Freeze_Metric: string
                },
                {
                    DOP_Freeze_Tips: string
                }
            ][],
            maxRows: number,
            maxCols: number,
        },
        {
            name: string,
            data: [
                {
                    ID: number
                },
                {
                    Product_ID: number
                },
                {
                    Tips: string
                },
                {
                    Safe_Minimum_Temperature: number
                },
                {
                    Rest_Time: number
                },
                {
                    Rest_Time_Metric: string
                }
            ][],
            maxRows: number,
            maxCols: number
        },
        {
            name: string,
            data: [
                {
                    ID: number
                },
                {
                    Product_ID: number
                },
                {
                    Cooking_Method: string
                },
                {
                    Measure_from: number
                },
                {
                    Measure_to: number
                },
                {
                    Size_metric: string
                },
                {
                    Cooking_Temperature: 325
                },
                {
                    Timing_from: number
                },
                {
                    Timing_to: number
                },
                {
                    Timing_metric: string
                },
                {
                    Timing_per: string
                }
            ][],
            maxRows: number,
            maxCols: number,
        },
        {
            name: string,
            data: [
                {
                    Sheet: string
                },
                {
                    Column: string
                },
                {
                    Description: string
                }
            ][],
            maxRows: number,
            maxCols: number
        }
    ]
}

export {FoodKeeper}
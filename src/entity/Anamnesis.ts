
type MealLocation =  'Em casa' | 'Fora'

export interface Anamnesis {
    weight: number
    height: number
    nutrition:{
        meals :  MealLocation[],
        restrictions : string | null
        alergies : string | null
        compulsion: string | null
    }
    ilnesses : {
        patologies: string | null
        medicalSpecifics: string | null
    }
    drugs : {
        medication : {
            name: string,
            dose: string
        }[] | null
        steroids : {
            name: string
            useTime: string

        }[] | null
        steroidResult: string | null
    }
}
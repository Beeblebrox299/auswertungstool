export interface Contribution {
    id: number,
    categories: number[],
    [key:string]: any,
    categories_confirmed: boolean,
};

export interface Category {
    id: number,
    name: string,
    assignedTo: number[],
};

export interface Field {
    id: number,
    name: string,
    type: "Text"|"Zahl"|string[],
};

export const generateId = ():number => {
    /* FIXME: I'm not working with a huge number of contributions, so the probability of 2 IDs being equal is fairly small (about 0.02% for 2000 IDs).
    When working with a bigger number of IDs, this should be adapted*/ 
    return Math.floor(Math.random() * 10000000000)
};

const getFromLocalStorage = (type: string) => {
    let storedString:string|null = null;
    if (typeof window !== "undefined"){
        storedString = localStorage.getItem(type)
    };
    let storedArray = (storedString !== null && storedString !== "") ? JSON.parse(storedString) : [];
    return storedArray
};

export const getContributions = (): Contribution[] => {
    return getFromLocalStorage("contributions")
};

export const getContributionsWithoutId = () => {
    const storedArray = getContributions()
    const contributionsWithoutId: Record<string, any>[] = storedArray.map(contribution => ({ ...contribution }));
    contributionsWithoutId.forEach(contribution => {
        delete contribution.id
    });
    return contributionsWithoutId
};

export const getCategories = (): Category[] => {
    return getFromLocalStorage("categories")
};

export const getFields = (): Field[] => {
    return getFromLocalStorage("fields")
};

export interface Contribution {
    id: number,
    categories: number[],
    [key:string]: any,
}

export interface Category {
    id: number,
    name: string,
    assignedTo: number[],
}

export const generateId = ():number => {
    /* FIXME: I'm not working with a huge number of contributions, so the probability of 2 IDs being equal is fairly small (about 0.02% for 2000 IDs).
    When working with a bigger number of IDs, this should be adapted*/ 
    return Math.floor(Math.random() * 10000000000)
};

export const getContributions = () => {
    const storedString = sessionStorage.getItem("contributions")
    let storedArray: Contribution[] = (storedString != null) ? JSON.parse(storedString) : [];
    return storedArray
};

export const getContributionsWithoutId = () => {
    const storedArray = getContributions()
    const contributionsWithoutId: Record<string, any>[] = storedArray.map(contribution => ({ ...contribution }));
    contributionsWithoutId.forEach(contribution => {
        delete contribution.id
    });
    return contributionsWithoutId
};

export const getCategories = () => {
    const storedString = sessionStorage.getItem("categories")
    let storedArray: Category[] = (storedString != null) ? JSON.parse(storedString) : [];
    return storedArray
}

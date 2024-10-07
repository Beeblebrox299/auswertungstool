export const generateId = ():number => {
    /* FIXME: I'm not working with a huge number of contributions, so the probability of 2 IDs being equal is fairly small (about 0.02% for 2000 IDs).
    When working with a bigger number of IDs, this should be adapted*/ 
    return Math.floor(Math.random() * 10000000000)
};

export const getArrayFromStorage = (type: string, withId: boolean = true) => {
    const storedString = localStorage.getItem(type)
    let storedArray:Record<string, any>[] = (storedString != null) ? JSON.parse(storedString) : [];
    if (!withId) {
        storedArray.forEach( (contribution) => {
        delete contribution.id;
        })
    }
    return storedArray
        
}
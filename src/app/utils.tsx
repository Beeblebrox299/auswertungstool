export const generateId = () => {
    /* FIXME: I'm not working with a huge number of contributions, so the probability of 2 IDs being equal is fairly small (about 0.02% for 2000 IDs).
    When working with a bigger number of IDs, this should be adapted*/ 
    return Math.floor(Math.random() * 10000000000)
};
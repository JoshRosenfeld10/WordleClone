
const checkSearchParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    return urlParams.has('word') ? true : false
}

export default checkSearchParams;
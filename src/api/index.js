const STORAGE_KEY = 'contacts';



export function setItem(obj) {
    const setItemArr = getItem();
    setItemArr.push(obj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(setItemArr));
}

function getItem() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(error.message);
    }
}
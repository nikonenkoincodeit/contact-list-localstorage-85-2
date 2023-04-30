const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

function saveArrObj(obj, key) {
  const newArr = load(key);
  newArr.push(obj);
  save(key, newArr);
}

export { save, load, saveArrObj };

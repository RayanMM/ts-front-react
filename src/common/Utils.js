export const setStorageItem = (key, value) => {
  localStorage.setItem(key, value);
}
  
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const removeArrayItem = (array, value) =>{
  try{
      if(Array.isArray(array)){
        const index = array.indexOf(value);

        if (index > -1) {
          array.splice(index, 1);
        }

        return array; 
      }else
        return undefined;
  }catch(error){
    return undefined;
  }
}
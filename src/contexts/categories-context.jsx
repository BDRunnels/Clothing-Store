// createContext is the storage itself.
import { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shop-data.js'

import { getCategoriesAndDocs } from '../utils/firebase/firebase.utils.js';



export const CategoriesContext = createContext({
    //context needs initial value.
    categoriesMap: {},

});

// actual component
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => { //async functions in useEffect MUST be in callback and then call it after initialization.
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocs();
            // console.log(categoryMap);
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    },[]);

    // ONLY WANT TO RUN THIS ONCE, as it will always attempt to add. 
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []); 

    const value = {categoriesMap};


    return (
        <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
    );
};
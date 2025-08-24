import {create} from 'zustand';

export const useProducts = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async(newProduct) => {
        const {name, price, image} = newProduct;

        if (!name || !price || !image){
            return {success: false, message: "Please fill all fields." }
        }

        const response = await fetch ("api/products", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        const data = await response.json();
        set((state) => ({products: [...state.products, data.data]}));
         return {success: true, message: "Product created!" };
    },
    getAllProducts: async () => {
        const response = await fetch("api/products");
        const data = await response.json();
        set({products: data.data})
    }

}))
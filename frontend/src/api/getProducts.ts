import type { Product } from "../types/product"

const BASE_URL = "http://localhost:3000/api/search"

export async function getProducts(query = ""): Promise<Product[]> {
    const url = query ? `${BASE_URL}?q=${query}` : BASE_URL;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error fetching products");
    }

    return response.json();
}
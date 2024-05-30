export const getOneProduct = async (id:number) => {
    const res = await fetch(`${process.env.API_URL}/products/${id}`);
    const data = await res.json();
    return data;
}
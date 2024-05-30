import { ProductType } from '@/types/products';

interface GetProductsParams {
    limit?: number;
    skip?: number;
    page: number;
    search?: string;
}

const API_URL = process.env.API_URL as string;

export async function getProducts({ skip = 0, limit = 12, page, search }: GetProductsParams): Promise<{
    products: ProductType[],
    total: number,
    limit: number,
    skip: number
}> {
    let url = new URL(API_URL+'/products');
    console.log('search', process.env.API_URL);
    const pagesCount = page ? page : 1;
    const limitPagination = limit ? limit : 12;
    const skipPagination = (pagesCount - 1) * limitPagination;
    if (search && search.length > 0 || search !== undefined  || search !== '') {
        url = new URL(API_URL+'/products/search');
        url.searchParams.set('q', search || '');
    }
    if (!search){
        console.log('no search');
        url = new URL( API_URL + '/products');
        console.log(limitPagination, skipPagination)
        if (limitPagination) {
            url.searchParams.set('limit', limitPagination.toString());
        }
        if (skipPagination) {
            url.searchParams.set('skip', skipPagination.toString());
        }
    }

    console.log(url.toString());

    const res = await fetch(url);
    const data = await res.json();
    return { products: data.products, total: data.total, limit: data.limit, skip: data.skip };
}

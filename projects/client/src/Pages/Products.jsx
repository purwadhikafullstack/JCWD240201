import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLabels, getProducts } from '../Features/Product/ProductSlice';
import ProductCard from '../Components/Products/ProductCard';
import useDebounce from '../Hooks/useDebounce';
import Pagination from '../Components/Layout/Pagination';
import { getAllCategories } from '../Features/Category/CategorySlice';
import { useSearchParams } from 'react-router-dom';
import ProductListSkl from '../Components/Skeleton/ProductListSkl';
import FilterBarDrawer from '../Components/Products/FilterBarDrawer';

export default function Products() {
  const dispatch = useDispatch();
  const ProductsStore = useSelector((state) => state?.products?.products);
  const totalPages = ProductsStore?.totalPage;
  const limit = 18;
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortType, setSortType] = useState(searchParams.get('sort-type') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sort-order') || '',
  );
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [categoryId, setCategoryId] = useState('');
  const productList = ProductsStore?.data?.rows;
  const debouncedSearchValue = useDebounce(search, 1200);
  const CategoryStore = useSelector((state) => state?.categories?.categories);
  const [minPrice, setMinPrice] = useState(
    searchParams.get('min-price') || '0',
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get('max-price') || '1000000',
  );
  const debouncedMinPrice = useDebounce(minPrice, 1200, 0);
  const debouncedMaxPrice = useDebounce(maxPrice, 1200, 0);
  let productMap;
  const categoriesMap = CategoryStore?.map((value, index) => {
    return (
      <div key={`cat${index}`} className="w-full">
        <div
          onClick={() => {
            setCategory(value.category_name);
            setCategoryId(value.category_id);
          }}
          className="btn btn-ghost btn-sm flex justify-start w-full"
        >
          <div>{value.category_name}</div>
        </div>
      </div>
    );
  });
  if (category) {
    productMap = productList?.map((value, index) => {
      return (
        <div key={`product${index}`} className="py-3 flex justify-center">
          <ProductCard data={value.product} />
        </div>
      );
    });
  } else {
    productMap = productList?.map((value, index) => {
      return (
        <div key={`product${index}`} className="py-3 flex justify-center">
          <ProductCard data={value} />
        </div>
      );
    });
  }
  const getCat = async () => {
    await dispatch(getAllCategories());
  };
  const getProductsAsync = async () => {
    await dispatch(
      getProducts({
        page,
        limit,
        search: debouncedSearchValue,
        sortType,
        sortOrder,
        // category_id: categoryId,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
      }),
    );
  };
  const getLabelsAsync = async () => {
    await dispatch(
      getLabels({
        page,
        limit,
        search: debouncedSearchValue,
        category,
        sortType,
        sortOrder,
      }),
    );
  };
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchValue, sortType, sortOrder, category]);
  useEffect(() => {
    getCat();
  }, []);
  useEffect(() => {
    if (page) {
      queryParams['page'] = page;
    }
    if (debouncedSearchValue) {
      queryParams['search'] = debouncedSearchValue;
    }
    if (sortType) {
      queryParams['sort-type'] = sortType;
    }
    if (sortOrder) {
      queryParams['sort-order'] = sortOrder;
    }
    if (category) {
      queryParams['category'] = category;
    }
    if (minPrice) {
      queryParams['min-price'] = debouncedMinPrice;
    }
    if (maxPrice) {
      queryParams['max-price'] = debouncedMaxPrice;
    }
    setSearchParams(queryParams);
    if (debouncedSearchValue) {
      getProductsAsync();
      setCategory('');
    } else if (category) {
      getLabelsAsync();
    } else {
      getProductsAsync();
    }
  }, [
    page,
    debouncedSearchValue,
    sortType,
    sortOrder,
    category,
    debouncedMaxPrice,
    debouncedMinPrice,
  ]);
  return (
    <>
      <div className="flex ">
        <div className="hidden w-52 h-fit md:block px-1 card bg-base-100 shadow-xl pb-3">
          <article className="prose">
            <h3 className="py-3 px-2">Categories</h3>
          </article>
          <div
            onClick={() => setCategory('')}
            className="btn btn-ghost btn-sm flex justify-start min-w-[170px]"
          >
            <div>All</div>
          </div>
          {categoriesMap}
        </div>
        <div className="flex justify-center w-full">
          <div className="flex max-w-6xl flex-col w-full justify-start ">
            <div className="flex sticky top-3 w-full px-5 mb-3 z-10 justify-center">
              <FilterBarDrawer
                value={search}
                setSearch={setSearch}
                setSortType={setSortType}
                setSortOrder={setSortOrder}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                sortBy={true}
                priceRange={true}
                option={[
                  { text: 'Name A to Z', sortType: 'name', sortOrder: 'ASC' },
                  { text: 'Name Z to A', sortType: 'name', sortOrder: 'DESC' },
                  {
                    text: 'Price low to high',
                    sortType: 'price',
                    sortOrder: 'ASC',
                  },
                  {
                    text: 'Price high to low',
                    sortType: 'price',
                    sortOrder: 'DESC',
                  },
                ]}
              />
            </div>
            {/* {!productMap?.length ? (
              <div className="flex py-10 w-full justify-center">
                <article className="prose">
                  <h4>--- No search result ---</h4>
                </article>
              </div>
            // ) : ( */}
            {productMap ? (
              !productMap?.length ? (
                <div className="flex py-10 w-full justify-center">
                  <article className="prose">
                    <h4>--- No search result ---</h4>
                  </article>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                  {productMap}
                </div>
              )
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                <ProductListSkl limit={limit} />
              </div>
            )}

            {productMap?.length ? (
              <div className="my-5">
                <Pagination
                  setPage={setPage}
                  page={page}
                  totalPages={totalPages}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

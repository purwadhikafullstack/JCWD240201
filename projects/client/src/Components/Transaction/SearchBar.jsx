import { Link } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../Features/Category/CategorySlice';

export default function SearchBar(props) {
  const dispatch = useDispatch();
  const CategoryStore = useSelector((state) => state?.categories.categories);
  const categoriesMap = CategoryStore?.data?.map((value, index) => {
    return (
      <li key={`Category${index}`}>
        <div>{value.category_name}</div>
      </li>
    );
  });
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full mx-3"
          onChange={(e) => {
            props?.setSearch(e.target.value);
          }}
        />
        {/* <div className="dropdown dropdown-end border hidden md:block">
          <label tabIndex={0} className="btn btn-secondary">
            Category <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            {categoriesMap}
          </ul>
        </div> */}
        <div
          className={`dropdown dropdown-end border hidden md:${
            props.sortBy ? 'block' : 'hidden'
          }`}
        >
          <label tabIndex={0} className="btn btn-secondary">
            Sort by <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <div
                onClick={() => {
                  props?.setSortType('name');
                  props?.setSortOrder('ASC');
                }}
              >
                Name A to Z
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  props?.setSortType('name');
                  props?.setSortOrder('DESC');
                }}
              >
                Name Z to A
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  props?.setSortType('price');
                  props?.setSortOrder('ASC');
                }}
              >
                Price low to high
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  props?.setSortType('price');
                  props?.setSortOrder('DESC');
                }}
              >
                Price high to low
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

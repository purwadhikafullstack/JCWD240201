import { Link } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCategories,
  getCategories,
} from '../../Features/Category/CategorySlice';

export default function FilterBar(props) {
  const dispatch = useDispatch();
  const CategoryStore = useSelector((state) => state?.categories);
  console.log(CategoryStore)
  useEffect(() => {
    dispatch(getAllCategories);
    
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            props?.setSearch(e.target.value);
          }}
        />
        <div className="dropdown dropdown-end border">
          <label tabIndex={0} className="btn btn-secondary">
            Category <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <Link to="/products">SHOP</Link>
            </li>
            <li>
              <Link to="/discussions">QNA</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
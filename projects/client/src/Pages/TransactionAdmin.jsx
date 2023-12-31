import React, { useState, useEffect } from 'react';
import FilterBar from '../Components/Products/FilterBar';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../Hooks/useDebounce';
import Pagination from '../Components/Layout/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactionSlice } from '../Features/Transaction/TransactionSlice';
import TransactionCardAdmin from '../Components/Transaction/TransactionCardAdmin';

import { MdArrowDropDown } from 'react-icons/md';
import { getAllTxStatus } from '../Features/TransactionStatus/TransactionStatusSlice';
import { FaPage4 } from 'react-icons/fa6';

const TransactionAdmin = () => {
  const dispatch = useDispatch();
  const { transactions, totalPages } = useSelector(
    (state) => state.transaction,
  );
  const { txStatuses } = useSelector((state) => state.txStatus);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sortType, setSortType] = useState(searchParams.get('sortType') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || '',
  );
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const debouncedSearchValue = useDebounce(search, 1200);
  const [isCheck, setIsCheck] = useState(false);
  const [toggle, setToggle] = useState(false);
  let queryParams = {};

  useEffect(() => {
    dispatch(getAllTxStatus());
  }, []);
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchValue, sortType, sortOrder]);

  useEffect(() => {
    if (Number(searchParams.get('page')) === page) {
      setPage(1);
      // queryParams['page'] = 1;
    }
    if (page) {
      queryParams['page'] = page;
    }
    if (debouncedSearchValue) {
      queryParams['search'] = debouncedSearchValue;
    }
    if (sortType) {
      queryParams['sortType'] = sortType;
    }
    if (sortOrder) {
      queryParams['sortOrder'] = sortOrder;
    }
    if (selectedStatus) {
      queryParams['status'] = selectedStatus;
    }
    setSearchParams(queryParams);
    dispatch(
      getAllTransactionSlice({
        selectedStatusId,
        debouncedSearchValue,
        page,
        limitPage: 5,
        sortType,
        sortOrder,
      }),
    );
  }, [page, debouncedSearchValue, sortType, sortOrder, toggle, selectedStatus]);

  return (
    <div className="min-h-[100vh]">
      <div className="head flex justify-between">
        <article className="prose">
          <h2>All Transaction</h2>
        </article>
        <div className="flex gap-2 hidden">
          <button className="btn btn-sm">Download PDF</button>
          <button className="btn btn-sm">Excel</button>
        </div>
      </div>
      <div className="filter flex  gap-3 mb-4 justify-center">
        <FilterBar
          setSearch={setSearch}
          setSortType={setSortType}
          setSortOrder={setSortOrder}
          sortBy={true}
          option={[
            { text: 'Latest', sortType: 'createdAt', sortOrder: 'DESC' },
            { text: 'Oldest', sortType: 'createdAt', sortOrder: 'ASC' },
            {
              text: 'Total Price low to high',
              sortType: 'total_price',
              sortOrder: 'ASC',
            },
            {
              text: 'Total Price to low',
              sortType: 'total_price',
              sortOrder: 'DESC',
            },
          ]}
        />
        {/* </div> */}
        <div className="dropdown dropdown-end  md:block">
          <label tabIndex={0} className="btn btn-primary text-white">
            Filter By <MdArrowDropDown size={25} />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li key={`TxS0`}>
              <div
                onClick={() => {
                  setSelectedStatusId(null);
                  setSelectedStatus('All');
                }}
              >
                All
              </div>
            </li>
            {txStatuses.map((value, index) => {
              return (
                <li key={`TxS${index}`}>
                  <div
                    onClick={() => {
                      setSelectedStatusId(value.id);
                      setSelectedStatus(value.status);
                    }}
                  >
                    {value.status}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="AllTransaction px-3">
        <div className="transactions">
          {transactions.map((value, index) => {
            return (
              <TransactionCardAdmin
                key={`tCard${index}`}
                tx={value}
                setToggle={() => setToggle(!toggle)}
              />
            );
          })}
        </div>
      </div>
      {totalPages > 0 && (
        <div className="pagination ">
          <Pagination setPage={setPage} page={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default TransactionAdmin;

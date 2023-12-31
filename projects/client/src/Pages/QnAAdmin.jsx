import { useEffect, useState } from 'react';
import { getQuestionCategory, getQuestions } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCardAdmin from '../Components/QnA/QuestionCardAdmin';
import Pagination from '../Components/Layout/Pagination';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../Hooks/useDebounce';
import FilterBarDrawer from '../Components/Products/FilterBarDrawer';

export default function QnAAdmin() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let queryParams = {};
  const QnAStore = useSelector((state) => state?.QnA);
  const questionList = QnAStore?.questions?.data?.rows;
  const questionMap = questionList?.map((value, index) => {
    return <QuestionCardAdmin data={value} key={`question${index}`} />;
  });
  const totalPages = QnAStore?.questions?.totalPage;
  const questionCategories = QnAStore?.categories;
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [questionCategory, setQuestionCategory] = useState(
    searchParams.get('category') || '',
  );
  const debouncedSearchValue = useDebounce(search, 1200);
  const [sortType, setSortType] = useState(searchParams.get('sort-type') || '');
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sort-order') || '',
  );
  const limit = 2;
  const questionCategoriesMap = questionCategories?.data?.map(
    (value, index) => {
      return (
        <div
          key={`cat${index}`}
          onClick={() => setQuestionCategory(value.id)}
          className="btn btn-outline btn-accent btn-xs mx-3"
        >
          {value.name}
        </div>
      );
    },
  );

  useEffect(() => {
    if (page) {
      queryParams['page'] = page;
    }
    if (questionCategory) {
      queryParams['category'] = questionCategory;
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
    setSearchParams(queryParams);
    dispatch(getQuestionCategory());
    dispatch(
      getQuestions({
        page,
        limit: limit,
        question_category_id: questionCategory,
        search: debouncedSearchValue,
        sortOrder,
        sortType,
      }),
    );
  }, [page, questionCategory, debouncedSearchValue, sortOrder, sortType]);

  return (
    <>
      <article className="prose">
        <h2>Q&A</h2>
      </article>
      <div className="px-5">
        <div className="px-5 flex w-full justify-center">
          <div className="w-full max-w-3xl">
            <div>
              <FilterBarDrawer
                value={search}
                setSearch={setSearch}
                setSortType={setSortType}
                setSortOrder={setSortOrder}
                option={[
                  {
                    text: 'Oldest to latest',
                    sortType: 'updatedAt',
                    sortOrder: 'ASC',
                  },
                  {
                    text: 'Latest to oldest',
                    sortType: 'updatedAt',
                    sortOrder: 'DESC',
                  },
                ]}
              />
              <article className="prose">
                <h2>Categories:</h2>
              </article>
              <div className="flex justify-center items-center">
                <div className=" flex overflow-auto items-center p-3">
                  <div
                    onClick={() => {
                      setQuestionCategory('');
                    }}
                    className="btn btn-outline btn-accent btn-xs mx-3"
                  >
                    all
                  </div>
                  {questionCategoriesMap}
                </div>
              </div>
              <div>
                {questionList?.length ? (
                  questionMap
                ) : (
                  <div className="flex w-full justify-center pt-5">
                    --- No questions found ---
                  </div>
                )}
              </div>
            </div>
            {questionList?.length ? (
              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

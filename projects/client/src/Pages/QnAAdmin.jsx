import { useEffect, useState } from 'react';
import { getQuestions } from '../Features/QnA/QnASlice';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCardAdmin from '../Components/QnA/QuestionCardAdmin';
import Pagination from '../Components/Layout/Pagination';
import FilterBar from '../Components/Products/FilterBar';
import { useSearchParams } from 'react-router-dom';

export default function QnAAdmin() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const QnAStore = useSelector((state) => state?.QnA);
  const questionList = QnAStore?.questions?.data?.rows;
  const questionMap = questionList?.map((value, index) => {
    return <QuestionCardAdmin data={value} key={`question${index}`} />;
  });
  const totalPages = QnAStore?.questions?.totalPage;
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');


  useEffect(() => {
    dispatch(getQuestions({ page, limit: 2 }));
  }, [page, dispatch]);

  return (
    <>
      <div className="px-5">
        <div className="px-5 flex w-full justify-center">
          <div className="w-full max-w-3xl">
            <div>
              <article className="prose">
                <h2>QnA</h2>
              </article>
              <FilterBar />
              <div>{questionMap}</div>
            </div>
            <Pagination setPage={setPage} page={page} totalPages={totalPages} />
            {/* <div className="flex justify-center">
              <div className="join w-64 grid grid-cols-2">
                <button
                  onClick={() => prev()}
                  className="join-item btn btn-outline"
                >
                  {'<< Previous'}
                </button>
                <button
                  onClick={() => next()}
                  className="join-item btn btn-outline"
                >
                  {'Next >>'}
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

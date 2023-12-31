import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createMarkup } from '../../Helper/createMarkup';
import { useEffect, useState } from 'react';

export default function QuestionCard(props) {
  const date = new Date(props?.data?.createdAt);
  const dateFormatted = date
    .toLocaleDateString('EN-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .split(',');
  const question = props?.data?.question?.question || props?.data?.question;
  const title = props?.data?.question?.title || props?.data?.title;
  const id = props?.data?.question?.id || props?.data?.id;
  const prevPathname = props?.pathname;
  const isAnswered = props?.data?.answers?.length;
  const [label, setLabel] = useState(false);
  useEffect(() => {
    if (prevPathname) {
      setLabel(true);
    }
  }, []);
  return (
    <>
      <Link to={`/discussions/details/${id}`}>
        <div className="card card-compact w-full my-5 bg-base-100 shadow-xl hover:cursor-pointer">
          <div className="flex justify-between px-3 pt-1">
            <div className="flex items-center justify-start px-3 ">
              {label ? (
                isAnswered ? (
                  <div className="badge badge-accent badge-lg mx-6">Status: Answered</div>
                ) : (
                  <div className="badge badge-primary badge-lg mx-6">Status: Not answered</div>
                )
              ) : null}
              {/* <div className="label">{date}</div> */}
            </div>
            <div className="label">
              {dateFormatted[0]}, {dateFormatted[1]} {dateFormatted[2]}
            </div>
          </div>
          <div className="card-body ">
            <article className="prose">
              <h4 className="truncate"> {title}</h4>
              {/* <p className="truncate" >{question}</p> */}
              <p
                className=" line-clamp-2"
                dangerouslySetInnerHTML={createMarkup(question)}
              ></p>
            </article>
          </div>
        </div>
      </Link>
    </>
  );
}

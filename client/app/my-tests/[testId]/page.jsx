"use client";
import { publicRequest } from "@/app/lib/requestMethods";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Page = ({ params: { testId } }) => {
  const [points, setPoints] = useState({
    userPoints: null,
    totalPoints: null,
  });
  const [attempts, setAttempts] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // console.log(questions, answers);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        // await new Promise((resole) => setTimeout(resole, 2000));
        const { data } = await publicRequest.get(`/questions/${testId}`);
        setQuestions(data);
        setAnswers(data.map((item) => item.answer));
        const userAnswersObj = {};

        for (let i = 0; i < data?.length; i++) {
          if (data[i]?.id in userAnswersObj) {
            return;
          }
          userAnswersObj[data[i]?.id] = undefined;
        }

        setUserAnswers(userAnswersObj);
        setPoints((prev) => ({ ...prev, totalPoints: data?.length * 10 }));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  function handleSubmitTest() {
    let TP = 0;

    for (let i = 0; i < answers.length; i++) {
      if (Object.values(userAnswers)[i] !== undefined) {
        // console.log(Object.values(userAnswers)[i]);
        setAttempts((prev) => prev + 1);
      }

      if (answers[i] === parseInt(Object.values(userAnswers)[i])) {
        // console.log(true);
        TP += 10;
      }
    }

    console.log({ points: TP, attempts });
    toast((t) => (
      <div className="flex flex-col">
        <div>
          Your points: <b>{TP}</b>
        </div>
        <div>
          Total points: <b>{points.totalPoints}</b>
        </div>
        <div>
          Attempted: <b>{attempts}</b>
        </div>
      </div>
    ));
  }
  return (
    <section>
      <div className="grid grid-cols-6 gap-4">
        {isLoading ? (
          Array.from({ length: 30 }).map((_, key) => {
            return (
              <div
                key={key}
                className="animate-pulse bg-gray-300 aspect-square w-40 rounded-md"
              ></div>
            );
          })
        ) : questions.length <= 0 ? (
          <div>No questions for you</div>
        ) : (
          questions?.map(({ id, question }) => {
            return (
              <div
                key={id}
                className="bg-white shadow rounded-md p-4 flex flex-col items-end justify-end"
              >
                {question.map((item, key) => {
                  return (
                    <div
                      className="flex justify-end text-lg font-bold"
                      key={key}
                    >
                      {item}
                    </div>
                  );
                })}
                <div>
                  <input
                    type="text"
                    className="bg-gray-100 w-full text-end px-1 py-3 rounded outline-none"
                    placeholder="Answer"
                    name={id}
                    onChange={(e) => {
                      setUserAnswers((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
        <div className="col-span-6 text-white">
          <button
            className="w-full p-2 rounded bg-primary"
            onClick={handleSubmitTest}
          >
            Submit test
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;

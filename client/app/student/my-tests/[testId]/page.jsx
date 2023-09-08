"use client";
import { getCookie } from "@/app/lib/cookies";
import { publicRequest } from "@/app/lib/requestMethods";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Page = ({ params: { testId } }) => {
  const [points, setPoints] = useState({
    totalPoints: null,
  });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});
  const router = useRouter();

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

  async function handleSubmitTest() {
    let TP = 0;
    let attempted = 0;

    for (let i = 0; i < answers.length; i++) {
      if (
        Object.values(userAnswers)[i] !== undefined &&
        Object.values(userAnswers)[i] !== ""
      ) {
        attempted++;
      }

      if (answers[i] === parseInt(Object.values(userAnswers)[i])) {
        TP += 10;
      }
    }

    try {
      const resp = await publicRequest.post(`/results`, {
        student_id: getCookie("student_id"),
        test_id: testId,
        student_points: TP,
        total_points: points.totalPoints,
        student_attempted: attempted,
        total_questions: questions.length,
      });
      if (resp.status === 200) {
        router.push(`/student/result/${getCookie("student_id")}`);
      }
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }

    console.log({ points: TP });

    // toast((t) => (
    //   <div className="flex flex-col">
    //     <div>
    //       Your points: <b>{TP}</b>
    //     </div>
    //     <div>
    //       Total points: <b>{points.totalPoints}</b>
    //     </div>
    //     <div>
    //       Attempted: <b>{attempted}</b>
    //     </div>
    //   </div>
    // ));
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

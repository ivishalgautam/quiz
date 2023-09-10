"use client";
import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";

const Question = () => {
  const [inputLength, setInputLength] = useState(1);
  const [questionStates, setQuestionStates] = useState(
    Array.from({ length: inputLength }, () => ({
      values: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
      },
      answer: "",
    }))
  );
  // useEffect(() => {}, []);
  console.log(questionStates, inputLength);

  const handleQuestionInputChange = (e, index) => {
    const { name, value } = e.target;

    setQuestionStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = {
        ...updatedStates[index],
        values: {
          ...updatedStates[index].values,
          [name]: value,
        },
      };
      return updatedStates;
    });
  };

  const handleAnswerInputChange = (e, index) => {
    const { value } = e.target;
    setQuestionStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = {
        ...updatedStates[index],
        answer: value,
      };
      return updatedStates;
    });
  };

  const handleAddQuestion = () => {
    setInputLength((prev) => prev + 1);

    setQuestionStates((prevStates) => [
      ...prevStates,
      {
        values: {
          value1: "",
          value2: "",
          value3: "",
          value4: "",
        },
        answer: "",
      },
    ]);
  };
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        {questionStates.map((questionState, index) => (
          <div key={index}>
            <p className="text-center">{`Question No. - ${index + 1}`}</p>
            {Object.keys(questionState.values).map((key) => (
              <div className="relative flex flex-col justify-end" key={key}>
                <input
                  name={key}
                  type="text"
                  value={questionState.values[key]}
                  className="my-input peer bg-white text-gray-950"
                  placeholder="type here"
                  onChange={(e) => handleQuestionInputChange(e, index)}
                />
                <label htmlFor={key} className="my-label">
                  Value
                </label>
              </div>
            ))}
            <div className="relative flex flex-col justify-end">
              <input
                type="text"
                id={`answer${index}`}
                name={`answer${index}`}
                value={questionState.answer}
                className="my-input peer"
                placeholder=""
                autoComplete="off"
                onChange={(e) => handleAnswerInputChange(e, index)}
              />
              <label htmlFor={`answer${index}`} className="my-label">
                Answer
              </label>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center">
          <button type="button" onClick={() => handleAddQuestion()}>
            <GrAddCircle size={50} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Question;

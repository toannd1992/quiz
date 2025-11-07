import React from "react";

const Result = ({ reset, review, countAnswers, totalQuestion }) => {
  return (
    <div>
      <h2>Kết quả</h2>
      <p className="result">
        Bạn đã trả lời đúng {countAnswers}/{totalQuestion} câu 👏👏👏
      </p>
      <div className="resultButtonsContainer">
        <button className="result-button" onClick={review}>
          Xem lại
        </button>
        <button className="result-button" onClick={reset}>
          Làm lại
        </button>
      </div>
    </div>
  );
};

export default Result;

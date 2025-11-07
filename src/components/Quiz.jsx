import React, { useEffect, useState } from "react";
import Result from "./Result";

const data = [
  {
    question: "Thư viện React được phát triển bởi ai?",
    options: ["Google", "Facebook (Meta)", "Microsoft", "Twitter"],
    answer: "Facebook (Meta)",
  },
  {
    question:
      "Câu lệnh nào dùng để tạo một component trong React bằng function?",
    options: [
      "function MyComponent() { return <div>Hello</div>; }",
      "class MyComponent = <div>Hello</div>;",
      "createComponent(MyComponent)",
      "new Component(MyComponent)",
    ],
    answer: "function MyComponent() { return <div>Hello</div>; }",
  },
  {
    question: "JSX trong React là gì?",
    options: [
      "Một framework JavaScript",
      "Cú pháp mở rộng cho phép viết HTML trong JavaScript",
      "Một loại CSS đặc biệt",
      "Một API của React Router",
    ],
    answer: "Cú pháp mở rộng cho phép viết HTML trong JavaScript",
  },
  {
    question: "Hook nào dùng để quản lý state trong functional component?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    answer: "useState",
  },
  {
    question: "Hook `useEffect` thường được dùng để làm gì?",
    options: [
      "Tạo component mới",
      "Xử lý side effects như gọi API hoặc thao tác DOM",
      "Tăng tốc độ render",
      "Quản lý props",
    ],
    answer: "Xử lý side effects như gọi API hoặc thao tác DOM",
  },
  {
    question: "React sử dụng cơ chế gì để cập nhật giao diện hiệu quả?",
    options: ["Shadow DOM", "Virtual DOM", "Real DOM", "Custom DOM"],
    answer: "Virtual DOM",
  },
  {
    question: "Trong React, props là gì?",
    options: [
      "Một kiểu state đặc biệt",
      "Các thuộc tính được truyền từ component cha sang con",
      "Các biến toàn cục",
      "Một loại hook",
    ],
    answer: "Các thuộc tính được truyền từ component cha sang con",
  },
  {
    question: "ReactDOM.render() dùng để làm gì?",
    options: [
      "Render một component React vào DOM thật",
      "Tạo component mới",
      "Xóa component khỏi DOM",
      "Kết nối tới server",
    ],
    answer: "Render một component React vào DOM thật",
  },
  {
    question:
      "Phương thức nào trong class component được gọi sau khi component được render lần đầu?",
    options: [
      "componentWillMount()",
      "componentDidMount()",
      "componentWillUnmount()",
      "componentDidUpdate()",
    ],
    answer: "componentDidMount()",
  },
  {
    question: "Key trong React dùng để làm gì?",
    options: [
      "Định danh duy nhất cho mỗi phần tử trong danh sách",
      "Lưu trữ dữ liệu tạm thời",
      "Mã hóa dữ liệu",
      "Tạo hiệu ứng animation",
    ],
    answer: "Định danh duy nhất cho mỗi phần tử trong danh sách",
  },
  {
    question:
      "Khi cần chia nhỏ ứng dụng React thành các phần có thể tái sử dụng, ta sử dụng gì?",
    options: ["Components", "Modules", "Hooks", "Packages"],
    answer: "Components",
  },
  {
    question:
      "Lệnh nào dùng để khởi tạo một dự án React mới bằng Create React App?",
    options: [
      "npx create-react-app my-app",
      "npm new react my-app",
      "react-create-app my-app",
      "npm init react-app",
    ],
    answer: "npx create-react-app my-app",
  },
];

const Quiz = () => {
  const [stt, setStt] = useState(0);
  const [questionSeleted, setQuestionSeleted] = useState("");
  const [userAnswers, setUserAnswers] = useState(Array(data.length).fill(null));
  const [isEnded, setIsEnded] = useState(false);
  const [countAnswers, setCountAnswers] = useState(0);

  useEffect(() => {
    const answer = userAnswers[stt];
    if (answer !== null) {
      setQuestionSeleted(answer);
    }

    console.log(userAnswers);
  }, [stt, userAnswers]);

  const handlNext = () => {
    if (stt < data.length - 1) {
      setQuestionSeleted("");
      setStt((prev) => prev + 1);
    } else {
      setIsEnded(true);
    }
  };
  const handlPrev = () => {
    if (stt > 0) {
      setStt((prev) => prev - 1);
    }
  };

  const handlSelect = (item) => {
    setQuestionSeleted(item);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[stt] = item;
    setUserAnswers(newUserAnswers);

    if (item === data[stt].answer) {
      setCountAnswers((countAnswers) => countAnswers + 1);
    }
  };

  const reset = () => {
    setStt(0);
    setQuestionSeleted("");
    setCountAnswers(0);
    setIsEnded(false);
    setUserAnswers(Array(data.length).fill(null));
  };

  const review = () => {
    setStt(0);
    setIsEnded(false);
  };

  if (isEnded) {
    return (
      <Result
        reset={reset}
        review={review}
        countAnswers={countAnswers}
        totalQuestion={data.length}
      />
    );
  }

  return (
    <div>
      <h2> Câu {stt + 1}</h2>
      <p className="question">{data[stt].question}</p>
      {data[stt].options.map((item, index) => (
        <button
          onClick={() => handlSelect(item, index)}
          className={`option ${questionSeleted === item && "selected"}`}
          disabled={!!questionSeleted && questionSeleted !== item}
          key={index}
        >
          {item}
        </button>
      ))}
      {questionSeleted ? (
        questionSeleted === data[stt].answer ? (
          <p className="correct-answer">Câu trả lời của bạn chính xác</p>
        ) : (
          <p className="incorrect-answer">Câu trả lời của bạn chưa chính xác</p>
        )
      ) : (
        ""
      )}

      <div className="nav-buttons">
        <button onClick={handlPrev} disabled={stt === 0}>
          Quay Lại
        </button>
        <button onClick={handlNext} disabled={!questionSeleted}>
          {stt === data.length - 1 ? "Hoàn Thành" : "Kế Tiếp"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;

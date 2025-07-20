import React, { useEffect, useState } from "react";
import axios from "axios";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/quizzes")
      .then((res) => setQuizzes(res.data.data))
      .catch((err) => console.error("Gagal mengambil data kuis:", err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Kuis Interaktif</h2>
      <p className="text-center text-gray-600 mb-8">Uji pemahamanmu seputar coding & AI!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-orange-600">{quiz.title}</h3>
            <p className="text-gray-700">Kategori: {quiz.category}</p>
            <p className="text-sm text-blue-500 mt-2">Level: {quiz.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/courses/${id}`)
      .then((res) => setCourse(res.data.data))
      .catch((err) => console.error("Gagal mengambil detail kursus:", err));
  }, [id]);

  if (!course) return <p className="p-8">Memuat data...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
      <p className="text-gray-700">{course.description}</p>
      <p className="mt-2 text-sm text-blue-500">Level: {course.level}</p>
    </div>
  );
};

export default CourseDetail;

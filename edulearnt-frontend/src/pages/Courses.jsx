import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/courses")
            .then((res) => {
                setCourses(res.data.data); // sesuaikan dengan struktur response
            })
            .catch((err) => {
                console.error("Gagal mengambil data kursus:", err);
            });
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Daftar Kursus</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <p className="text-gray-600">{course.description}</p>
                        <p className="text-sm text-blue-500 mt-2">{course.level}</p>
                        <Link to={`/courses/${course.id}`}>
                            <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                <p className="text-gray-600">{course.description}</p>
                                <p className="text-sm text-blue-500 mt-2">{course.level}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;

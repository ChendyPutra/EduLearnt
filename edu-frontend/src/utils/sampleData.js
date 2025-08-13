export const courses = [
  {
    id: 1,
    title: "Coding Dasar (SD) - Blockly",
    jenjang: "SD",
    level: "Pemula",
    duration: "4 jam",
    price: 0,
    short: "Belajar logika dasar & membuat game sederhana menggunakan Blockly.",
    long: "Kursus ini memperkenalkan dasar pemrograman lewat blok visual. Cocok untuk siswa SD.",
    tags: ["Pemula", "Blockly"],
    students: 320,
    instructor: "Sari",
    preview: "dQw4w9WgXcQ", // contoh youtube id
    syllabus: [
      { title: "Pengenalan logika", desc: "If, loop, variable sederhana" },
      { title: "Project mini", desc: "Buat game sederhana" }
    ]
  },
  {
    id: 2,
    title: "Python untuk Remaja",
    jenjang: "SMP",
    level: "Menengah",
    duration: "10 jam",
    price: 250000,
    short: "Pelajari Python dasar & buat mini project game / bot sederhana.",
    long: "Kursus Python ini menyiapkan siswa untuk membuat program nyata.",
    tags: ["Python", "Populer"],
    students: 520,
    instructor: "Bima",
    preview: "dQw4w9WgXcQ",
    syllabus: [
      { title: "Variabel & Tipe data", desc: "String, number, list" },
      { title: "Project: Game teks", desc: "Membuat game sederhana" }
    ]
  },
  {
    id: 3,
    title: "AI Vision 101",
    jenjang: "SMA",
    level: "Lanjutan",
    duration: "8 jam",
    price: 480000,
    short: "Pengenalan computer vision & deteksi objek sederhana.",
    long: "Belajar dasar-dasar computer vision dengan proyek pengenalan gambar.",
    tags: ["AI", "Vision"],
    students: 180,
    instructor: "Rani",
    preview: "",
    syllabus: [
      { title: "Pengenalan CV", desc: "Image processing dasar" },
      { title: "Model sederhana", desc: "Latih model sederhana" }
    ]
  }
];

export const shopItems = [
  {
    id: 1,
    name: "Starter Robot Kit",
    desc: "Kit motor + sensor untuk project dasar",
    price: 450000,
    stock: 20,
    shopee: "#",
    tokped: "#",
    img: "(robot)"
  },
  {
    id: 2,
    name: "AI Vision Kit",
    desc: "Camera module & board",
    price: 680000,
    stock: 10,
    shopee: "#",
    tokped: "#",
    img: "(camera)"
  },
  {
    id: 3,
    name: "Coding Card Pack",
    desc: "Kartu tantangan & latihan",
    price: 99000,
    stock: 50,
    shopee: "#",
    tokped: "#",
    img: "(card)"
  }
];

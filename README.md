# EduLearnt - Platform Pembelajaran Teknologi

Platform pembelajaran coding, AI, dan robotika untuk siswa SD, SMP, dan SMA.

## Fitur Utama

### Untuk Pengunjung Umum
- ✅ Melihat homepage dan deskripsi kursus
- ✅ Mengakses toko online (kit dan alat bantu)
- ✅ Melihat profil perusahaan & program kemitraan
- ✅ Registrasi akun untuk akses lebih lanjut

### Untuk User Terdaftar (Student)
- ✅ Mengakses materi course online sesuai jenjang dan topik
- ✅ Tracking progres belajar per modul dan jenjang
- ✅ Dashboard siswa dengan kursus aktif dan progres
- ✅ Mengikuti kuis, latihan, atau ujian (struktur sudah ada)
- ✅ Mengakses informasi tentang produk kit di toko online
- ✅ Membaca profil perusahaan dan program kemitraan

### Untuk Administrator
- ✅ Mengelola data pengguna (siswa, guru, orang tua)
- ✅ Mengatur struktur course, kategori konten
- ✅ Menyediakan informasi course offline ke sekolah mitra
- ✅ Mengelola tampilan toko online dan link ke marketplace
- ✅ Menyusun laporan statistik penggunaan platform
- ✅ Dashboard admin dengan statistik lengkap
- ✅ Mengelola feedback dan permintaan kemitraan

## Teknologi

**Backend:**
- Laravel 11
- MySQL/SQLite
- Laravel Sanctum (Authentication)
- RESTful API

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router

## Instalasi

### Otomatis (Recommended)
```bash
# Jalankan script setup
setup.bat
```

### Manual

**Backend Setup:**
```bash
# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Database setup
php artisan migrate
php artisan db:seed

# Start server
php artisan serve
```

**Frontend Setup:**
```bash
cd edu-frontend
npm install
npm run dev
```

## Default Login

**Admin:**
- Email: admin@edulearnt.com
- Password: password

**Student:**
- Email: student@test.com
- Password: password

## API Endpoints

### Public Endpoints
- `GET /api/courses` - List courses
- `GET /api/courses/{id}` - Course detail
- `GET /api/products` - List products
- `GET /api/offline-programs` - List offline programs
- `GET /api/company-profile` - Company profile
- `GET /api/stats` - Public statistics
- `POST /api/feedback` - Submit feedback
- `POST /api/register` - Student registration
- `POST /api/login-student` - Student login
- `POST /api/login-admin` - Admin login

### Student Endpoints (Requires Authentication)
- `GET /api/me` - Get user profile
- `POST /api/logout` - Logout
- `GET /api/my-progress` - Get learning progress
- `POST /api/courses/{id}/enroll` - Enroll in course
- `PUT /api/courses/{id}/progress` - Update progress

### Admin Endpoints (Requires Admin Role)
- `GET /api/admin/admin-stats` - Admin statistics
- `CRUD /api/admin/courses` - Manage courses
- `CRUD /api/admin/products` - Manage products
- `CRUD /api/admin/users` - Manage users
- `GET /api/admin/feedback` - View feedback

## Struktur Database

### Users
- id, name, email, password, role (student/admin/super_admin)

### Courses
- id, title, description, youtube_id, level (SD/SMP/SMA)

### User Progress
- user_id, course_id, progress_percentage, completed, completed_at

### Products
- id, name, description, price, image_url, marketplace_url

### Offline Programs
- id, title, description, school_name, contact_info

### Feedback
- id, name, email, message, type (contact/partnership)

## Security Features

- ✅ Input validation dan sanitization
- ✅ XSS protection dengan htmlspecialchars
- ✅ SQL injection prevention dengan Eloquent ORM
- ✅ CSRF protection
- ✅ Role-based access control
- ✅ API authentication dengan Sanctum
- ✅ Password hashing dengan bcrypt

## Kesesuaian dengan SRS

### ✅ Manajemen Pengguna dan Akses
- Registrasi dan login pengguna ✅
- Pengelolaan akun oleh admin ✅

### ✅ Course Online
- Modul pembelajaran interaktif ✅
- Tracking progres belajar ✅
- Sistem penilaian (struktur siap) ✅

### ✅ Informasi Course Offline
- Informasi program kelas tatap muka ✅

### ✅ Toko Online EduLearnKit
- Menampilkan produk kit ✅
- Link ke marketplace ✅
- Admin dapat mengelola produk ✅

### ✅ Dashboard & Laporan
- Dashboard siswa dengan progres ✅
- Dashboard admin dengan statistik ✅
- Laporan penggunaan platform ✅

### ✅ Profil Perusahaan dan Kemitraan
- Halaman profil perusahaan ✅
- Informasi program kemitraan ✅

### ✅ Interaksi & Feedback
- Formulir kontak dan feedback ✅
- Sistem notifikasi (struktur siap) ✅

## Development

```bash
# Backend development
php artisan serve --host=0.0.0.0 --port=8000

# Frontend development
cd edu-frontend
npm run dev

# Database refresh
php artisan migrate:fresh --seed
```

## Production Deployment

1. Set environment variables
2. Run `composer install --optimize-autoloader --no-dev`
3. Run `php artisan config:cache`
4. Run `php artisan route:cache`
5. Run `php artisan view:cache`
6. Build frontend: `npm run build`

## License

MIT License
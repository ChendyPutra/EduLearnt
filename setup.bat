@echo off
echo Setting up EduLearnt Project...

echo.
echo Installing Composer dependencies...
composer install

echo.
echo Copying environment file...
if not exist .env (
    copy .env.example .env
)

echo.
echo Generating application key...
php artisan key:generate

echo.
echo Running database migrations...
php artisan migrate

echo.
echo Seeding database...
php artisan db:seed

echo.
echo Setting up frontend...
cd edu-frontend
npm install
cd ..

echo.
echo Setup completed!
echo.
echo To start the project:
echo 1. Backend: php artisan serve
echo 2. Frontend: cd edu-frontend && npm run dev
echo.
echo Default admin login:
echo Email: admin@edulearnt.com
echo Password: password
echo.
echo Default student login:
echo Email: student@test.com
echo Password: password

pause
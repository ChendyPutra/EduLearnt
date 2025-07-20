<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use App\Http\Middleware\VerifyCsrfToken;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Http\Middleware\HandleCors;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Alias CORS custom (jika kamu punya CorsMiddleware sendiri)
        $middleware->alias([
            'cors' => CorsMiddleware::class,
        ]);

        // Middleware web group
        $middleware->appendToGroup('web', EncryptCookies::class);
        $middleware->appendToGroup('web', StartSession::class);
        $middleware->appendToGroup('web', ShareErrorsFromSession::class);
        $middleware->appendToGroup('web', VerifyCsrfToken::class);

        // Middleware API group
        $middleware->appendToGroup('api', HandleCors::class);
        $middleware->appendToGroup('api', \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class);

        // Global middleware (opsional jika butuh CORS global)
        // $middleware->prependToMiddlewareStack(HandleCors::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

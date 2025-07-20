<?php

return [
    'paths' => [
    'api/*',
    'login',
    'logout',
    'register',
    'sanctum/csrf-cookie',
    'admin/login',
    'admin/logout',
],
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,

];

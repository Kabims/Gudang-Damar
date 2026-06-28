<?php

// Create required writable directories in /tmp (Vercel filesystem is read-only except /tmp)
$tmpDirs = [
    '/tmp/storage/app',
    '/tmp/storage/app/public',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/views',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache',
];

foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
}

// Override Laravel storage paths to point to /tmp
$_ENV['APP_STORAGE_PATH'] = '/tmp/storage';
putenv('APP_STORAGE_PATH=/tmp/storage');

try {
    require __DIR__ . '/../public/index.php';
} catch (\Throwable $e) {
    // Log to stderr so it appears in Vercel Function logs
    $msg = "\n=== LARAVEL BOOT EXCEPTION ===\n"
        . "Exception: " . get_class($e) . "\n"
        . "Message:   " . $e->getMessage() . "\n"
        . "File:      " . $e->getFile() . ":" . $e->getLine() . "\n"
        . "Trace:\n" . $e->getTraceAsString() . "\n"
        . "==============================\n";

    fwrite(STDERR, $msg);

    // Also output to browser
    http_response_code(500);
    header('Content-Type: text/plain');
    echo $msg;
}

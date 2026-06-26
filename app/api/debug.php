<?php
// Diagnostic file - REMOVE AFTER DEBUGGING
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<pre>";
echo "=== PHP INFO ===\n";
echo "PHP Version: " . PHP_VERSION . "\n";
echo "OS: " . PHP_OS . "\n\n";

echo "=== ENVIRONMENT VARIABLES ===\n";
$envVars = ['APP_KEY', 'APP_ENV', 'APP_DEBUG', 'DB_CONNECTION', 'DB_HOST', 'DB_DATABASE', 'VIEW_COMPILED_PATH', 'SESSION_DRIVER', 'CACHE_STORE', 'LOG_CHANNEL'];
foreach ($envVars as $var) {
    $val = getenv($var);
    if ($var === 'APP_KEY' && $val) {
        $val = substr($val, 0, 20) . '... [SET]';
    }
    echo "$var = " . ($val !== false ? $val : '[NOT SET]') . "\n";
}

echo "\n=== FILESYSTEM WRITABLE CHECK ===\n";
$dirs = [
    '/tmp',
    sys_get_temp_dir(),
];
foreach ($dirs as $dir) {
    echo "$dir: " . (is_writable($dir) ? 'WRITABLE' : 'NOT WRITABLE') . "\n";
}

$laravelDirs = [
    __DIR__ . '/../storage',
    __DIR__ . '/../storage/logs',
    __DIR__ . '/../storage/framework',
    __DIR__ . '/../storage/framework/cache',
    __DIR__ . '/../storage/framework/views',
    __DIR__ . '/../storage/framework/sessions',
    __DIR__ . '/../bootstrap/cache',
];
foreach ($laravelDirs as $dir) {
    $realDir = realpath($dir) ?: $dir;
    echo "$realDir: " . (is_writable($realDir) ? 'WRITABLE' : 'NOT WRITABLE') . "\n";
}

echo "\n=== EXTENSIONS ===\n";
$exts = ['pdo', 'pdo_pgsql', 'pdo_mysql', 'openssl', 'mbstring', 'json', 'fileinfo'];
foreach ($exts as $ext) {
    echo "$ext: " . (extension_loaded($ext) ? 'LOADED' : 'NOT LOADED') . "\n";
}

echo "\n=== LARAVEL BOOT TEST ===\n";
try {
    require __DIR__ . '/../vendor/autoload.php';
    echo "Composer autoload: OK\n";
    
    $app = require __DIR__ . '/../bootstrap/app.php';
    echo "App bootstrap: OK\n";
    echo "App environment: " . $app->environment() . "\n";
} catch (\Throwable $e) {
    echo "BOOT ERROR: " . get_class($e) . "\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}

echo "</pre>";

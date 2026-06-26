<?php
// Diagnostic file - REMOVE AFTER DEBUGGING
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ============================================================
// STEP 1: Create /tmp directories (same as api/index.php)
// ============================================================
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

echo "<pre>";
echo "=== PHP INFO ===\n";
echo "PHP Version: " . PHP_VERSION . "\n";
echo "OS: " . PHP_OS . "\n\n";

echo "=== ENVIRONMENT VARIABLES ===\n";
$envVars = ['APP_KEY', 'APP_ENV', 'APP_DEBUG', 'DB_CONNECTION', 'DB_URL', 'VIEW_COMPILED_PATH', 'SESSION_DRIVER', 'CACHE_STORE', 'LOG_CHANNEL', 'VERCEL'];
foreach ($envVars as $var) {
    $val = getenv($var);
    if (in_array($var, ['APP_KEY', 'DB_URL', 'DB_PASSWORD']) && $val) {
        $val = substr($val, 0, 30) . '... [SET]';
    }
    echo "$var = " . ($val !== false ? $val : '[NOT SET]') . "\n";
}

echo "\n=== SERVER SUPERGLOBAL ===\n";
$serverClean = $_SERVER;
foreach (['DB_URL', 'APP_KEY', 'DB_PASSWORD', 'HTTP_AUTHORIZATION', 'PHP_AUTH_PW'] as $key) {
    if (isset($serverClean[$key])) {
        $serverClean[$key] = '*** HIDDEN ***';
    }
}
print_r($serverClean);

echo "\n=== /tmp FILESYSTEM CHECK ===\n";
foreach ($tmpDirs as $dir) {
    $exists = is_dir($dir) ? 'EXISTS' : 'MISSING';
    $writable = is_writable($dir) ? 'WRITABLE' : 'NOT WRITABLE';
    echo "$dir: $exists | $writable\n";
}

echo "\n=== EXTENSIONS ===\n";
foreach (['pdo', 'pdo_pgsql', 'openssl', 'mbstring'] as $ext) {
    echo "$ext: " . (extension_loaded($ext) ? 'LOADED' : 'NOT LOADED') . "\n";
}

echo "\n=== FULL REQUEST SIMULATION (with /tmp dirs created) ===\n";
try {
    $_SERVER['REQUEST_URI'] = '/up';
    $_SERVER['REQUEST_METHOD'] = 'GET';
    ob_start();
    require __DIR__ . '/../public/index.php';
    $output = ob_get_clean();
    echo "Request to /up: SUCCESS\n";
    echo "Response: " . $output . "\n";
} catch (\Throwable $e) {
    ob_get_clean();
    echo "Request FAILED!\n";
    echo "Exception: " . get_class($e) . "\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
}

echo "</pre>";

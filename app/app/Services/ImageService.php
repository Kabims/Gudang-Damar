<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Exception;

class ImageService
{
    private string $promptSuffix =
        ', product photography, white background, studio lighting, ' .
        'sharp focus, photorealistic, high quality, 4k';


    private function translateToEnglish(string $text): string
    {
        try {
            $response = Http::timeout(10)
                ->get('https://api.mymemory.translated.net/get', [
                    'q'        => $text,
                    'langpair' => 'id|en',
                ]);

            if ($response->successful()) {
                $translated = $response->json('responseData.translatedText');
                if ($translated && strtolower($translated) !== strtolower($text)) {
                    Log::info('ImageService translated: "' . $text . '" → "' . $translated . '"');
                    return $translated;
                }
            }
        } catch (Exception $e) {
            Log::warning('ImageService translate failed: ' . $e->getMessage());
        }

        return $text;
    }

    public function generate(string $prompt, array $options = [], int $maxRetries = 3): string
    {
        $translatedPrompt = $this->translateToEnglish($prompt);

        $fullPrompt = $translatedPrompt . $this->promptSuffix;

        Log::info('Pollinations original prompt : ' . $prompt);
        Log::info('Pollinations full prompt (EN): ' . $fullPrompt);

        $encodedPrompt = urlencode($fullPrompt);
        $seed = rand(1, 9999999);
        
        // Kembalikan URL langsung dari Pollinations AI dengan seed acak agar gambar selalu baru
        return "https://image.pollinations.ai/prompt/{$encodedPrompt}?width=1024&height=1024&nologo=true&seed={$seed}";
    }
}
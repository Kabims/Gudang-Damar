import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\MobileApi\ImageMobileApiController::generate
 * @see app/Http/Controllers/MobileApi/ImageMobileApiController.php:38
 * @route '/mobile-api/generate-image'
 */
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/mobile-api/generate-image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\ImageMobileApiController::generate
 * @see app/Http/Controllers/MobileApi/ImageMobileApiController.php:38
 * @route '/mobile-api/generate-image'
 */
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\ImageMobileApiController::generate
 * @see app/Http/Controllers/MobileApi/ImageMobileApiController.php:38
 * @route '/mobile-api/generate-image'
 */
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\ImageMobileApiController::generate
 * @see app/Http/Controllers/MobileApi/ImageMobileApiController.php:38
 * @route '/mobile-api/generate-image'
 */
    const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\ImageMobileApiController::generate
 * @see app/Http/Controllers/MobileApi/ImageMobileApiController.php:38
 * @route '/mobile-api/generate-image'
 */
        generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generate.url(options),
            method: 'post',
        })
    
    generate.form = generateForm
const ImageMobileApiController = { generate }

export default ImageMobileApiController
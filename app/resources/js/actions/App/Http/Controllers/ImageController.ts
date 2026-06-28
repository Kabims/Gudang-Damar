import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ImageController::generate
 * @see app/Http/Controllers/ImageController.php:15
 * @route '/generate-image'
 */
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/generate-image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImageController::generate
 * @see app/Http/Controllers/ImageController.php:15
 * @route '/generate-image'
 */
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImageController::generate
 * @see app/Http/Controllers/ImageController.php:15
 * @route '/generate-image'
 */
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImageController::generate
 * @see app/Http/Controllers/ImageController.php:15
 * @route '/generate-image'
 */
    const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImageController::generate
 * @see app/Http/Controllers/ImageController.php:15
 * @route '/generate-image'
 */
        generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generate.url(options),
            method: 'post',
        })
    
    generate.form = generateForm
const ImageController = { generate }

export default ImageController
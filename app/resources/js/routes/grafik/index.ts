import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\GrafikController::index
 * @see app/Http/Controllers/GrafikController.php:21
 * @route '/grafik'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/grafik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GrafikController::index
 * @see app/Http/Controllers/GrafikController.php:21
 * @route '/grafik'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GrafikController::index
 * @see app/Http/Controllers/GrafikController.php:21
 * @route '/grafik'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GrafikController::index
 * @see app/Http/Controllers/GrafikController.php:21
 * @route '/grafik'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GrafikController::index
 * @see app/Http/Controllers/GrafikController.php:21
 * @route '/grafik'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GrafikController::index
 * @see app/Http/Controllers/GrafikController.php:21
 * @route '/grafik'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GrafikController::index
 * @see app/Http/Controllers/GrafikController.php:21
 * @route '/grafik'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const grafik = {
    index: Object.assign(index, index),
}

export default grafik
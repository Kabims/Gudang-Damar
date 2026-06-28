import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::barang
 * @see app/Http/Controllers/DashboardController.php:10
 * @route '/dashboard'
 */
export const barang = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barang.url(options),
    method: 'get',
})

barang.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::barang
 * @see app/Http/Controllers/DashboardController.php:10
 * @route '/dashboard'
 */
barang.url = (options?: RouteQueryOptions) => {
    return barang.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::barang
 * @see app/Http/Controllers/DashboardController.php:10
 * @route '/dashboard'
 */
barang.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barang.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::barang
 * @see app/Http/Controllers/DashboardController.php:10
 * @route '/dashboard'
 */
barang.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: barang.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::barang
 * @see app/Http/Controllers/DashboardController.php:10
 * @route '/dashboard'
 */
    const barangForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: barang.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::barang
 * @see app/Http/Controllers/DashboardController.php:10
 * @route '/dashboard'
 */
        barangForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barang.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::barang
 * @see app/Http/Controllers/DashboardController.php:10
 * @route '/dashboard'
 */
        barangForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barang.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    barang.form = barangForm
const dashboard = {
    barang: Object.assign(barang, barang),
}

export default dashboard
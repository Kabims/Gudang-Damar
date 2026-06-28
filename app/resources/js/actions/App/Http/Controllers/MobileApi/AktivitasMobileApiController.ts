import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::index
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:16
 * @route '/mobile-api/riwayat'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mobile-api/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::index
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:16
 * @route '/mobile-api/riwayat'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::index
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:16
 * @route '/mobile-api/riwayat'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::index
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:16
 * @route '/mobile-api/riwayat'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::index
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:16
 * @route '/mobile-api/riwayat'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::index
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:16
 * @route '/mobile-api/riwayat'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::index
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:16
 * @route '/mobile-api/riwayat'
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
/**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::exportMethod
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:72
 * @route '/mobile-api/riwayat/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/mobile-api/riwayat/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::exportMethod
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:72
 * @route '/mobile-api/riwayat/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::exportMethod
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:72
 * @route '/mobile-api/riwayat/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::exportMethod
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:72
 * @route '/mobile-api/riwayat/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::exportMethod
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:72
 * @route '/mobile-api/riwayat/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::exportMethod
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:72
 * @route '/mobile-api/riwayat/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MobileApi\AktivitasMobileApiController::exportMethod
 * @see app/Http/Controllers/MobileApi/AktivitasMobileApiController.php:72
 * @route '/mobile-api/riwayat/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const AktivitasMobileApiController = { index, exportMethod, export: exportMethod }

export default AktivitasMobileApiController
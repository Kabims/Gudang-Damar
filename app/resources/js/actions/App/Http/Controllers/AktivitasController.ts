import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AktivitasController::index
 * @see app/Http/Controllers/AktivitasController.php:18
 * @route '/riwayat'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AktivitasController::index
 * @see app/Http/Controllers/AktivitasController.php:18
 * @route '/riwayat'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AktivitasController::index
 * @see app/Http/Controllers/AktivitasController.php:18
 * @route '/riwayat'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AktivitasController::index
 * @see app/Http/Controllers/AktivitasController.php:18
 * @route '/riwayat'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AktivitasController::index
 * @see app/Http/Controllers/AktivitasController.php:18
 * @route '/riwayat'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AktivitasController::index
 * @see app/Http/Controllers/AktivitasController.php:18
 * @route '/riwayat'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AktivitasController::index
 * @see app/Http/Controllers/AktivitasController.php:18
 * @route '/riwayat'
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
* @see \App\Http\Controllers\AktivitasController::exportMethod
 * @see app/Http/Controllers/AktivitasController.php:113
 * @route '/riwayat/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/riwayat/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AktivitasController::exportMethod
 * @see app/Http/Controllers/AktivitasController.php:113
 * @route '/riwayat/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AktivitasController::exportMethod
 * @see app/Http/Controllers/AktivitasController.php:113
 * @route '/riwayat/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AktivitasController::exportMethod
 * @see app/Http/Controllers/AktivitasController.php:113
 * @route '/riwayat/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AktivitasController::exportMethod
 * @see app/Http/Controllers/AktivitasController.php:113
 * @route '/riwayat/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AktivitasController::exportMethod
 * @see app/Http/Controllers/AktivitasController.php:113
 * @route '/riwayat/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AktivitasController::exportMethod
 * @see app/Http/Controllers/AktivitasController.php:113
 * @route '/riwayat/export'
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
/**
* @see \App\Http\Controllers\AktivitasController::show
 * @see app/Http/Controllers/AktivitasController.php:83
 * @route '/riwayat/{jenis}/{id}'
 */
export const show = (args: { jenis: string | number, id: string | number } | [jenis: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/riwayat/{jenis}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AktivitasController::show
 * @see app/Http/Controllers/AktivitasController.php:83
 * @route '/riwayat/{jenis}/{id}'
 */
show.url = (args: { jenis: string | number, id: string | number } | [jenis: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    jenis: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        jenis: args.jenis,
                                id: args.id,
                }

    return show.definition.url
            .replace('{jenis}', parsedArgs.jenis.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AktivitasController::show
 * @see app/Http/Controllers/AktivitasController.php:83
 * @route '/riwayat/{jenis}/{id}'
 */
show.get = (args: { jenis: string | number, id: string | number } | [jenis: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AktivitasController::show
 * @see app/Http/Controllers/AktivitasController.php:83
 * @route '/riwayat/{jenis}/{id}'
 */
show.head = (args: { jenis: string | number, id: string | number } | [jenis: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AktivitasController::show
 * @see app/Http/Controllers/AktivitasController.php:83
 * @route '/riwayat/{jenis}/{id}'
 */
    const showForm = (args: { jenis: string | number, id: string | number } | [jenis: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AktivitasController::show
 * @see app/Http/Controllers/AktivitasController.php:83
 * @route '/riwayat/{jenis}/{id}'
 */
        showForm.get = (args: { jenis: string | number, id: string | number } | [jenis: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AktivitasController::show
 * @see app/Http/Controllers/AktivitasController.php:83
 * @route '/riwayat/{jenis}/{id}'
 */
        showForm.head = (args: { jenis: string | number, id: string | number } | [jenis: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const AktivitasController = { index, exportMethod, show, export: exportMethod }

export default AktivitasController
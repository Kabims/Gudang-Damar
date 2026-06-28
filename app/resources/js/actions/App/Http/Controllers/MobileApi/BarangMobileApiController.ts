import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::index
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:13
 * @route '/mobile-api/barang'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mobile-api/barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::index
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:13
 * @route '/mobile-api/barang'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::index
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:13
 * @route '/mobile-api/barang'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::index
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:13
 * @route '/mobile-api/barang'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::index
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:13
 * @route '/mobile-api/barang'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::index
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:13
 * @route '/mobile-api/barang'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::index
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:13
 * @route '/mobile-api/barang'
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
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::store
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:27
 * @route '/mobile-api/barang'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mobile-api/barang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::store
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:27
 * @route '/mobile-api/barang'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::store
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:27
 * @route '/mobile-api/barang'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::store
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:27
 * @route '/mobile-api/barang'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::store
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:27
 * @route '/mobile-api/barang'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::show
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:82
 * @route '/mobile-api/barang/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/mobile-api/barang/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::show
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:82
 * @route '/mobile-api/barang/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::show
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:82
 * @route '/mobile-api/barang/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::show
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:82
 * @route '/mobile-api/barang/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::show
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:82
 * @route '/mobile-api/barang/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::show
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:82
 * @route '/mobile-api/barang/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::show
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:82
 * @route '/mobile-api/barang/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::update
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:91
 * @route '/mobile-api/barang/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/mobile-api/barang/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::update
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:91
 * @route '/mobile-api/barang/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::update
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:91
 * @route '/mobile-api/barang/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::update
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:91
 * @route '/mobile-api/barang/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::update
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:91
 * @route '/mobile-api/barang/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::updateStok
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:150
 * @route '/mobile-api/barang/{id}/stok'
 */
export const updateStok = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStok.url(args, options),
    method: 'post',
})

updateStok.definition = {
    methods: ["post"],
    url: '/mobile-api/barang/{id}/stok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::updateStok
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:150
 * @route '/mobile-api/barang/{id}/stok'
 */
updateStok.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return updateStok.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::updateStok
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:150
 * @route '/mobile-api/barang/{id}/stok'
 */
updateStok.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStok.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::updateStok
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:150
 * @route '/mobile-api/barang/{id}/stok'
 */
    const updateStokForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStok.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::updateStok
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:150
 * @route '/mobile-api/barang/{id}/stok'
 */
        updateStokForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStok.url(args, options),
            method: 'post',
        })
    
    updateStok.form = updateStokForm
/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::catatPenjualan
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:192
 * @route '/mobile-api/barang/{id}/penjualan'
 */
export const catatPenjualan = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: catatPenjualan.url(args, options),
    method: 'post',
})

catatPenjualan.definition = {
    methods: ["post"],
    url: '/mobile-api/barang/{id}/penjualan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::catatPenjualan
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:192
 * @route '/mobile-api/barang/{id}/penjualan'
 */
catatPenjualan.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return catatPenjualan.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::catatPenjualan
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:192
 * @route '/mobile-api/barang/{id}/penjualan'
 */
catatPenjualan.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: catatPenjualan.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::catatPenjualan
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:192
 * @route '/mobile-api/barang/{id}/penjualan'
 */
    const catatPenjualanForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: catatPenjualan.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::catatPenjualan
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:192
 * @route '/mobile-api/barang/{id}/penjualan'
 */
        catatPenjualanForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: catatPenjualan.url(args, options),
            method: 'post',
        })
    
    catatPenjualan.form = catatPenjualanForm
/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::destroy
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:236
 * @route '/mobile-api/barang/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mobile-api/barang/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::destroy
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:236
 * @route '/mobile-api/barang/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::destroy
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:236
 * @route '/mobile-api/barang/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::destroy
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:236
 * @route '/mobile-api/barang/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\BarangMobileApiController::destroy
 * @see app/Http/Controllers/MobileApi/BarangMobileApiController.php:236
 * @route '/mobile-api/barang/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const BarangMobileApiController = { index, store, show, update, updateStok, catatPenjualan, destroy }

export default BarangMobileApiController
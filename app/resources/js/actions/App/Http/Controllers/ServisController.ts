import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServisController::index
 * @see app/Http/Controllers/ServisController.php:14
 * @route '/servis'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/servis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServisController::index
 * @see app/Http/Controllers/ServisController.php:14
 * @route '/servis'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServisController::index
 * @see app/Http/Controllers/ServisController.php:14
 * @route '/servis'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServisController::index
 * @see app/Http/Controllers/ServisController.php:14
 * @route '/servis'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServisController::index
 * @see app/Http/Controllers/ServisController.php:14
 * @route '/servis'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServisController::index
 * @see app/Http/Controllers/ServisController.php:14
 * @route '/servis'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServisController::index
 * @see app/Http/Controllers/ServisController.php:14
 * @route '/servis'
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
* @see \App\Http\Controllers\ServisController::store
 * @see app/Http/Controllers/ServisController.php:23
 * @route '/servis'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/servis',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServisController::store
 * @see app/Http/Controllers/ServisController.php:23
 * @route '/servis'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServisController::store
 * @see app/Http/Controllers/ServisController.php:23
 * @route '/servis'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServisController::store
 * @see app/Http/Controllers/ServisController.php:23
 * @route '/servis'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServisController::store
 * @see app/Http/Controllers/ServisController.php:23
 * @route '/servis'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ServisController::update
 * @see app/Http/Controllers/ServisController.php:77
 * @route '/servis/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/servis/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ServisController::update
 * @see app/Http/Controllers/ServisController.php:77
 * @route '/servis/{id}'
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
* @see \App\Http\Controllers\ServisController::update
 * @see app/Http/Controllers/ServisController.php:77
 * @route '/servis/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ServisController::update
 * @see app/Http/Controllers/ServisController.php:77
 * @route '/servis/{id}'
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
* @see \App\Http\Controllers\ServisController::update
 * @see app/Http/Controllers/ServisController.php:77
 * @route '/servis/{id}'
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
* @see \App\Http\Controllers\ServisController::destroy
 * @see app/Http/Controllers/ServisController.php:120
 * @route '/servis/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/servis/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServisController::destroy
 * @see app/Http/Controllers/ServisController.php:120
 * @route '/servis/{id}'
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
* @see \App\Http\Controllers\ServisController::destroy
 * @see app/Http/Controllers/ServisController.php:120
 * @route '/servis/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServisController::destroy
 * @see app/Http/Controllers/ServisController.php:120
 * @route '/servis/{id}'
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
* @see \App\Http\Controllers\ServisController::destroy
 * @see app/Http/Controllers/ServisController.php:120
 * @route '/servis/{id}'
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
/**
* @see \App\Http\Controllers\ServisController::selesai
 * @see app/Http/Controllers/ServisController.php:100
 * @route '/servis/{id}/selesai'
 */
export const selesai = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selesai.url(args, options),
    method: 'post',
})

selesai.definition = {
    methods: ["post"],
    url: '/servis/{id}/selesai',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServisController::selesai
 * @see app/Http/Controllers/ServisController.php:100
 * @route '/servis/{id}/selesai'
 */
selesai.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return selesai.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServisController::selesai
 * @see app/Http/Controllers/ServisController.php:100
 * @route '/servis/{id}/selesai'
 */
selesai.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selesai.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServisController::selesai
 * @see app/Http/Controllers/ServisController.php:100
 * @route '/servis/{id}/selesai'
 */
    const selesaiForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: selesai.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServisController::selesai
 * @see app/Http/Controllers/ServisController.php:100
 * @route '/servis/{id}/selesai'
 */
        selesaiForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: selesai.url(args, options),
            method: 'post',
        })
    
    selesai.form = selesaiForm
const ServisController = { index, store, update, destroy, selesai }

export default ServisController
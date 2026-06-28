import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:13
 * @route '/barang'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:13
 * @route '/barang'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:13
 * @route '/barang'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:13
 * @route '/barang'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:13
 * @route '/barang'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:13
 * @route '/barang'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::index
 * @see app/Http/Controllers/BarangController.php:13
 * @route '/barang'
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
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:20
 * @route '/barang/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/barang/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:20
 * @route '/barang/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:20
 * @route '/barang/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:20
 * @route '/barang/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:20
 * @route '/barang/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:20
 * @route '/barang/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::create
 * @see app/Http/Controllers/BarangController.php:20
 * @route '/barang/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:25
 * @route '/barang'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/barang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:25
 * @route '/barang'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:25
 * @route '/barang'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:25
 * @route '/barang'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BarangController::store
 * @see app/Http/Controllers/BarangController.php:25
 * @route '/barang'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:34
 * @route '/barang/{barang}'
 */
export const show = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/barang/{barang}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:34
 * @route '/barang/{barang}'
 */
show.url = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: args.barang,
                }

    return show.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:34
 * @route '/barang/{barang}'
 */
show.get = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:34
 * @route '/barang/{barang}'
 */
show.head = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:34
 * @route '/barang/{barang}'
 */
    const showForm = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:34
 * @route '/barang/{barang}'
 */
        showForm.get = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::show
 * @see app/Http/Controllers/BarangController.php:34
 * @route '/barang/{barang}'
 */
        showForm.head = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:39
 * @route '/barang/{barang}/edit'
 */
export const edit = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/barang/{barang}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:39
 * @route '/barang/{barang}/edit'
 */
edit.url = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: args.barang,
                }

    return edit.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:39
 * @route '/barang/{barang}/edit'
 */
edit.get = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:39
 * @route '/barang/{barang}/edit'
 */
edit.head = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:39
 * @route '/barang/{barang}/edit'
 */
    const editForm = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:39
 * @route '/barang/{barang}/edit'
 */
        editForm.get = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BarangController::edit
 * @see app/Http/Controllers/BarangController.php:39
 * @route '/barang/{barang}/edit'
 */
        editForm.head = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:47
 * @route '/barang/{barang}'
 */
export const update = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/barang/{barang}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:47
 * @route '/barang/{barang}'
 */
update.url = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: args.barang,
                }

    return update.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:47
 * @route '/barang/{barang}'
 */
update.put = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:47
 * @route '/barang/{barang}'
 */
update.patch = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:47
 * @route '/barang/{barang}'
 */
    const updateForm = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:47
 * @route '/barang/{barang}'
 */
        updateForm.put = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\BarangController::update
 * @see app/Http/Controllers/BarangController.php:47
 * @route '/barang/{barang}'
 */
        updateForm.patch = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:184
 * @route '/barang/{barang}'
 */
export const destroy = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/barang/{barang}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:184
 * @route '/barang/{barang}'
 */
destroy.url = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    barang: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        barang: args.barang,
                }

    return destroy.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:184
 * @route '/barang/{barang}'
 */
destroy.delete = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:184
 * @route '/barang/{barang}'
 */
    const destroyForm = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BarangController::destroy
 * @see app/Http/Controllers/BarangController.php:184
 * @route '/barang/{barang}'
 */
        destroyForm.delete = (args: { barang: string | number } | [barang: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\BarangController::jual
 * @see app/Http/Controllers/BarangController.php:97
 * @route '/barang/{id}/jual'
 */
export const jual = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: jual.url(args, options),
    method: 'post',
})

jual.definition = {
    methods: ["post"],
    url: '/barang/{id}/jual',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BarangController::jual
 * @see app/Http/Controllers/BarangController.php:97
 * @route '/barang/{id}/jual'
 */
jual.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return jual.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::jual
 * @see app/Http/Controllers/BarangController.php:97
 * @route '/barang/{id}/jual'
 */
jual.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: jual.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BarangController::jual
 * @see app/Http/Controllers/BarangController.php:97
 * @route '/barang/{id}/jual'
 */
    const jualForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: jual.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BarangController::jual
 * @see app/Http/Controllers/BarangController.php:97
 * @route '/barang/{id}/jual'
 */
        jualForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: jual.url(args, options),
            method: 'post',
        })
    
    jual.form = jualForm
/**
* @see \App\Http\Controllers\BarangController::restok
 * @see app/Http/Controllers/BarangController.php:148
 * @route '/barang/{id}/restok'
 */
export const restok = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restok.url(args, options),
    method: 'post',
})

restok.definition = {
    methods: ["post"],
    url: '/barang/{id}/restok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BarangController::restok
 * @see app/Http/Controllers/BarangController.php:148
 * @route '/barang/{id}/restok'
 */
restok.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return restok.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BarangController::restok
 * @see app/Http/Controllers/BarangController.php:148
 * @route '/barang/{id}/restok'
 */
restok.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restok.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BarangController::restok
 * @see app/Http/Controllers/BarangController.php:148
 * @route '/barang/{id}/restok'
 */
    const restokForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: restok.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BarangController::restok
 * @see app/Http/Controllers/BarangController.php:148
 * @route '/barang/{id}/restok'
 */
        restokForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: restok.url(args, options),
            method: 'post',
        })
    
    restok.form = restokForm
const barang = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
jual: Object.assign(jual, jual),
restok: Object.assign(restok, restok),
}

export default barang
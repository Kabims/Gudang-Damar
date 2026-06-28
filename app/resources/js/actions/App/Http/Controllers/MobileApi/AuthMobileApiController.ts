import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::register
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:38
 * @route '/mobile-api/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/mobile-api/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::register
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:38
 * @route '/mobile-api/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::register
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:38
 * @route '/mobile-api/register'
 */
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::register
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:38
 * @route '/mobile-api/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: register.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::register
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:38
 * @route '/mobile-api/register'
 */
        registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: register.url(options),
            method: 'post',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::login
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:69
 * @route '/mobile-api/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/mobile-api/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::login
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:69
 * @route '/mobile-api/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::login
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:69
 * @route '/mobile-api/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::login
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:69
 * @route '/mobile-api/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::login
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:69
 * @route '/mobile-api/login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::googleLogin
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:129
 * @route '/mobile-api/auth/google'
 */
export const googleLogin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: googleLogin.url(options),
    method: 'post',
})

googleLogin.definition = {
    methods: ["post"],
    url: '/mobile-api/auth/google',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::googleLogin
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:129
 * @route '/mobile-api/auth/google'
 */
googleLogin.url = (options?: RouteQueryOptions) => {
    return googleLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::googleLogin
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:129
 * @route '/mobile-api/auth/google'
 */
googleLogin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: googleLogin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::googleLogin
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:129
 * @route '/mobile-api/auth/google'
 */
    const googleLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: googleLogin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::googleLogin
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:129
 * @route '/mobile-api/auth/google'
 */
        googleLoginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: googleLogin.url(options),
            method: 'post',
        })
    
    googleLogin.form = googleLoginForm
/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::forgotPassword
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:180
 * @route '/mobile-api/forgot-password'
 */
export const forgotPassword = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: forgotPassword.url(options),
    method: 'post',
})

forgotPassword.definition = {
    methods: ["post"],
    url: '/mobile-api/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::forgotPassword
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:180
 * @route '/mobile-api/forgot-password'
 */
forgotPassword.url = (options?: RouteQueryOptions) => {
    return forgotPassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::forgotPassword
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:180
 * @route '/mobile-api/forgot-password'
 */
forgotPassword.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: forgotPassword.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::forgotPassword
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:180
 * @route '/mobile-api/forgot-password'
 */
    const forgotPasswordForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: forgotPassword.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::forgotPassword
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:180
 * @route '/mobile-api/forgot-password'
 */
        forgotPasswordForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: forgotPassword.url(options),
            method: 'post',
        })
    
    forgotPassword.form = forgotPasswordForm
/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::me
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:116
 * @route '/mobile-api/me'
 */
export const me = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: me.url(options),
    method: 'get',
})

me.definition = {
    methods: ["get","head"],
    url: '/mobile-api/me',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::me
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:116
 * @route '/mobile-api/me'
 */
me.url = (options?: RouteQueryOptions) => {
    return me.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::me
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:116
 * @route '/mobile-api/me'
 */
me.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: me.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::me
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:116
 * @route '/mobile-api/me'
 */
me.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: me.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::me
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:116
 * @route '/mobile-api/me'
 */
    const meForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: me.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::me
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:116
 * @route '/mobile-api/me'
 */
        meForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: me.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::me
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:116
 * @route '/mobile-api/me'
 */
        meForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: me.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    me.form = meForm
/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::logout
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:101
 * @route '/mobile-api/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/mobile-api/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::logout
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:101
 * @route '/mobile-api/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::logout
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:101
 * @route '/mobile-api/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::logout
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:101
 * @route '/mobile-api/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MobileApi\AuthMobileApiController::logout
 * @see app/Http/Controllers/MobileApi/AuthMobileApiController.php:101
 * @route '/mobile-api/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
const AuthMobileApiController = { register, login, googleLogin, forgotPassword, me, logout }

export default AuthMobileApiController
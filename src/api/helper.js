export const baseURL = (process.env.NODE_ENV==='development')? "https://avext.ru:8081/api" : "/api"

class BaseError {
    constructor(code, message) {
        this.code = code
        this.message = message
    }
}

export class AuthError extends BaseError {
    constructor() {
        super(401, 'Пожалуйста, войдите в систему')
    }
}

export class CustomError extends BaseError {
    constructor(message = '') {
        super(1, message)
    }
}

export const DoFetch = async (ctx, url, params = {method: 'get'}) => {
    try {
        const promise = await fetch(url, params)
        const result = await (response => {
            switch (response.status) {
                case 200:
                case 400:
                case 403:
                case 500:
                    return Promise.resolve(response)
                case 401:
                    return doRefreshAndFetch(ctx, url, params)
                default:
                    return Promise.reject(new CustomError('Неизвестная ошибка'))
            }
        })(promise)
        const json = await result.json()
        if (json.status === 0) {
            return Promise.resolve(json.result);
        } else {
            return Promise.reject(new CustomError(json.error))
        }
    } catch (err) {
        if (err instanceof AuthError) {
            return Promise.reject(err)
        } else {
            console.log(err)
            return Promise.reject(new CustomError('Неизвестная ошибка'))
        }
    }
}

const doRefreshAndFetch = async function (ctx, url, params) {
    const refreshToken = ctx.getters.getRefreshToken
    if (refreshToken.length === 0) {
        return Promise.reject(new AuthError())
    }
    return new Promise((resolve, reject) => {
        DoFetch(ctx, baseURL + '/v1/user/refresh', {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({refresh_token: refreshToken}),
        }).then(
            response => {
                ctx.commit('login', {
                    accessToken: response.access_token,
                    refreshToken: response.refresh_token,
                })
                if (params.headers) {
                    params.headers["Authorization"] = response.access_token
                }
                resolve(fetch(url, params))
            },
            () => {
                reject(new AuthError())
            }
        )
    })
}

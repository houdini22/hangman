import * as React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component
                {...props}
                location={location}
                navigate={navigate}
                params={params}
            />
        )
    }

    return ComponentWithRouterProp
}

export const getParamsFromSearch = (search) => {
    const params = {}
    search
        .replace(/^\?/, '')
        .split('&')
        .forEach((param) => {
            params[param.split('=')[0]] = param.split('=')[1]
        })
    return params
}

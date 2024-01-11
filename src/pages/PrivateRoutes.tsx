import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {
    auth:boolean
}

export default function PrivateRoutes({auth}:Props) 
{
    return (
        <React.Fragment>
            {
                auth ? 
                (<Outlet/>):
                (<Navigate to="/"/>)
            }
        </React.Fragment>
    )
}

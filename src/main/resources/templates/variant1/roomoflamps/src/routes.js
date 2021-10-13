import React, { useCallback, useEffect, useState } from "react"
import {Switch,Route,Redirect} from 'react-router-dom'
import {useHttp, request} from "./hooks/http.hook"
import { Loader } from "./pages/Loader"
import MainPage  from "./pages/MainPage"
import {IPGeolocationAPI} from "ip-geolocation-api-javascript-sdk"
import { LampPage } from "./pages/LampPage"


export const useRoutes = () => {

    return (
        <Switch>
            <Route path="/" exact>
                <MainPage/>
            </Route>
            <Route path="/:id">
                <LampPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
import React, { useCallback, useEffect, useState, useMemo } from "react"
import { useHistory } from "react-router-dom"

import { useHttp } from "../hooks/http.hook"
import { Loader } from "./Loader"
import ip from 'ip-geolocation-api-javascript-sdk'
import { Link } from "react-router-dom"
import { CreatePage } from "./CreatePage"

const MainPage = () => {
    let history = useHistory()
    const {request,loading} = useHttp()
    const [lamps, setLamps] = useState([])

    const fetchLamps = useCallback(() => {
        try{
            const url = '/api/lamp/getAll'
            request(url,'GET',null,{
                'Content-Type': 'application/json'
            })
            .then(data => {
                console.log(data)
                setLamps(data)
            })
        }
        catch (e) {
            console.log(e)
        }
        
    },[request])

    useEffect( () => {
        fetchLamps()
    },[fetchLamps])

    if(loading) {
        return <Loader />
    }

    return (
        <ul>
            <li>
                <CreatePage />
            </li>
            {lamps.map((item,i) => {
                return (
                    <li key={i}>
                        <button onClick={(e) => {history.push(`${item['id']}`)}}>{item['name']}</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default MainPage
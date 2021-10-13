import React, { useCallback, useEffect, useState, useMemo } from "react"
import {useParams, useHistory} from 'react-router-dom'
import ip from 'ip-geolocation-api-javascript-sdk'
import { Client, Message } from '@stomp/stompjs';

import {io} from 'socket.io-client'

import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export function LampPage() {
    const {request,loading} = useHttp()
    const [country, setCountry] = useState('')
    var Sockjs = require('sockjs-client')
    var stomp = require('@stomp/stompjs')
    const [lamp,setLamp] = useState({
        id:null,
        name:'',
        country:'',
        isOn:false
    })
    const {id} = useParams()
    let history = useHistory()

    const apikey = "a1e93da7f2804e4295d846ae0b541dae"
    const ipapi = useMemo (() => {
        return new ip(apikey,true)
    },[apikey])

    const fetchLamp = useCallback(() => {
        try{
            const url = `/api/lamp/${id}`
            request(url,'POST',null,{
                'Content-Type': 'application/json'
            })
            .then(data => {
                console.log(data)
                setLamp(data)
            })
        }
        catch (e) {
            console.log(e)
        }
        
    },[id,request])


    // const messageHandler = message => {
    //     if(message.body) {
    //         console.log(message.body)
    //     }
    // }

    // function connect() {
    //     let socket = io.connect('http://localhost:9090/ws')
    // }

    // function connect() {
    //     const client = new Client({
    //         brokerURL:'http://localhost:9090/ws',
    //         debug: function(str) {
    //             console.log(str)
    //         },
    //         reconnectDelay:5000,
    //         heartbeatIncoming: 4000,
    //         heartbeatOutgoing: 4000
    //     })
    //     client.activate();
    
    //     client.subscribe('/ws/insert', messageHandler);
    // }
    // connect()

    function connect() {
        //let sock = sockjs.bind("http://localhost:9090/ws")
        const sock = Sockjs("http://localhost:9090/ws")
        console.log("Ya tut")
        
        let Stomp = stomp.Stomp

        let client = Stomp.over(sock)

        client.connect({}, () => {
            client.subscribe("/ws/insert", payload => {
                let data = JSON.parse(payload.body)
                console.log(data)

            })
        });
    }
    connect()

    const changeHandler = async () => {
        try {
            const data = await request('/api/lamp','POST',{id:lamp.id},{
                'Content-Type': 'application/json'
            })
            console.log(data)
            //window.location.reload()
        } catch (e) { }
    }


    useEffect(() => {
        ipapi.getGeolocation((data) => {
            setCountry(data['country_name'])
        })
    },[country,ipapi])

    useEffect(() => {
        fetchLamp()
    },[fetchLamp])

    if(country != '' && country != lamp.country) {
        history.push('')
    }

    return (
        <table>
            {console.log(lamp)}
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>is ON</th>
            </tr>
            </thead>
            <tbody>
                <th>{lamp.id}</th>
                <th>{lamp.name}</th>
                <th>{lamp.country}</th>
                <th>{lamp.isOn ?1:0}</th>
            </tbody>
            <button onClick = {changeHandler}>Light ON/OFF</button>
        </table>
    )
}
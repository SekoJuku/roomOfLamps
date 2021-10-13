import React, { useCallback, useEffect, useState, useMemo } from "react"

import { useHttp } from "../hooks/http.hook"
import { Loader } from "./Loader"

export const CreatePage = () => {
    const {request,loading} = useHttp()
    const [form,setForm] = useState({
        name:'',
        country:''
    })

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value})
    }

    const createHandler = async () => {
        try {
            const data = await request('/api/lamp/create','POST',{name:form.name,country:form.country},{
                'Content-Type': 'application/json'
            })
            console.log(data)
            //window.location.reload()
        } catch (e) { }
    }

    if(loading) {
        return <Loader />
    }

    return(
        <div className="row s8">
            <div className="form-group">
                <label htmlFor="value">Name</label>
                <input
                    id="value"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label htmlFor="value">Country</label>
                <input
                    id="value2"
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={changeHandler}
                />
            </div>
            <button
                className="btn green white-text"
                onClick={createHandler}
                disabled={loading}
            >
                Create
            </button>
        </div>
    )
}

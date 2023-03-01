const API_URL =  "https://fitnesstrac-kr.herokuapp.com/api/"

export async function registerUser({username, password}){
    try{
        const response = await fetch(`${API_URL}users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await response.json()

        return data;
    } catch(e) {
        console.error(e)
    }
}

export async function loginUser({username, password}){
    try{
        const response = await fetch(`${API_URL}users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function getMe({token}){
    let Authorization = ''
    if(token) Authorization = `Bearer ${token}`
    try{
        const response = await fetch(`${API_URL}users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization
            }
        })

        const data = await response.json()
        
        return data
    } catch(e) {
        console.error(e)
    }
}

export async function getUsersRoutine({token, username}){
    let Authorization = ''
    if(token) Authorization = `Bearer ${token}`
    try{
        const response = await fetch(`${API_URL}users/${username}/routines`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization
            }
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function getListOfActivities(){
    try{
        const response = await fetch(`${API_URL}activities`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function createActivity({token, name, description}){
    let Authorization = ''
    if(token) Authorization = `Bearer ${token}`
    try{
        const response = await fetch(`${API_URL}activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                name,
                description
            })
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function updateActivity({token, activityId , name, description}){
    let Authorization = ''
    if(token) Authorization = `Bearer ${token}`
    try{
        const response = await fetch(`${API_URL}activities/${activityId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                name,
                description
            })
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function getPublicRoutineActivity({activityId}){
    try{
        const response = await fetch(`${API_URL}activities/${activityId}/routines`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function getPublicRoutine(){
    try{
        const response = await fetch(`${API_URL}routines`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function createRoutine({token, name, goal, isPublic}){
    let Authorization = ''
    if(token) Authorization = `Bearer ${token}`
    try{
        const response = await fetch(`${API_URL}routines`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function updateRoutine({token, routineId, name, goal}){
    let Authorization = ''
    if(token) Authorization = `Bearer ${token}`
    try{
        const response = await fetch(`${API_URL}routines/${routineId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            },
            body: JSON.stringify({
                name,
                goal
            })
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function removeRoutine({token, routineId}){
    let Authorization = ''
    if(token) Authorization = `Bearer ${token}`
    try{
        const response = await fetch(`${API_URL}routines/${routineId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            }
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function attachActivityToRoutine({routineId, activityId, count, duration}){
    try{
        const response = await fetch(`${API_URL}routine/${routineId}/activities`, {
            method: 'POST',
            body: JSON.stringify({
                activityId,
                count,
                duration
            })
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function updateRoutineActivity({routineActivityId, count, duration}){
    try{
        const response = await fetch(`${API_URL}api/routine_activities/${routineActivityId}`, {
            method: "PATCH",
            body: JSON.stringify({
                count,
                duration
            })
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

export async function removeRoutineActivity({token, routineActivityId}){
    let Authorization = ''
    if(token) Authorization = `Bearer ${token}`
    try{
        const response = await fetch(`${API_URL}api/routine_activities/${routineActivityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization
            }
        })

        const data = await response.json()

        return data
    } catch(e) {
        console.error(e)
    }
}

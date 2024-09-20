import axios from "axios"


export type BodyTypeWithPosition = {
    position: string,
    genre: string,
    id?: string,
    slug?: string,
    search?: string,
    skip?: number,
    limit?: number,
    sort?: string,
    update?: number,
    file?: File
}
export const ApiCheckLogin = async () => {
    const result = await axios.get("/api/user", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}

export const ApiItemUser = async ({ position, genre, search, id, slug, sort, skip, limit }: BodyTypeWithPosition) => {
    try {
        const result = await axios.get("/api/" + position +
            "/" + genre +
            "?genre=" + genre +
            "&search=" + `${search ? search : ""}` +
            "&id=" + `${id ? id : ""}` +
            "&slug=" + `${slug ? slug : ""}` +
            "&skip=" + `${skip ? skip : ""}` +
            "&sort=" + `${sort ? sort : ""}` +
            "&limit=" + `${limit ? limit : ""}`
        )
        return result.data
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}

export const ApiCreateItem = async ({ position, genre }: BodyTypeWithPosition, body: any) => {
    const result = await axios.post("/api/" +
        position +
        "/" + genre,
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
    return (result.data)
}
export const ApiUpdateItem = async ({ position, genre, id }: BodyTypeWithPosition, body: any) => {
    const result = await axios.put("/api/" +
        position +
        "/" + genre +
        "?id=" + id,
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
    return (result.data)
}
export const ApiDeleteItem = async ({ position, genre, id }: BodyTypeWithPosition) => {
    const result = await axios.delete("/api/" +
        position +
        "/" + genre +
        "?id=" + id,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage && localStorage.token
            },
        })
    return (result.data)
}

export const ApiUploadFile = async ({ position, genre, file }: BodyTypeWithPosition) => {
    const formData = new FormData()
    file && formData.append("file", file)
    const fileUpload = await axios.post("/api/" + position + "/" + genre, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.token,
        },
    })
    return fileUpload
}
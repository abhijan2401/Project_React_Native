export const UpdateEmp = async (id, data) => {
    try {
        console.log(id)
        const resp = fetch(`http://192.168.109.185:3000/update/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            return data
        }).catch((e) => {
            console.log(e);
        })
        return resp
    } catch (error) {
        console.log(error);
    }
}
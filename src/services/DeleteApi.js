export const DeleteEmployee = async (id) => {
    try {
        console.log(id)
        const resp = fetch(`http://192.168.109.185:3000/Delete/${id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'application.json'
            },
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
export const GetData = async (id) => {
    try {
        console.log(id)
        const data = await fetch(`http://192.168.109.185:3000/read`, {
        }).then((res) => res.json()).then((data) => {
            console.log(data, "data")
            return data.Todoss
        }).catch((e) => {
            console.log(e);
        })
        return data
    } catch (error) {
        console.log(error);
    }
}
import useApi from "$lib/hooks/useApi";

const load = async (storyUuid: string) => {
    const data = await useApi("/storystudio/load", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "uuid": storyUuid,
        })
    })

    console.log(data)
}

export default load;
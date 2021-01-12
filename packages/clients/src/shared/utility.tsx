export const updateTable = (data: any) => {
    const edgesData = data.edges.map((item: any) => item.node);

    return edgesData.map((item: any, i: number) => {
        const object = {
            key: i,
            name: item.name,
            classification: item.classification,
            type: [...item.types]
        }
        return object;
    })
}
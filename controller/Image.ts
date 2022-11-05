const getImage = (req:any, res:any) => {
    res.sendFile(`/Images/${req.params.Id}`)
}

export default getImage
const getImage = (req:any, res:any) => {
    res.sendFile(`${__dirname}/Images/${req.params.Id}`)
}

export default getImage
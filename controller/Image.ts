const getImage = (req:any, res:any) => {
    console.log(__dirname)
    res.sendFile(`${__dirname}/Images/${req.params.Id}`)
}

export default getImage
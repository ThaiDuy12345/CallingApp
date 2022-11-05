const getImage = (req:any, res:any) => {
    console.log(__dirname)
    res.sendFile(`${__dirname}/public/Images/${req.params.Id}`)
}

export default getImage
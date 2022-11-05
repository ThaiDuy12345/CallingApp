export const getAnImage = async(req:any, res:any) => {
    res.sendFile(`${__dirname}/public/Images/${req.params.Id}`)
}
export const getAnImage = async(req:any, res:any) => {
    res.sendFile(`../data/Images/${req.param.Id}`)
}
export const getAnImage = async(req:any, res:any) => {
    res.sendFile(`../public/Images/${req.params.Id}`)
}
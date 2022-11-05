export const getAnImage = async(req:any, res:any) => {
    res.sendFile(`${__dirname}/${req.params.Id}`)
}
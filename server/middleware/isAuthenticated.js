import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '')
    .replace(/Bearer\s?/, '') // убираем перед токеном слово Bearer
    console.log(token)
    if (token) {
        try {

            const decodedData = jwt.verify(token, "secretKeyFor")

            req.userId = decodedData._id
            next() // значит что обработка этого запроса будет двигаться дальше
        } catch (error) {
            return res.status(403).json({
                message: "No access"
            })
        }
    } else {
        return res.status(403).json({
            message: "No access"
        })
    }


}
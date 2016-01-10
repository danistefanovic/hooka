export default function secretTokenMiddleware(secret) {
    return (req, res, next) => {
        if (secret) {
            if (secret !== req.body.HOOKA_SECRET) {
                return res.sendStatus(401);
            }
        }
        next();
    };
}

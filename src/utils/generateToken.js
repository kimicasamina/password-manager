import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
    const token = jwt.sign(
        {
            user: {
                id,
            },
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    )

    return token
}

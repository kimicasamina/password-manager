import bcrypt from 'bcrypt'

export const checkPassword = async (password, hashedPassword) => {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword)

    return isPasswordMatch
}

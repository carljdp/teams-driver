import 'dotenv/config'

export const credentials = {
    email: process.env.NODE_APP__MSTEAMS_EMAIL,
    username: process.env.NODE_APP__MSTEAMS_USERNAME,
    password: process.env.NODE_APP__MSTEAMS_PASSWORD,
}
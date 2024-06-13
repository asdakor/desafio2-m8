const inicio = async (req, res) => {
    try {
        return res.sendfile('index.html')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const webController = {
    inicio
}
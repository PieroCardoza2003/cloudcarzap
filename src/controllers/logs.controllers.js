
export const create_log = async  (req, res) => {
    try {
        const { detalles } = req.body

        console.log("\n", detalles, "\n");

        return res.status(200).json({ result: 'OK' });

    } catch (error) {
        return res.status(500).json({
            "message": "ocurrio un error"
        })
    }
}

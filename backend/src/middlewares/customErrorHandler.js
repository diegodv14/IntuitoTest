export const errorHandler = (err, req, res, next) => {
    console.log('Error encontrado:', err);

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ error: 'Error de clave externa: ' + err.message });
    }

    return res.json({ error: 'Ocurrió un error en el servidor. Por favor, inténtelo nuevamente más tarde.' + err });
}
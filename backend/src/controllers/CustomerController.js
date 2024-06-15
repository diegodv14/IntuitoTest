import { Customer } from "../database/models/customerEntity.js"


export const createCustomer = async (req, res, next) => {
    try {

        const customerExists = await Customer.findOne({
            where: {
                documentNumber: req.body.documentNumber
            }
        })

        if (customerExists) res.json('Un cliente con este CI ya exite')

        const newCustomer = {
            documentNumber: req.body.documentNumber,
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }

        const Created = await Customer.create(newCustomer)
        if (!Created) res.json('Hubo un error creando el usuario.')

        res.json(Created)

    } catch (err) {
        next(err)
    }
}

export const getCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({
            where: {
                documentNumber: req.params.ci
            }
        })
        res.json(customer)
    } catch (err) {
        next(err)
    }
}
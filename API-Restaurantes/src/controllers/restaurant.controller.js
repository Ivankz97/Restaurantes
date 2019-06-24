import Restaurant from '../models/Restaurant';

export async function createRestaurant(req, res) {
    console.log(req.body);
    const { restaurant_name, address, bussiness_name, rfc, postal_code, city, state, phone, opening_time, contact_name } = req.body;
    try {
        let newRestaurant = await Restaurant.create({
            restaurant_name,
            address,
            bussiness_name,
            rfc,
            postal_code,
            city,
            state,
            phone,
            opening_time,
            contact_name
        }, {
                fields: ['restaurant_name', 'address', 'bussiness_name', 'rfc', 'postal_code', 'city', 'state', 'phone', 'opening_time', 'contact_name']
            });
        if (newRestaurant) {
            return res.json({
                message: 'Restaurant created succesfully',
                data: newRestaurant
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Algo ha salido mal',
            data: {}
        })
    }
}

export async function getRestaurants(req, res) {
    try {
        const restaurants = await Restaurant.findAll()
        res.json({
            data: restaurants
        });
    } catch (e) {
        console.log(e);
    }
}

export async function getOneRestaurant(req, res) {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({
        where: {
            id: id
        }
    });
    res.json({
        data: restaurant
    })
}

export async function deleteRestaurant(req, res) {
    const { id } = req.params;
    const deleteRowCount = await Restaurant.destroy({
        where: {
            id: id
        }
    });
    res.json({
        message: 'Restaurant deleted succesfully',
        count: deleteRowCount
    });
}

export async function updateRestaurant(req, res) {
    const { id } = req.params;
    const { restaurant_name, address, bussiness_name, rfc, postal_code, city, state, phone, opening_time, contact_name } = req.body;

    const restaurants = await Restaurant.findAll({
        fields: ['id', 'restaurant_name', 'address', 'bussiness_name', 'rfc', 'postal_code', 'city', 'state', 'phone', 'opening_time', 'contact_name'],
        where: {
            id: id
        }
    });
    if (restaurants.length > 0) {
        restaurants.forEach(async restaurant => {
            await restaurant.update({
                restaurant_name,
                address,
                bussiness_name,
                rfc,
                postal_code,
                city,
                state,
                phone,
                opening_time,
                contact_name
            });
        })
    }else{
        return res.json({
            message: 'Restaurant does not exists'
        });
    }
    return res.json({
        message: 'Restaurant updated successfully',
        data: restaurants
    });
}
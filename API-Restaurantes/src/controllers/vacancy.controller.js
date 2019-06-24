import Vacancy from "../models/Vacancy";

export async function createVacancy(req, res){
    const { time, id_payment, benefits, validity_post, restaurant_id  } = req.body;
    const newVacancy = await Vacancy.create({
        time, 
        id_payment,
        benefits,
        validity_post,
        restaurant_id
    }, {
        fields: ['time', 'id_payment', 'benefits', 'validity_post', 'restaurant_id']
    });
    res.json({
        message: 'New vacancy created'
    })
}

export async function getVacancies(req, res){
    const vacancies = await Vacancy.findAll({
        fields: ['time', 'id_payment', 'benefits', 'validity_post', 'restaurant_id'],
        order: [
            ['id', 'DESC']
        ]
    });
    res.json({vacancies});
}

export async function updateVacancy(req, res){
    const { id } = req.params;
    const { time, id_payment, benefits, validity_post, restaurant_id  } = req.body;

    await Vacancy.findOne({
        attributes: ['time', 'id_payment', 'benefits', 'validity_post', 'restaurant_id'],
        where: {id}
    });

    const updatedVacancy = await Vacancy.update({
        time, 
        id_payment,
        benefits,
        validity_post,
        restaurant_id
    }, {
        where: {id}
    });
    if(updatedVacancy==0){
        return res.json({
            message: 'Vacancy does not exists'
        });
    }else{
       res.json({message: 'Vacancy updated', updatedVacancy}); 
    } 
}

export async function deleteVacancy(req, res){
    const { id } = req.params;
    const deletedVacancy= await Vacancy.destroy({
        where: {
            id: id
        }
    });
    if(deletedVacancy==0){
        return res.json({
            message: 'Vacancy does not exists'
        });
    }else{
        res.json({message: 'Vacancy deleted successfully'});
    }
}

export async function getOneVacancy(req, res){
    const { id } = req.params;
    const vacancy = await Vacancy.findOne({
        where: {id }
    });
    res.json({vacancy});
}

export async function getVacancyByRestaurant(req, res){
    const { restaurant_id } = req.params;
    const vacancies = await Vacancy.findAll({
        attributes: ['time', 'id_payment', 'benefits', 'validity_post', 'restaurant_id'],
        where: { restaurant_id }
    });
    res.json({vacancies});
}
const {StatusCodes} = require('http-status-codes');
const {CityRepository} = require('../repositories')
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
    try{
        const city = await cityRepository.create(data);
        return city
    }catch(error){
        if(error.name === 'SequelizeValidationError' || error.name === 'sequelizeUniqueConstraintError'){
            let explaination = [];
            error.errors.forEach((err)=>{
                explaination.push(err.message);
            })
            console.log(explaination);
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        if(!response) {
            throw new AppError('The city you requested to delete is not found', StatusCodes.NOT_FOUND);
        }
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError('Cannot destroy the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);
        if(response[0] == 0) {
            throw new AppError('The city you requested to update is not found', StatusCodes.NOT_FOUND);
        }
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError('Cannot update the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        if(!city) {
            throw new AppError('The city you requested is not found', StatusCodes.NOT_FOUND);
        }
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw error;
        }
        throw new AppError('Cannot fetch the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw error;
        }
        throw new AppError('Cannot fetch the cities data', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity,
    getCity,
    getCities
}
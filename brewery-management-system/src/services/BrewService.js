import axios from 'axios';
const serverUrl =  'https://brewery-management.onrender.com'

class BrewService {
    getBreweries() {
        return axios.get('https://api.openbrewerydb.org/v1/breweries');
    }
    getByCity(query){
        return axios.get('https://api.openbrewerydb.org/v1/breweries?by_city='+query)
    }
    getByName(query){
        return axios.get('https://api.openbrewerydb.org/v1/breweries?by_name='+query)
    }
    getByType(query){
        return axios.get('https://api.openbrewerydb.org/v1/breweries?by_type='+query)
    }
    getByState(query){
        return axios.get('https://api.openbrewerydb.org/v1/breweries?by_state='+query)
    }
    getBreweryById(id){
        return axios.get('https://api.openbrewerydb.org/v1/breweries/'+id);
    }
    getItemReviews(id){
        return axios.get(`${serverUrl}/api/review/brewery/${id}`);
    }
    addReview(userName, rating, itemId, description){
        return axios.post(`${serverUrl}/api/review/add`, {userName, rating, itemId, description});
    }


}

const newBrewService = new BrewService();
export default newBrewService;

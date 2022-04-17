import { apiGetWithoutToken } from "../../services/api";

async function getRandomUserList(props) {
    const loading = props.loading ? props.loading : function () { };
    let params = props.params
    let response = "";
    loading(true);
    try {
        response = await apiGetWithoutToken('', params);
        loading(false);
        return response?.data;
    } catch (error) {
        loading(false);
        return error;
    }
};

const RandomUserRepository = {
    getRandomUserList,
}

export default RandomUserRepository;
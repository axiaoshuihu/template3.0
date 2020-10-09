import axios from 'axios';
export const getJie = (data) => {
    return new Promise((resolve, reject) => {
        axios.get(`./code/${data}.json`).then(res => {
            resolve(res) ;
        });
    });
};

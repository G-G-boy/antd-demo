import Mock from 'mockjs';
import city from './geographic/city.json';
import province from './geographic/province.json';
import {parse} from 'qs';

const tokens = {
    admin: 'admin-token',
    guest: 'guest-token',
};

Mock.mock(/login/, 'post', ({body}) => {
    const username = JSON.parse(body).username;
    const token = tokens[username as keyof typeof tokens];
    if (!token) {
        return {
            code: 0,
            message: '用户名或密码错误',
        };
    }
    return {
        code: 1,
        data: {
            token,
            refreshToken: 'refreshToken',
        },
    };
});

Mock.mock(/userInfo/, 'get', () => {
    return {
        code: 1,
        data: {
            username: 'ggboy',
            userId: 111,
            role: ['admin'],
        },
    };
});

Mock.mock(/province/, 'get', () => {
    return {
        code: 1,
        data: province,
    };
});

Mock.mock(/city/, 'get', ({url}) => {
    const parseUrl = url.split('?')[1];
    const id = parse(parseUrl).id as string;
    return {
        code: 1,
        data: city[id],
    };
});

Mock.setup({timeout: 200});

export default Mock;

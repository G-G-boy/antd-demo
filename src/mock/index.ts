import Mock from 'mockjs';

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

export default Mock;

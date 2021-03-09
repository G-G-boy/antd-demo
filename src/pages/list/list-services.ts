import {get, post} from '@/util/http';

interface Member {
    avatar: string;
    name: string;
    id: string;
}

export interface BasicListItemDataType {
    id: string;
    owner: string;
    title: string;
    avatar: string;
    cover: string;
    status: 'normal' | 'exception' | 'active' | 'success';
    percent: number;
    logo: string;
    href: string;
    body?: any;
    updatedAt: number;
    createdAt: number;
    subDescription: string;
    description: string;
    activeUser: number;
    newUser: number;
    star: number;
    like: number;
    message: number;
    content: string;
    members: Member[];
}

interface ListParams {
    count: number;
}

export const getFakeList: (params: ListParams) => Promise<BasicListItemDataType[]> = (params) => {
    return get<Array<BasicListItemDataType>, ListParams>('api/fake_list', params).then(
        (res) => res.data.data,
    );
};

interface PostData {
    id?: string;
    item?: BasicListItemDataType;
    method: 'post' | 'update' | 'delete';
}

export const postFakeList: (data: PostData) => Promise<BasicListItemDataType[]> = (data) => {
    return post<Array<BasicListItemDataType>, PostData>('api/fake_list', data).then(
        (res) => res.data.data,
    );
};

export interface ILogin {
    token: string;
    username: string;
    _id: string;
    avatar: string;
}

export interface IPosts {
    user: {
        _id: string;
        username: string,
        avatar: string,
    },
    _id: string;
    description: string;
    comments: string[];
    image: string;
    created_at: number;
    likes: number;
}

export type postState = {
    users: ILogin[];
    posts: IPosts[];
    currentUser: ILogin,
    isAdmin: boolean
    isLoading: boolean
    // error: boolean | number | string | null;
}

export type instagramState = {
    users: ILogin[];
    posts: IPosts[];
    isAdmin: boolean
    isLoading: boolean
    error: boolean | number | string | null;
}
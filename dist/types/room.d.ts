export type SendMessageArgs = {
    roomId: string;
    message: Message;
};
export type Message = {
    author: string;
    content: string;
};
export type CreateRoomArgs = {
    pub: boolean;
    playerName: string;
};
export type JoinRoomArgs = {
    roomId: string;
    playerName: string;
};

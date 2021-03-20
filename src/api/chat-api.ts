

const subcribers = [] as SubscriberType[];

export  const chatAPI = {
    subscribe(callbeck: SubscriberType) {
        subcribers.push(callbeck)
    }
}
type SubscriberType = (messages:ChatMessageType[])=>void;

export type  ChatMessageType =  {
    message:string,
    photo: string
    userId: number,
    userName: string
}


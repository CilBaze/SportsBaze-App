import firebase from "firebase";
import { getAsyncStorage } from "../../Routes/AsynstorageClass";

let chat_id = ""
export const AddUser = async (name, id, profileImg) => {

    console.log("user", id, name, profileImg)
    try {
        return await firebase
            .database()
            .ref("users/")
            .child(id)
            .set({ "name": name, "userid": id, "profile_pic": profileImg })
    } catch (error) {
        alert(error)
        return error;
    }
};

export const Chat = async (MyId, OtherUId, message,dateTime, isRead) => {
    console.log("data", MyId, OtherUId, message, dateTime)
    console.log("MyId", MyId, OtherUId, message)

    { chat_id = MyId < OtherUId ? 'abc'+ MyId.concat('abc'+ OtherUId) : 'abc'+ OtherUId.concat('abc'+ MyId) }

    try {
        return await firebase
            .database()
            .ref("chat/")
            .child(chat_id)
            .push({ "message": message, "userid": MyId, "dateTime": dateTime, "isRead": isRead })
    } catch (error) {
        alert(error)
        return error;
    }


};
export const UpdateUser = async (user_id, chat_id, data) => {
    console.log("info==>", data)
    try {
        data.isRead = 1;
        return await firebase.database()
        .ref("chat/" + user_id + '/' + chat_id + "/").on("value", snapshot => {
            if(snapshot.val()){
                firebase
                .database()
                .ref("chat/" + user_id + '/' + chat_id + "/")
                .set(data)
            }
        });
    } catch (error) {
        alert(error)
        return error;
    }
};
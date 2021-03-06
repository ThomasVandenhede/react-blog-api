import { success } from "../../services/response/";
import { ChatMessage } from ".";

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ChatMessage.find(query, select, cursor)
    .sort({ createdAt: 1 })
    .then(chatMessages => chatMessages.map(chatMessage => chatMessage.view()))
    .then(success(res))
    .catch(next);

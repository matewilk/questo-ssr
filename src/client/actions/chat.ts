export const UPDATE_CHAT = "update_chat";

export function updateChat(message: any) {
  return {
    type: UPDATE_CHAT,
    message,
  };
}

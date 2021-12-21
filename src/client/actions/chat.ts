export const UPDATE_CHAT = "update_chat";

export function updateChat(data: any) {
  return {
    type: UPDATE_CHAT,
    data,
  };
}

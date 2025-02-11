export type TState = {
  selectedId: number,
  messages: {
    [x: number]: string
  }
}

export const initialState: TState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor', // Draft for contactId = 0
    1: 'Hello, Alice', // Draft for contactId = 1
  },
};

export type TAction = {
  type: 'changed_selection' | 'edited_message' | 'sent_message',
  contactId?: number,
  message?: string
}

export function messengerReducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case 'changed_selection': {
      return {
        selectedId: action.contactId as number, // FIXME
        messages: {
          ...state.messages
        }
      };
    }
    case 'edited_message': {
      return {
        selectedId: state.selectedId,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message
        } as { [x: number]: string } // FIXME
      };
    }
    case 'sent_message': {
      return {
        selectedId: state.selectedId,
        messages: {
          ...state.messages,
          [state.selectedId]: ''
        }
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

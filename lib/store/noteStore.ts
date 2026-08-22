export type Note = {
  id: string;
  title: string;
};

export const noteStore = {
  notes: [] as Note[],
};

export default noteStore;

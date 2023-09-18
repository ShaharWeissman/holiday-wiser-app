const LocalStorageService = {
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key)!).data;
    } catch (error) {
      console.log('🚀 ~ file: LocalStorageService.ts:7 ~ get ~ error', error);
      return null;
    }
  },
  set(key: string, payload: any) {
    return localStorage.setItem(key, JSON.stringify({ data: payload }));
  },
  delete(key: string) {
    localStorage.removeItem(key);
  },
};

export default LocalStorageService;

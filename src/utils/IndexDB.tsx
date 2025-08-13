interface Note {
  id: string;
  label: string;
  text: string;
}

export class IndexedDB {
  private dbName: string;
  private dbVersion: number;
  private db: IDBDatabase | null = null;

  constructor(dbName: string, version: number) {
    this.dbName = dbName;
    this.dbVersion = version;
  }

  public async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes", { keyPath: "id" });
        }
      };
    });
  }

  public async addNote(note: Note): Promise<void> {
    if (!this.db) await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction("notes", "readwrite");
      const store = transaction.objectStore("notes");
      const request = store.add(note);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  public async getNotes(): Promise<Note[]> {
    if (!this.db) await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction("notes", "readonly");
      const store = transaction.objectStore("notes");
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  public async deleteNote(id: string): Promise<void> {
    if (!this.db) await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction("notes", "readwrite");
      const store = transaction.objectStore("notes");
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

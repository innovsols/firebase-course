

export function convertSnaps<T>(snaps: any): T[]{
  return snaps.map((snap: { payload: { doc: { id: string; data: () => {}; }; }; }) => {
    return {
      id: snap.payload.doc.id,
      ...snap.payload.doc.data() as {}
    } as any;
  }) as T[];
}

import { create } from "zustand";

const useImageStore = create((set) => ({
  imageSrc: "/flower.webp",
  setImageSrc: (src) => set({ imageSrc: src }),
}));

// const useMarkersStore = create((set) => ({
//   selectedMarker: null,
//   setSelectedMarker: (uuid) => set({ selectedMarker: uuid }),
//   markers: [],
//   addMarker: (uuid) =>
//     set((state) => ({ markers: [...state.markers, { uuid }] })),
//   removeMarker: (uuid) =>
//     set((state) => ({ markers: state.markers.filter((m) => m.uuid !== uuid) })),
// }));
const useHotSpotStore = create((set) => ({
  selectedHotSpot: null,
  setSelectedHotSpot: (uuid) =>
  set((state) => ({
    selectedHotSpot: state.hotSpots.find((hotSpot) => hotSpot.uuid === uuid),
  })),
  hotSpots: [],
  labelInputTxt: null,
  setLabelInputTxt: (text) => set({ labelInputTxt: text }),
  addHotSpot: (hotSpot) =>
    {set((state) => ({ hotSpots: [...state.hotSpots,  hotSpot ] }))
  },
  removeHotSpot: (uuid) =>
    set((state) => ({ hotSpots: state.hotSpots.filter((m) => m.uuid !== uuid) })),
}));

export { useImageStore, useHotSpotStore };

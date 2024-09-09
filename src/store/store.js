import { create } from "zustand";

// Image store for managing image-related state
const useImageStore = create((set) => ({
  imageSrc: "/flower.webp",
  setImageSrc: (src) => set({ imageSrc: src }),
}));

// HotSpot store for managing hotspots, labels, descriptions, etc.
const useHotSpotStore = create((set) => ({
  selectedHotSpot: null,
  hotSpots: [],
  labelInputTxt: null,
  descriptionText: null, // New state for description text
  labelWidth: 0,
  labelHeight: 0,

  // Actions for selected HotSpot
  setSelectedHotSpot: (uuid) =>
    set((state) => ({
      selectedHotSpot: state.hotSpots.find((hotSpot) => hotSpot.uuid === uuid),
    })),

  // Actions for label input text
  setLabelInputTxt: (text) => set({ labelInputTxt: text }),

  // Actions for description text
  setDescriptionText: (text) => set({ descriptionText: text }),

  // Actions for label dimensions
  setLabelWidth: (width) => set({ labelWidth: width }),
  setLabelHeight: (height) => set({ labelHeight: height }),

  // HotSpot management
  addHotSpot: (hotSpot) =>
    set((state) => ({ hotSpots: [...state.hotSpots, hotSpot] })),
  removeHotSpot: (uuid) =>
    set((state) => ({
      hotSpots: state.hotSpots.filter((m) => m.uuid !== uuid),
    })),
}));

export { useImageStore, useHotSpotStore };

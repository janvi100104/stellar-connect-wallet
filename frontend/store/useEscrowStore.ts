import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface EscrowData {
  id: string;
  title: string;
  client: string;
  freelancer: string;
  amount: number;
  currency: 'XLM' | 'USDC';
  status: 'created' | 'funded' | 'released' | 'refunded' | 'disputed';
  contractAddress?: string;
  transactionHash?: string;
  createdAt: Date;
  deadline?: Date;
  metadata?: string;
}

interface EscrowState {
  escrows: EscrowData[];
  addEscrow: (escrow: EscrowData) => void;
  updateEscrowStatus: (id: string, status: EscrowData['status']) => void;
  updateEscrowTransaction: (id: string, txHash: string) => void;
  getEscrowsByUser: (address: string) => EscrowData[];
  getEscrowById: (id: string) => EscrowData | undefined;
  deleteEscrow: (id: string) => void;
}

// Custom storage to handle Date serialization
const customStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str, (key, value) => {
      if (value && typeof value === 'object' && value.__type === 'date') {
        return new Date(value.value);
      }
      return value;
    });
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value, (key, val) => {
      if (val instanceof Date) {
        return { __type: 'date', value: val };
      }
      return val;
    }));
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

export const useEscrowStore = create<EscrowState>()(
  persist(
    (set, get) => ({
      escrows: [],
      
      addEscrow: (escrow: EscrowData) => set((state) => ({
        escrows: [...state.escrows, escrow]
      })),
      
      updateEscrowStatus: (id: string, status: EscrowData['status']) => set((state) => ({
        escrows: state.escrows.map((e) =>
          e.id === id ? { ...e, status } : e
        )
      })),
      
      updateEscrowTransaction: (id: string, transactionHash: string) => set((state) => ({
        escrows: state.escrows.map((e) =>
          e.id === id ? { ...e, transactionHash } : e
        )
      })),
      
      getEscrowsByUser: (address: string) => {
        const state = get();
        return state.escrows.filter(
          (e) => e.client === address || e.freelancer === address
        );
      },
      
      getEscrowById: (id: string) => {
        const state = get();
        return state.escrows.find((e) => e.id === id);
      },
      
      deleteEscrow: (id: string) => set((state) => ({
        escrows: state.escrows.filter((e) => e.id !== id)
      })),
    }),
    {
      name: 'trustlance-escrows',
      storage: createJSONStorage(() => customStorage),
    }
  )
);

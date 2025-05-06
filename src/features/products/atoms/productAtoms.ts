import { atom } from 'jotai';

// Atom to store active product states
export const productActiveStatesAtom = atom<Record<string, boolean>>({});

// Atom to update a product's active state
export const updateProductActiveStateAtom = atom(
	null,
	(get, set, { id, isActive }: { id: string; isActive: boolean }) => {
		const currentStates = get(productActiveStatesAtom);
		set(productActiveStatesAtom, {
			...currentStates,
			[id]: isActive
		});
	}
);

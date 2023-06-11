import { EncryptionMachine } from 'encode-wir/dist';

const encodedArray = process.env.NEXT_PUBLIC_ENCODED_ARRAY?.split('=') || [];
export const encryptionMachine = new EncryptionMachine(encodedArray);

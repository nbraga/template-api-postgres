interface AddressProps {
    id: string;
    zipCode: string;
    street: string;
    district: string;
    number: string;
    complement: string;
    state: string;
    city: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

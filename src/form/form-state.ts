import { useState, ChangeEvent } from 'react';

/**
 * Custom hook to handle form state
 * can take in an input change event and update the form state based on the input name
 * @param initialValue
 */
export function useFormState<T>(
    initialValue: T
): [T, ({ target }: ChangeEvent<HTMLInputElement>) => void] {
    const [formValue, setFormValue] = useState<T>(initialValue);

    const handleInputChange = ({
        target,
    }: ChangeEvent<HTMLInputElement>): void => {
        if (target?.name) {
            setFormValue({
                ...formValue,
                [target.name]:
                    target?.type === 'number'
                        ? +target.value // To ensure number inputs result in number values
                        : target.value,
            });
        }
    };

    return [formValue, handleInputChange];
}
